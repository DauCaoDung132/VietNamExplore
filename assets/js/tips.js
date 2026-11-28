/**
 * Interactive Packing Checklist cho trang tips.html — VietNamExplore
 * Xử lý an toàn: localStorage lỗi/bị chặn, dữ liệu hỏng/bị sửa tay, input rỗng/trùng/XSS,
 * bộ lọc trạng thái, tiến độ 0..100% (tránh chia cho 0), giữ focus bàn phím.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "vietnamexplore_tips_checklist_v1";
  const VALID_CATEGORIES = new Set(["documents", "clothing", "health", "tech"]);
  const VALID_FILTERS = new Set(["all", "unchecked", "checked"]);
  const SAFE_ID_PATTERN = /^[a-zA-Z0-9_-]{1,64}$/;
  const MAX_ITEM_LENGTH = 80;
  const MAX_TOTAL_ITEMS = 50;

  let customIdCounter = 0;

  /**
   * Chuẩn hóa chuỗi để kiểm tra hợp lệ và so sánh trùng lặp (hỗ trợ tiếng Việt NFC).
   */
  function normalizeText(raw) {
    if (typeof raw !== "string") {
      return "";
    }
    return raw.normalize("NFC").trim().replace(/\s+/g, " ");
  }

  function normalizeForCompare(text) {
    return normalizeText(text).toLocaleLowerCase("vi");
  }

  /**
   * Đọc/ghi localStorage an toàn (không crash ở chế độ ẩn danh, file://, hoặc đầy bộ nhớ).
   */
  function safeLoadStorage() {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        return null;
      }
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }
      return JSON.parse(raw);
    } catch (_err) {
      return null;
    }
  }

  function safeSaveStorage(payload) {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        return;
      }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (_err) {
      // Bỏ qua nếu trình duyệt chặn localStorage hoặc vượt quota
    }
  }

  /**
   * Đọc danh sách mục mặc định trực tiếp từ HTML để đảm bảo Single Source of Truth.
   */
  function readDefaultItemsFromDOM(groupsContainer) {
    const defaults = [];
    const seenIds = new Set();
    const itemNodes = groupsContainer.querySelectorAll(".checklist-item[data-default='true']");

    itemNodes.forEach(function (li) {
      const id = li.getAttribute("data-item-id");
      const list = li.closest("[data-list-category]");
      const category = list ? list.getAttribute("data-list-category") : "";
      const textEl = li.querySelector(".checklist-text");
      const text = normalizeText(textEl ? textEl.textContent : "");

      if (!id || !SAFE_ID_PATTERN.test(id) || seenIds.has(id) || !VALID_CATEGORIES.has(category) || !text) {
        return;
      }
      seenIds.add(id);
      defaults.push({
        id: id,
        text: text,
        category: category,
        checked: false,
        isDefault: true
      });
    });

    return defaults;
  }

  /**
   * Hợp nhất dữ liệu từ localStorage với danh sách mặc định, lọc sạch mọi dữ liệu hỏng.
   */
  function mergeSavedState(defaultItems, savedData) {
    const items = defaultItems.map(function (item) {
      return Object.assign({}, item);
    });

    if (!savedData || typeof savedData !== "object") {
      return items;
    }

    // 1. Khôi phục trạng thái checked cho các mục mặc định
    if (savedData.checkedMap && typeof savedData.checkedMap === "object") {
      items.forEach(function (item) {
        if (Object.prototype.hasOwnProperty.call(savedData.checkedMap, item.id)) {
          item.checked = savedData.checkedMap[item.id] === true;
        }
      });
    }

    // 2. Khôi phục các mục người dùng tự thêm (validate chặt từng trường)
    if (Array.isArray(savedData.customItems)) {
      const existingIds = new Set(items.map(function (i) { return i.id; }));
      const existingTexts = new Set(items.map(function (i) { return normalizeForCompare(i.text); }));

      savedData.customItems.forEach(function (rawItem) {
        if (items.length >= MAX_TOTAL_ITEMS) {
          return;
        }
        if (!rawItem || typeof rawItem !== "object") {
          return;
        }
        const id = typeof rawItem.id === "string" ? rawItem.id.trim() : "";
        const text = normalizeText(rawItem.text);
        const category = typeof rawItem.category === "string" ? rawItem.category : "";
        const compareKey = normalizeForCompare(text);

        if (
          !SAFE_ID_PATTERN.test(id) ||
          existingIds.has(id) ||
          !text ||
          text.length > MAX_ITEM_LENGTH ||
          !VALID_CATEGORIES.has(category) ||
          existingTexts.has(compareKey)
        ) {
          return;
        }

        existingIds.add(id);
        existingTexts.add(compareKey);
        items.push({
          id: id,
          text: text,
          category: category,
          checked: rawItem.checked === true,
          isDefault: false
        });
      });
    }

    return items;
  }

  function createUniqueCustomId(existingItems) {
    const existingIds = new Set(existingItems.map(function (item) { return item.id; }));
    let candidate = "";
    do {
      customIdCounter += 1;
      candidate = "custom-" + Date.now() + "-" + customIdCounter;
    } while (existingIds.has(candidate));
    return candidate;
  }

  /**
   * Tạo phần tử <li> bằng DOM API thuần (chỉ dùng textContent để chống XSS tuyệt đối).
   */
  function createChecklistElement(item) {
    const li = document.createElement("li");
    li.className = "checklist-item" + (item.checked ? " is-checked" : "");
    li.setAttribute("data-item-id", item.id);
    li.setAttribute("data-default", item.isDefault ? "true" : "false");

    const label = document.createElement("label");
    label.className = "checklist-label";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checklist-checkbox";
    checkbox.checked = item.checked;

    const span = document.createElement("span");
    span.className = "checklist-text";
    span.textContent = item.text;

    label.appendChild(checkbox);
    label.appendChild(span);
    li.appendChild(label);

    if (!item.isDefault) {
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "btn-remove-item";
      removeBtn.setAttribute("data-remove-id", item.id);
      removeBtn.setAttribute("aria-label", "Xóa mục: " + item.text);
      removeBtn.textContent = "Xóa";
      li.appendChild(removeBtn);
    }

    return li;
  }

  function initChecklist() {
    const groupsContainer = document.getElementById("checklist-groups");
    const countEl = document.getElementById("checklist-count");
    const statusEl = document.getElementById("checklist-status");
    const progressTrack = document.getElementById("checklist-progress-track");
    const progressBar = document.getElementById("checklist-progress-bar");
    const emptyEl = document.getElementById("checklist-empty");
    const btnCheckAll = document.getElementById("btn-check-all");
    const btnUncheckAll = document.getElementById("btn-uncheck-all");
    const btnResetDefault = document.getElementById("btn-reset-default");
    const addForm = document.getElementById("checklist-add-form");
    const inputEl = document.getElementById("new-item-input");
    const categoryEl = document.getElementById("new-item-category");
    const feedbackEl = document.getElementById("form-feedback");
    const filterButtons = Array.prototype.slice.call(document.querySelectorAll(".filter-btn[data-filter]"));

    // Bảo vệ trường hợp thiếu phần tử DOM cốt lõi
    if (!groupsContainer || !countEl || !statusEl || !progressTrack || !progressBar) {
      return;
    }

    const defaultItems = readDefaultItemsFromDOM(groupsContainer);
    const savedData = safeLoadStorage();

    const state = {
      items: mergeSavedState(defaultItems, savedData),
      filter: "all"
    };

    function persistState() {
      const checkedMap = {};
      const customItems = [];

      state.items.forEach(function (item) {
        if (item.isDefault) {
          checkedMap[item.id] = item.checked;
        } else {
          customItems.push({
            id: item.id,
            text: item.text,
            category: item.category,
            checked: item.checked
          });
        }
      });

      safeSaveStorage({
        checkedMap: checkedMap,
        customItems: customItems
      });
    }

    function showFeedback(message, type) {
      if (!feedbackEl) {
        return;
      }
      if (!message) {
        feedbackEl.textContent = "";
        feedbackEl.className = "form-feedback";
        feedbackEl.hidden = true;
        return;
      }
      feedbackEl.textContent = message;
      feedbackEl.className = "form-feedback " + (type === "error" ? "is-error" : "is-success");
      feedbackEl.hidden = false;
    }

    function isDefaultPristine() {
      const hasCustom = state.items.some(function (item) { return !item.isDefault; });
      const hasChecked = state.items.some(function (item) { return item.checked; });
      return !hasCustom && !hasChecked;
    }

    /**
     * Xây dựng lại toàn bộ danh sách DOM từ state (dùng khi init, reset).
     */
    function renderAllItems() {
      const lists = groupsContainer.querySelectorAll("[data-list-category]");
      lists.forEach(function (ul) {
        ul.textContent = "";
      });

      state.items.forEach(function (item) {
        const targetList = groupsContainer.querySelector('[data-list-category="' + item.category + '"]');
        if (targetList) {
          targetList.appendChild(createChecklistElement(item));
        }
      });

      syncUI();
    }

    /**
     * Đồng bộ hóa trạng thái hiển thị (bộ lọc, số đếm, thanh tiến độ, nút bấm)
     * mà không phá hủy DOM đang có focus bàn phím.
     */
    function syncUI() {
      const total = state.items.length;
      let checkedCount = 0;
      const itemMap = new Map();

      state.items.forEach(function (item) {
        itemMap.set(item.id, item);
        if (item.checked) {
          checkedCount += 1;
        }
      });

      const uncheckedCount = total - checkedCount;
      const percent = total === 0 ? 0 : Math.round((checkedCount / total) * 100);

      // 1. Cập nhật tiến độ & badge
      countEl.textContent = "Đã chuẩn bị " + checkedCount + " / " + total + " mục (" + percent + "%)";
      progressBar.style.width = percent + "%";
      progressTrack.setAttribute("aria-valuenow", String(percent));

      statusEl.classList.remove("is-progress", "is-done");
      if (total === 0 || checkedCount === 0) {
        statusEl.textContent = "Chưa bắt đầu";
      } else if (checkedCount === total) {
        statusEl.textContent = "Đã sẵn sàng khởi hành!";
        statusEl.classList.add("is-done");
      } else {
        statusEl.textContent = "Đang chuẩn bị (" + percent + "%)";
        statusEl.classList.add("is-progress");
      }

      // 2. Cập nhật số đếm trên các nút lọc
      const countAllEl = document.querySelector('[data-count-for="all"]');
      const countUncheckedEl = document.querySelector('[data-count-for="unchecked"]');
      const countCheckedEl = document.querySelector('[data-count-for="checked"]');
      if (countAllEl) countAllEl.textContent = String(total);
      if (countUncheckedEl) countUncheckedEl.textContent = String(uncheckedCount);
      if (countCheckedEl) countCheckedEl.textContent = String(checkedCount);

      filterButtons.forEach(function (btn) {
        const isActive = btn.getAttribute("data-filter") === state.filter;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      // 3. Cập nhật trạng thái nút thao tác nhanh (chặn click vô nghĩa)
      if (btnCheckAll) {
        btnCheckAll.disabled = total === 0 || checkedCount === total;
      }
      if (btnUncheckAll) {
        btnUncheckAll.disabled = checkedCount === 0;
      }
      if (btnResetDefault) {
        btnResetDefault.disabled = isDefaultPristine();
      }

      // 4. Đồng bộ từng thẻ item và ẩn/hiện từng nhóm danh mục theo bộ lọc
      let visibleItemsCount = 0;
      const cards = groupsContainer.querySelectorAll(".checklist-card[data-category]");

      cards.forEach(function (card) {
        const itemsInCard = card.querySelectorAll(".checklist-item[data-item-id]");
        let visibleInCard = 0;

        itemsInCard.forEach(function (li) {
          const id = li.getAttribute("data-item-id");
          const item = itemMap.get(id);
          if (!item) {
            li.hidden = true;
            return;
          }

          const checkbox = li.querySelector(".checklist-checkbox");
          if (checkbox && checkbox.checked !== item.checked) {
            checkbox.checked = item.checked;
          }
          li.classList.toggle("is-checked", item.checked);

          const shouldShow =
            state.filter === "all" ||
            (state.filter === "checked" && item.checked) ||
            (state.filter === "unchecked" && !item.checked);

          li.hidden = !shouldShow;
          if (shouldShow) {
            visibleInCard += 1;
            visibleItemsCount += 1;
          }
        });

        card.hidden = visibleInCard === 0;
      });

      // 5. Hiển thị thông báo khi bộ lọc không có mục nào
      if (emptyEl) {
        if (visibleItemsCount === 0) {
          if (state.filter === "checked") {
            emptyEl.textContent = "Chưa có mục nào được đánh dấu hoàn thành.";
          } else if (state.filter === "unchecked" && total > 0) {
            emptyEl.textContent = "Tuyệt vời! Bạn đã chuẩn bị xong toàn bộ danh sách hành lý.";
          } else {
            emptyEl.textContent = "Danh sách hiện chưa có vật dụng nào.";
          }
          emptyEl.hidden = false;
        } else {
          emptyEl.hidden = true;
        }
      }
    }

    // Event delegation: tick / bỏ tick checkbox
    groupsContainer.addEventListener("change", function (event) {
      const target = event.target;
      if (!target || !target.classList.contains("checklist-checkbox")) {
        return;
      }
      const li = target.closest(".checklist-item[data-item-id]");
      if (!li) {
        return;
      }
      const id = li.getAttribute("data-item-id");
      const item = state.items.find(function (i) { return i.id === id; });
      if (!item) {
        return;
      }

      item.checked = Boolean(target.checked);
      persistState();
      syncUI();
      showFeedback("", "success");
    });

    // Event delegation: xóa mục người dùng tự thêm
    groupsContainer.addEventListener("click", function (event) {
      const removeBtn = event.target.closest(".btn-remove-item[data-remove-id]");
      if (!removeBtn) {
        return;
      }
      const li = removeBtn.closest(".checklist-item[data-item-id]");
      const id = removeBtn.getAttribute("data-remove-id");
      const index = state.items.findIndex(function (i) { return i.id === id && !i.isDefault; });
      if (index === -1) {
        return;
      }

      const removedText = state.items[index].text;
      state.items.splice(index, 1);

      if (li && li.parentNode) {
        li.parentNode.removeChild(li);
      }

      persistState();
      syncUI();
      showFeedback('Đã xóa mục "' + removedText + '".', "success");
    });

    // Bộ lọc Tất cả / Chưa xong / Đã xong
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const nextFilter = btn.getAttribute("data-filter");
        if (!VALID_FILTERS.has(nextFilter) || nextFilter === state.filter) {
          return;
        }
        state.filter = nextFilter;
        syncUI();
      });
    });

    // Chọn tất cả
    if (btnCheckAll) {
      btnCheckAll.addEventListener("click", function () {
        if (state.items.length === 0) {
          return;
        }
        state.items.forEach(function (item) {
          item.checked = true;
        });
        persistState();
        syncUI();
        showFeedback("Đã đánh dấu hoàn thành toàn bộ danh sách.", "success");
      });
    }

    // Bỏ chọn tất cả
    if (btnUncheckAll) {
      btnUncheckAll.addEventListener("click", function () {
        state.items.forEach(function (item) {
          item.checked = false;
        });
        persistState();
        syncUI();
        showFeedback("Đã bỏ chọn toàn bộ danh sách.", "success");
      });
    }

    // Khôi phục mặc định
    if (btnResetDefault) {
      btnResetDefault.addEventListener("click", function () {
        state.items = defaultItems.map(function (item) {
          return Object.assign({}, item, { checked: false });
        });
        state.filter = "all";
        persistState();
        renderAllItems();
        showFeedback("Đã khôi phục 12 mục hành lý mặc định.", "success");
      });
    }

    // Xóa thông báo lỗi ngay khi người dùng nhập lại
    if (inputEl) {
      inputEl.addEventListener("input", function () {
        if (feedbackEl && feedbackEl.classList.contains("is-error")) {
          showFeedback("", "success");
        }
      });
    }

    // Thêm mục tự nhập
    if (addForm && inputEl && categoryEl) {
      addForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const normalized = normalizeText(inputEl.value);
        const category = categoryEl.value;

        if (!normalized) {
          showFeedback("Vui lòng nhập tên vật dụng trước khi thêm.", "error");
          inputEl.focus();
          return;
        }

        if (normalized.length > MAX_ITEM_LENGTH) {
          showFeedback("Tên vật dụng tối đa " + MAX_ITEM_LENGTH + " ký tự.", "error");
          inputEl.focus();
          return;
        }

        if (!VALID_CATEGORIES.has(category)) {
          showFeedback("Nhóm hành lý không hợp lệ. Vui lòng chọn lại.", "error");
          categoryEl.focus();
          return;
        }

        if (state.items.length >= MAX_TOTAL_ITEMS) {
          showFeedback("Danh sách đã đạt giới hạn tối đa " + MAX_TOTAL_ITEMS + " mục.", "error");
          return;
        }

        const compareKey = normalizeForCompare(normalized);
        const isDuplicate = state.items.some(function (item) {
          return normalizeForCompare(item.text) === compareKey;
        });

        if (isDuplicate) {
          showFeedback('Vật dụng "' + normalized + '" đã có trong danh sách.', "error");
          inputEl.focus();
          return;
        }

        const newItem = {
          id: createUniqueCustomId(state.items),
          text: normalized,
          category: category,
          checked: false,
          isDefault: false
        };

        state.items.push(newItem);

        const targetList = groupsContainer.querySelector('[data-list-category="' + category + '"]');
        if (targetList) {
          targetList.appendChild(createChecklistElement(newItem));
        }

        // Nếu đang lọc "Đã xong", tự chuyển sang "Tất cả" để người dùng thấy ngay mục vừa thêm
        if (state.filter === "checked") {
          state.filter = "all";
        }

        inputEl.value = "";
        persistState();
        syncUI();
        showFeedback('Đã thêm "' + normalized + '" vào danh sách.', "success");
        inputEl.focus();
      });
    }

    // Khởi chạy lần đầu
    renderAllItems();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChecklist);
  } else {
    initChecklist();
  }
})();

