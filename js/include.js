document.addEventListener("DOMContentLoaded",async () => {
  await loadHTML("header", "components/header.html",HeaderFade);
  loadHTML("footer", "components/footer.html");
  await loadHTML("drawer", "components/drawer.html");
  Hamburger();
  HideLoading();
});

function loadHTML(id, url,callback) {
  return fetch(url)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;

      if (callback) callback();
    });
}

function HeaderFade(){
  // const header_fade = document.getElementById("header-fade");

  // setTimeout(()=>{
  //   header_fade.classList.remove("opacity-0");
  //   header_fade.classList.remove("translate-y-2");
  // },25);
}

function Hamburger(){
  const btn = document.getElementById("hamburger");
  const wrapper = document.getElementById("drawer-wrapper");
  const overlay = document.getElementById("drawer-overlay");
  const content = document.getElementById("drawer-content");

  btn.addEventListener("click", () => {
    wrapper.classList.remove("drawer-hide");
    content.classList.remove("drawer-slided");
  });

  overlay.addEventListener("click", (event) => {
    if(event.target.closest('#drawer-content') === null){
      wrapper.classList.add("drawer-hide");
      content.classList.add("drawer-slided");
    }
  });
}

function HideLoading(){
  const overlay = document.getElementById("loading");
  overlay.classList.add("opacity-0")
}