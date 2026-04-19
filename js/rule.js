document.addEventListener("DOMContentLoaded", async () => {
  await CreateAccordion();
  Accordion();
  Marquee();
  FadeIn_vertical();
});

async function CreateAccordion() {
  const list = document.getElementById("accordion-list");

  // 外部HTML読み込み
  const res = await fetch("components/accordion_element.html");
  const templateHTML = await res.text();

  const res_ = await fetch("database/regulations.json");
  const regulations = await res_.json();

  regulations.forEach(item => {
    // HTML文字列 → DOM化
    const element = document.createElement("li");
    element.innerHTML = templateHTML;

    // 中身差し替え
    element.querySelector(".ac-title").textContent = item.title;
    element.querySelector(".ac-desc").innerHTML = item.description.replace(/\n/g, "<br>");

    list.appendChild(element);
  });
}

function Accordion(){
    const buttons = document.querySelectorAll(".ac-button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector(".icon");

            // すでに開いているかどうか
            const isOpen = content.classList.contains("ac-open");

            // すべて閉じる（排他制御）
            document.querySelectorAll(".ac-content").forEach(item => {
                item.classList.remove("ac-open");
                
                buttons.forEach(btn => {
                    other_icon =  btn.querySelector(".icon");
                    other_icon.classList.remove("rotate-180");
                });
            });

            // クリックしたものだけ開く（トグル）
            if (!isOpen) {
                content.classList.add("ac-open");
                icon.classList.add("rotate-180");
            }
        });
    });
}

function Marquee(){
    const marquee = document.getElementById("marquee");

    // 中身を複製
    marquee.innerHTML += marquee.innerHTML;

    let x = 0;
    let speed = 1.0; // ← 速度調整（数値を小さくすると遅くなる）

    function loop() {
    x -= speed;

    const halfWidth = marquee.scrollWidth / 2;
    if (Math.abs(x) >= halfWidth) {
        x = 0;
    }

    marquee.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(loop);
    }

    loop();
}

function FadeIn_vertical(){
  const targets = document.querySelectorAll(".fade-ver");

  const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry,index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("fade-ver-show");
            observer.unobserve(entry.target); // 一度だけ
          }, (entry.target.dataset.delay * 100 + 100));   
        }
        });
    }, {
        threshold: 0
    });

    targets.forEach(target => observer.observe(target));
}