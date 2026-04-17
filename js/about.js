document.addEventListener("DOMContentLoaded", async () => {
  await CreateCard();
  LoadCards();
});

async function CreateCard(){
  const list = document.getElementById("card-list");

  // 外部HTML読み込み
  const res = await fetch("components/card.html");
  const templateHTML = await res.text();

  ElementData.forEach(data => {
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

const ElementData = [
  {
    name: "のむへい",
    grade: "4年",
    grade_color: "bg-cyan-700",
    description: '颯剣会の26代主将。剣速と連打で自分の強みを押し付けるパワーファイター。\n昨年度は3年生ながら楯長剣でグランドチャンピオン戦に出場した。\n勉強面も申し分なく、東大数学の解答速報を出すほど。',
    image: 'images/members/nomuhei.jpg',
  },
  {
    name: "おいさく",
    grade: "4年",
    grade_color: "bg-cyan-700",
    description: '戦闘員。颯剣会には珍しい、スタンダードな戦い方をするチャンバラー。\n新人のころは長槍で女子グランドチャンピオン戦に出場したこともある。\nあらゆる面でいい人すぎて仕事をさせるのが申し訳ない。',
    image: 'images/members/oisaku.jpg',
  },
  {
    name: "kwn",
    grade: "3年",
    grade_color: "bg-fuchsia-800",
    description: '颯剣会の27代主将。カウンターや連打など多彩な技術を使いこなす。\n1年生の頃から数々の大会で入賞してきた。肝心なところで負ける。\n朝起きられないという欠点がある。',
    image: 'images/members/kwn.jpg',
  },
  {
    name: "たーにー",
    grade: "3年",
    grade_color: "bg-fuchsia-800",
    description: '戦闘員。独特なリズムの攻撃で数多の強豪選手を初見殺ししてきた。\n全日本チャンピオンに勝ったことをこすり続けている。\n本人曰く、目を開けたまま寝るらしい。',
    image: 'images/members/ta-ni-.jpg',
  },
  {
    name: "おのこき",
    grade: "3年",
    grade_color: "bg-fuchsia-800",
    description: '戦闘員。剣道時代からの飛び込み面が主力武器。最近、長槍を触り始めた。\n颯剣会の車出し兼大喜利担当として皆を目的地まで安全運転でお届けする。\n宴会では必ずハイボールを頼むが炭酸が嫌いらしい。',
    image: 'images/members/onokoki.jpg',
  },
  {
    name: "ぱなか",
    grade: "3年",
    grade_color: "bg-fuchsia-800",
    description: '戦闘員。目にも止まらぬ連打で相手を粉砕する。\n特に楯小太刀において彼の右に出る者はいない。\n団体戦ではいつも目覚ましい活躍を見せるが、個人戦は振るわない。\n砂肝とミミガーが好き。渋い。',
    image: 'images/members/panaka.jpg',
  },
  {
    name: "もりもってぃ",
    grade: "3年",
    grade_color: "bg-fuchsia-800",
    description: '戦闘員。ステップはおとなしいが、彼の剣速は本物。\n基本動作3級4位を勝ち取ったこともあるらしい。\nどんなテキトーなボケも絶対に面白く切り替えしてくれる。\n彼がいると全員が幸せになる。',
    image: 'images/members/morimotty.jpg',
  },
  {
    name: "だいさん",
    grade: "3年",
    grade_color: "bg-fuchsia-800",
    description: '戦闘員。実力としてはかなりの上位だが多忙すぎてレアキャラになっている。\n団体戦では横国のエースを完璧に討ち取り、チームを救った。\n練習の合間に謎に筋トレを始める。\n宴会ではただのカルピスでハイになる姿が観測できる。',
    image: 'images/members/daisan.jpg',
  },
  {
    name: "ダイキ",
    grade: "2年",
    grade_color: "bg-yellow-400/50",
    description: '現東大主将。意外なタイミングで繰り出される深い足打ちを得意とする。\n新人時代は小太刀で全国3位に輝くなど、頭角を現し始めている。\nしごできすぎて敵に回したくないので人狼では最初に追放される。',
    image: 'images/members/dai@.png',
  },
  {
    name: "りんかす",
    grade: "2年",
    grade_color: "bg-yellow-400/50",
    description: '現東女主将。冷静に相手の攻撃を回避してからカウンターの足打ちが強力。\n初出場の大会で何人もの同年代を瞬殺した。2年の中で誰よりも出稽古に行き、練習している。\nついでに2年の中で誰よりも笑い声がでかい。',
    image: 'images/members/rinka.jpg',
  },
  {
    name: "リンダ",
    grade: "2年",
    grade_color: "bg-yellow-400/50",
    description: '戦闘員。軌道の読めない連打をしつつ間合いを詰め、攻撃こそ最大の防御を体現している。\n彼の応援は絶対にかき消されることがないので、大会で多くの仲間を勇気づけている。\nなぜかお酒に詳しい。',
    image: 'images/members/rinda.jpg',
  },
  {
    name: "💧",
    grade: "2年",
    grade_color: "bg-yellow-400/50",
    description: '戦闘員。全種類の打ちをまんべんなく使いこなす。\n彼女とりんかすで颯剣会2年全体のやる気を引き上げている。\n免許取得に大苦戦していたが...',
    image: 'images/members/miz.jpg',
  },
  {
    name: "げんとく",
    grade: "2年",
    grade_color: "bg-yellow-400/50",
    description: '戦闘員。颯剣会の数少ないサウスポーで、絶妙な間合いをキープして戦う。\n本当は右利きだが、バドミントン時代の名残で左手で剣を振っているらしい。\n負けると普段の3オクターブ高い声が聞こえる。',
    image: 'images/members/gentoku.jpg',
  },
  {
    name: "るるぴ",
    grade: "2年",
    grade_color: "bg-yellow-400/50",
    description: '戦闘員。じっくり待ってとんでもなく伸びるカウンターで仕留める。\n部員もわかっているはずなのに何度でも食らってしまうのは不思議だ。\nいつ見ても面がフィットしてなさすぎる。',
    image: 'images/members/ruru.jpg',
  },
  {
    name: "もりた",
    grade: "2年",
    grade_color: "bg-yellow-400/50",
    description: '戦闘員。鋭い出小手で一瞬の隙を捉える。\n秋入部で、スポチャン歴は短いがセンスで実力をどんどん上げている。\nいろいろ間違えて横浜に一人暮らししている。',
    image: 'images/members/morita.jpg',
  },
]