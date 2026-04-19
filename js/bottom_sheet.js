document.addEventListener("DOMContentLoaded", () => {
  Init();
  ChangeContent();
  Input();
  ManageSwipe();
});

let modal;
let sheet;

let weapon_data;

async function Init(){
    modal = document.getElementById("modal");
    sheet = document.getElementById("modal-content");

    modal_title = document.getElementById("modal-title");
    modal_text = document.getElementById("modal-text");

    modal_videos = document.querySelectorAll(".modal-video");

    const res = await fetch("database/weapons.json");
    weapon_data = await res.json();
}

function ChangeContent(){
    const buttons = document.querySelectorAll(".modal-button");
    buttons.forEach(button => {
        button.addEventListener("click",() => {
            const data = weapon_data[button.dataset.id];

            document.getElementById("modal-title").textContent = data.title;
            document.getElementById("modal-text").textContent = data.description;

            document.querySelectorAll(".modal-video").forEach(video =>{
              video.src = data.video;
              video.load();
            });
            OpenSheet();   
        });
    });
}

function OpenSheet(){
    modal.classList.remove("modal-hide");
    document.body.classList.add("touch-none");

    window.lenis.stop();
}

function CloseSheet() {
    sheet.style.transform = "";

    modal.classList.add("modal-hide");
    document.body.classList.remove("touch-none");

    window.lenis.start();
}

function Input(){
    const overlay = document.getElementById("modal-overlay");
    overlay.addEventListener("click", () => {      
            CloseSheet(); 
    });

    const closer = document.querySelector(".modal-closer");
    closer.addEventListener("click",()=>{
        CloseSheet();
    });
}

function isMobile() {
    return window.matchMedia("(max-width: 767px)").matches;
}

function ManageSwipe(){
    let cleanupSwipe = null;
    function handleResize() {
        if (isMobile()) {
            if (!cleanupSwipe) {
            cleanupSwipe = EnableSwipe();
            }
        } else {
            if (cleanupSwipe) {
            cleanupSwipe();
            cleanupSwipe = null;
            }
        }
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // 初回実行
}

function EnableSwipe(){
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    // タッチ開始
    function OnTouchStart(e){
        startY = e.touches[0].clientY;
        isDragging = true;
        sheet.style.transition = "none";
    }

    // タッチ移動
    function OnTouchMove(e){
        if (!isDragging) return;

        currentY = e.touches[0].clientY;
        let diff = currentY - startY;

        if (diff > 0) {
            sheet.style.transform = `translateY(${diff}px)`;
        }
    }

    // タッチ終了
    function OnTouchEnd(){
        isDragging = false;
        sheet.style.transition = "transform 0.3s";

        if (currentY - startY > 100) {
            CloseSheet();
        } else {
            sheet.style.transform = "";
        }
    }
    
    sheet.addEventListener("touchstart", OnTouchStart);
    sheet.addEventListener("touchmove", OnTouchMove); 
    sheet.addEventListener("touchend", OnTouchEnd);

    return () => {//一度実行したら取り外し用の関数を返す。
        sheet.removeEventListener("touchstart", OnTouchStart);
        sheet.removeEventListener("touchmove", OnTouchMove);
        sheet.removeEventListener("touchend", OnTouchEnd);
    };
}