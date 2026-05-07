document.addEventListener("DOMContentLoaded", async () => {
  await CreateCard();
  LoadCards();
});

async function CreateCard(){
  const list = document.getElementById("card-list");

  // 外部HTML読み込み
  const res = await fetch("components/card.html");
  const templateHTML = await res.text();

  const res_ = await fetch("database/members.json");
  const members = await res_.json();

  members.forEach(data => {
    // HTML文字列 → DOM化
    const element = document.createElement("li");
    element.innerHTML = templateHTML;

    // 中身差し替え
    element.querySelector(".el-name").textContent = data.name; //名前差し替え

    const grade_label = element.querySelector(".el-grade"); //学年差し替え
    grade_label.textContent = data.grade;
    grade_label.classList.add(data.grade_color);

    element.querySelector(".el-disc").textContent = data.description; //説明差し替え

    const image = element.querySelector(".el-image"); //画像差し替え
    image.src = data.image;

    list.appendChild(element);
  });
}

function LoadCards(){
    const show_btn = document.getElementById("show-btn");
    const cards = document.querySelectorAll(".card");

    let index = 0; //今何番目まで表示したか
    const load_count = 4; //何個ずつ表示するか

    for(let i=0; i < load_count; i++){
        const el = cards[index+i];
        ShowCard(el);
    }
    index += load_count;

    show_btn.addEventListener("click", () =>{
        for(let i=0; i < load_count; i++){
            if((index+i) >= cards.length){
                show_btn.classList.add("hidden");
                break;
            }
            const el = cards[index+i];

            setTimeout(() => {
                ShowCard(el);
            }, i*100);   
        }
        index += load_count; 
    });
}

function ShowCard(el){
  el.classList.remove("card-hide");
}