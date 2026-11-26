const regionFilter = document.querySelector(".region-filter");
const dishItems = [...document.querySelectorAll(".dish-item")];
const regionNote = document.querySelector("#region-note");
const dishCount = document.querySelector("#dish-count");

const regionNotes = {
  all: regionNote.textContent,
  north: "Ở Hà Nội, phở bò được chan nước dùng nóng, còn bún chả ăn bằng cách chấm từng đũa bún vào bát mắm.",
  central: "Huế có tô bún bò thơm sả và mắm ruốc. Đến Quảng Nam, tô mì chỉ chan ít nước và thường có bánh tráng nướng ăn kèm.",
  south: "Cơm tấm là bữa quen ở Sài Gòn. Xuống miền Tây, thử bánh xèo vỏ mỏng cuốn với rau sống.",
};

function showDishes(region) {
  let visibleCount = 0;

  for (const dish of dishItems) {
    const matches = region === "all" || dish.dataset.region === region;
    dish.hidden = !matches;

    if (matches) {
      visibleCount++;
    }
  }

  regionNote.textContent = regionNotes[region];
  dishCount.textContent = `${visibleCount} món`;
}

regionFilter.addEventListener("change", (event) => {
  showDishes(event.target.value);
});

showDishes(regionFilter.querySelector(":checked").value);
regionFilter.hidden = false;
