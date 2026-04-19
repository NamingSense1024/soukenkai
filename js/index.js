document.addEventListener("DOMContentLoaded", () => {
  FadeIn();
});

function FadeIn(){
    const targets = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("fade-show");
            observer.unobserve(entry.target); // 一度だけ
          }, 100);   
        }
        });
    }, {
        rootMargin:"-10% 0%",
        threshold: 0
    });

    targets.forEach(target => observer.observe(target));
}

window.lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
