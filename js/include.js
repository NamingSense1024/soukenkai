document.addEventListener("DOMContentLoaded",async () => {
  await loadHTML("header", "components/header.html");
  loadHTML("footer", "components/footer.html");
  Hamburger();
  HideLoading();
  BigImage();
});

function loadHTML(id, url,callback) {
  return fetch(url)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;

      if (callback) callback();
    });
}

function Hamburger(){
  const btn = document.getElementById("hamburger");
  const wrapper = document.getElementById("drawer-wrapper");
  const overlay = document.getElementById("drawer-overlay");
  const content = document.getElementById("drawer-content");
  const bars = hamburger.querySelectorAll(".bar");

  function HamburgerToggle(){//open:true close:false
    const flag = !wrapper.classList.contains("drawer-hide");
    if(flag){
      window.lenis.stop();
    }else{
      window.lenis.start();
    }

    content.classList.toggle("drawer-slided",!flag);

    bars[0].classList.toggle("rotate-[25deg]",flag);
    bars[0].classList.toggle("translate-y-[8px]",flag);

    bars[1].classList.toggle("opacity-0",flag);

    bars[2].classList.toggle("-rotate-[25deg]",flag);
    bars[2].classList.toggle("-translate-y-[8px]",flag);
  }

  btn.addEventListener("click", () => {
    wrapper.classList.toggle("drawer-hide");
    
    HamburgerToggle();
  });

  overlay.addEventListener("click", (event) => {
    if(event.target.closest('#drawer-content') === null){
      wrapper.classList.add("drawer-hide");
      HamburgerToggle();
    }
  });
}

function HideLoading(){
  const overlay = document.getElementById("loading");
  overlay.classList.add("opacity-0")
}

function BigImage(){
  const images = document.querySelectorAll(".img-lg");

  images.forEach((img) => {
    const highRes = new Image();
    highRes.src = img.dataset.src;

    highRes.onload = () => {
      img.src = highRes.src;
      img.classList.remove("blur-md");
    };
  });
}