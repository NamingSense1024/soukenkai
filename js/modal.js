const overlay = document.getElementById('modal');
const modal = document.querySelector('.modal-content');

let startY = 0;
let currentY = 0;
let isDragging = false;

function ModalOperation(modal,content,Flag){
  modal.classList.toggle("modal-hide",Flag); 
  content.classList.toggle("modal-slided",Flag); 
}

// タッチ開始
modal.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
  isDragging = true;
});

// タッチ移動
modal.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  currentY = e.touches[0].clientY;
  const diff = currentY - startY;

  // 下方向のみ動かす
  if (diff > 0) {
    modal.style.transform = `translateY(${diff}px)`;
  }
});

// タッチ終了
modal.addEventListener("touchend", () => {
  isDragging = false;

  const diff = currentY - startY;

  // 100px以上スワイプしたら閉じる
  if (diff > 100) {
    ModalOperation(overlay,modal,true);
  } else {
    // 元に戻す
    modal.style.transform = "";
  }
});