document.addEventListener("DOMContentLoaded", () => {
  Init();
});

function Init(){
    const sheet = document.querySelector(".modal-content");
    const overlay = document.getElementById("modal");

    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    // 閉じる関数
    function closeSheet() {
        sheet.style.transform = "";
        sheet.classList.add("modal-slided");
        overlay.classList.add("modal-hide");
    }

    // 背景クリックで閉じる
    overlay.addEventListener("click", closeSheet);

    // タッチ開始
    sheet.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
    isDragging = true;
    sheet.style.transition = "none";
    });

    // タッチ移動
    sheet.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    currentY = e.touches[0].clientY;
    let diff = currentY - startY;

    if (diff > 0) {
        sheet.style.transform = `translateY(${diff}px)`;
    }
    });

    // タッチ終了
    sheet.addEventListener("touchend", () => {
    isDragging = false;
    sheet.style.transition = "transform 0.3s";

    if (currentY - startY > 100) {
        closeSheet();
    } else {
        sheet.style.transform = "";
    }
    });

}