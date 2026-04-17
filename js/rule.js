document.addEventListener("DOMContentLoaded", async () => {
  await CreateAccordion();
  Accordion();
  Modal();
  Marquee();
  FadeIn_vertical();
});

async function CreateAccordion() {
  const list = document.getElementById("accordion-list");

  // 外部HTML読み込み
  const res = await fetch("components/accordion_element.html");
  const templateHTML = await res.text();

  AccordionData.forEach(item => {
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
const AccordionData = [
  {
    title:"用具の種類",
    description:'公式の面、小太刀、長剣などを使用します。他に楯、長槍、棒、短刀、杖があります。面を好きな色に染めたり、剣のグリップに装飾したりと自由にカスタマイズできます。\n服装も規程はありません。サークルのTシャツ、ジャージ、袴などなんでも着用できます。',
  },
  {
    title:"一本の定義",
    description:'相手の体を先に叩いたら一本です。ただし、かすったり撫でたりするだけではいけません。しっかりと音が鳴るように、十分な威力で当てる必要があります。\n攻撃が楯や剣に当たった場合は無効です。また、剣に当たった後に剣がしなって体に当たった場合でも一本とは認められません。',
  },
  {
    title:"大会の流れ",
    description:'男女別、有段・有級などの階級別でトーナメントが行われます。\n学生大会では、新人・上級生、男女、S/A/Bクラスの3段階に分かれます。1人4種目にエントリーできることが多いです。\n大会の最後に、各種目の優勝者が自分の勝った武器で戦う「グランドチャンピオン戦」が行われることもあります。',
  },
  {
    title:"試合の作法",
    description:'試合の前にコートに向かって一回、相手選手に向かって一回、礼をします。\n開始線に立ち、「構え刀」の合図で剣を構え、「始め」で動き出します。\n勝負がついたら「納め刀、礼」の合図でお互いに礼をします。最後にコートに向かって礼をします。',
  },
  {
    title:"コートの大きさ",
    description:'コートは5~9m四方の正方形です。試合中は片足までコート外に出ても良く、両足が出たら場外反則です。\n場外反則を2回すると失格になり、負けとみなされます。\n相手に押されているときなど、あえて一度場外に出て試合を中断し、形勢を立て直すこともあります。',
  },
  {
    title:"判定の方法",
    description:'基本的に3人の審判と1人の検査役(チェッカー)がいます。\n「赤の勝ち」「白の勝ち」「相打ち」「不十分」などの判定が存在します。3人の審判のうち、2人以上の判定が一致したらその判定が採用されます。\nまた、「合議」というルールがあり、一度だけ判定に異議を唱えることができます。',
  },
  {
    title:"合議制",
    description:'判定に不服があるとき、負けた選手は手一度だけ手を挙げて判定に異議を唱えることができます。\n「自分の方が先に当てた」「相手の小手打ちは実は剣に当たっていた」「相手の攻撃は不十分であった」など、あらゆる言い分を述べることができます。\n検査役が双方の選手の言い分を聞き、その発言を踏まえて3人の審判と検査役の4人で再度判定をします。2度目の判定は覆すことができません。',
  },
  {
    title:"反則と処分",
    description:'場外反則(コートの大きさを参照)の他に、「かばい手」という反則があります。\n武器を持っていない方の腕に相手の攻撃が当たった場合、手でかばったという扱いになります。試合は続行しますが、「かばい手」をした選手はその腕を背中側に回して固定したまま戦わなければなりません。固定を離してしまったり、もう一度同じ腕に攻撃が当たった場合は反則負けとなります。\n\nまた、剣の根本で攻撃することを「元打ち」といいます。罰則はありませんが、危険なので禁止されています。',
  },
  {
    title:"団体戦",
    description:'大会によっては団体戦が行われることもあります。\n5人制の場合、「先鋒、次鋒、中堅、副将、大将」が順番に戦います。\n学生大会では2026年度から武器のルールが改定され、先鋒から順に「小太刀、長剣フリー、楯小太刀/両手長剣、二刀/楯長剣、長槍/長巻/棒」を受け持つことになりました。',
  },
  {
    title:"基本動作",
    description:'スポーツチャンバラには「基本動作」と呼ばれる型も存在します。\n掛け声に合わせて「面、小手、胴、足、突き」を順番に行い、その美しさを競います。\n段級別、男女混合でトーナメントが組まれます。武器によって型が異なりますが、すべて合同で行われ、どの武器で出場してもよいです。',
  },
]

const modalData = {
  kodachi: {
    title: "小太刀",
    description: 
    '最も基本の武器。\n長さは60cmで軽くて振りやすい。\n素早い攻撃が可能な分、間合い管理の重要度が高い。\nキレのあるステップで相手を翻弄しよう。\nその扱いやすさから初心者にも人気だ。',
    video: "videos/rule/小太刀_一本.mp4",
  },
  choken: {
    title: "長剣フリー",
    description: 
    '1mの長剣を片手で持つ種目。\n武器が長い分、相手の攻撃をガードできる確率も高い。\n迫力のある連打や、遠くから伸びる足打ちは見ごたえがある。\n選手たちの人気ナンバーワン種目だ。',
    video: "videos/rule/長剣_一本.mp4",
  },
  tatekodachi: {
    title: "楯小太刀",
    description: 
    '利き手に小太刀、反対に楯を持って戦う。\n近い間合いでの激しい攻防が特徴的。\nガードできる面積が広い分、テクニカルなフェイントで囲いの隙を狙うことが重要だ。',
    video: "videos/rule/楯小太刀_一本.mp4",
  },
  ryote: {
    title: "両手長剣",
    description: 
    '剣道のように長剣を両手で持つ種目。\n全種目の中で最も剣のスピードが速い。\n自在な打ちが可能なので、ギリギリの体勢からのカウンターや足打ちでも一本となる点が剣道との大きな違い。',
    video: "videos/rule/両手_一本.mp4",
  },
  nito: {
    title: "二刀",
    description: 
    '利き手に長剣、反対に小太刀を持って戦う。\n小太刀で攻撃することも可能だが、基本はガードに用いる。\n囲いながら安全に攻撃を繰り出せるが、高いスキルを要する。',
    video: "videos/rule/二刀_一本.mp4",
  },
  tatechoken: {
    title: "楯長剣",
    description: 
    '利き手に長剣、反対に楯を持って戦う。\n二刀と似ているが、楯長剣は足を守りにくく、代わりに上半身をしっかり守れる点が異なる。\nガードさせて空いたところに打ち込むシーンがよく見られる。',
    video: "videos/rule/楯長剣_一本.mp4",
  },
  choso: {
    title: "長槍",
    description: 
    '長さ2m。突きと斬撃を駆使して戦う。\nグランドチャンピオン戦ではその圧倒的なリーチで高確率で決勝戦まで残れる。\n相手が飛び込んできたところに足斬撃を決めるのがカッコいい。',
    video: "videos/rule/長槍_一本.mp4",
  },
  bo: {
    title: "棒",
    description: 
    '両側で攻撃できるロマン武器。\n習得難度が高いが、極めると文字通り変幻自在の攻撃を繰り出せる。\n斬撃に気を取られたところに突きを入れる勝ち方もよく見られる。',
    video: "videos/rule/棒_一本.mp4",
  },
  tanto: {
    title: "短刀",
    description: 
    '最も短い武器で、長さは45cm。\n反対の手で何度でも身を守ってよいという特有のルールが存在する。\n基本的に突きで攻撃するが、斬撃も可能だ。',
    video: "videos/rule/短刀_一本.mp4",
  },
  tanso: {
    title: "短槍",
    description: 
    '長剣の鍔を外して槍として用いる。\n突きと斬撃のバランスが最も良い種目。\n意外とリーチがあるので他種目相手でもかなり戦える。',
    video: "videos/rule/短槍_一本.mp4",
  },
  jo: {
    title: "杖",
    description: 
    '杖(じょう)は棒を短くしたもの。\n棒の自由自在さはそのままに、軽く扱いやすくなっている。\n競技人口は少ないが、逆にグランドチャンピオン戦を見据えるなら有力候補だ。',
    video: "videos/rule/杖_一本.mp4",
  },
};

function Modal(){
    
    let modal = document.getElementById('modal');
    let content = document.querySelector('.modal-content');

    const buttons = document.querySelectorAll(".modal-button");
    buttons.forEach(button => {
        button.addEventListener("click",() => {
            const data = modalData[button.dataset.id];

            document.getElementById("modal-title").textContent = data.title;
            document.getElementById("modal-text").textContent = data.description;

            const videos = document.querySelectorAll(".modal-video");
            videos.forEach(video =>{
              video.src = data.video;
              video.load();
            });
            ModalOperation(modal,content,false);    
        });     
    });

    modal.addEventListener("click", (event) => {
        if(event.target.closest('.modal-content') === null) {
            ModalOperation(modal,content,true); 
        }
    });

    const closer = document.querySelector(".modal-closer");
    closer.addEventListener("click",()=>{
        ModalOperation(modal,content,true);
    });
}

function ModalOperation(modal,content,Flag){
  modal.classList.toggle("modal-hide",Flag); 
  content.classList.toggle("modal-slided",Flag);
  document.body.classList.toggle("touch-none",!Flag);
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