document.addEventListener("DOMContentLoaded", () => {
  const toggleButtons = Array.from(document.querySelectorAll(".culture-toggle"));
  const toggleAllBtn = document.getElementById("toggle-all-btn");

  const setCardState = (button, isOpen) => {
    const targetId = button.getAttribute("aria-controls");
    const detailEl = targetId ? document.getElementById(targetId) : null;
    const cardEl = button.closest(".culture-card");

    if (!detailEl || !cardEl) {
      return;
    }

    detailEl.hidden = !isOpen;
    button.setAttribute("aria-expanded", String(isOpen));
    button.textContent = isOpen ? "Thu gọn" : "Xem chi tiết";
    cardEl.classList.toggle("is-open", isOpen);
  };

  const syncToggleAllButton = () => {
    if (!toggleAllBtn || toggleButtons.length === 0) {
      return;
    }

    const allOpen = toggleButtons.every(
      (btn) => btn.getAttribute("aria-expanded") === "true"
    );

    toggleAllBtn.setAttribute("aria-pressed", String(allOpen));
    toggleAllBtn.textContent = allOpen ? "Thu gọn tất cả" : "Mở tất cả chi tiết";
  };

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      setCardState(button, !isExpanded);
      syncToggleAllButton();
    });
  });

  if (toggleAllBtn) {
    toggleAllBtn.addEventListener("click", () => {
      const shouldOpenAll = toggleAllBtn.getAttribute("aria-pressed") !== "true";
      toggleButtons.forEach((button) => setCardState(button, shouldOpenAll));
      syncToggleAllButton();
    });
  }

  syncToggleAllButton();
});
