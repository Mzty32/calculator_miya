// 仕様書
// Cを押したときに値がクリアされる．
// ＋/-を押したときに，+または，何もついてない数字の場合，－を付ける．－がついているときは－が消える
// ％を押したときに，入力されている値に0.01を掛ける ex)16％→0.16
// デリートボタンを押したときに，右側から1つ値を消す
// ．０～９までのボタンを押したとき，値が右側から入力される．
// +,-,×,÷が入力されたとき，それぞれ，「+」，「-」，「*」「/」が適用される．

// 各キーに対してDOM取得
const keyClear = document.getElementById("key_btn_clear");
const keyPlusMinus = document.getElementById("key_btn_plusminus");
const keyPercent = document.getElementById("key_btn_percent");
const keyDelete = document.getElementById("key_btn_delete");
const key9 = document.getElementById("key_btn_9");
const key8 = document.getElementById("key_btn_8");
const key7 = document.getElementById("key_btn_7");
const key6 = document.getElementById("key_btn_6");
const key5 = document.getElementById("key_btn_5");
const key4 = document.getElementById("key_btn_4");
const key3 = document.getElementById("key_btn_3");
const key2 = document.getElementById("key_btn_2");
const key1 = document.getElementById("key_btn_1");
const key0 = document.getElementById("key_btn_zero");
const keyDot = document.getElementById("key_btn_dot");
const keyAddition = document.getElementById("key_btn_additon");
const keySubtraction = document.getElementById("key_btn_subtraction");
const keyMultiplication = document.getElementById("key_btn_multiplication");
const keyDivision = document.getElementById("key_btn_division");
const keyEqual = document.getElementById("key_btn_equal");
const result = document.getElementById("calc_monitor_display");

//keyを押した時に1文字消える．
let results = "";

//数値keyを押したときに，入力される．
const keybtns = [
  key0,
  key1,
  key2,
  key3,
  key4,
  key5,
  key6,
  key7,
  key8,
  key9,
  keyDot,
];

const operatorBtns = [
  keyAddition,
  keySubtraction,
  keyMultiplication,
  keyDivision,
];

keybtns.forEach((key) => {
  key.addEventListener("click", () => {
    // 現在の表示テキストを取得
    let currentText = result.innerText;

    // 表示テキストが "0" の場合、新しい数値で置き換える
    if (currentText == "0") {
      result.innerText = key.innerText;
      results = result.innerText;
    } else {
      // それ以外の場合、数値を末尾に追加
      result.innerText += key.innerText;
      results = result.innerText;
    }
  });
});

operatorBtns.forEach((key) => {
  key.addEventListener("click", () => {
    let resultsEndTxt = "";
    try {
      resultsEndTxt = results.slice(-1);
    } catch (error) {}

    //最後の入力が 数字 or 演算子　で条件分岐
    if (isNaN(resultsEndTxt) && resultsEndTxt != "") {
      results = results.replace(/.$/, key.innerText);
      result.innerText = results;
    } else {
      //四則演算子を入力したときに表示
      results += key.innerText;
      result.innerText = results;
    }

    console.log(results);
  });
});

keyEqual.addEventListener("click", () => {
  numArr = results.match(/\d+(\.\d+)?/g); // 正規表現を使って小数点を含む数値を抽出
  console.log(numArr);

  opeArr = results.split("").filter((txt) => {
    return txt === "+" || txt === "-" || txt === "×" || txt === "÷";
  });
  console.log(opeArr);

  // 各配列を1つずつ計算するようにしたい
  for (let i = 0; i <= numArr.length - 1; i++) {
    switch (opeArr[i]) {
      case "+":
        numArr[0] = Number(numArr[0]) + Number(numArr[i + 1]);
        console.log(numArr[0]);
        break;
      case "-":
        numArr[0] = Number(numArr[0]) - Number(numArr[i + 1]);
        console.log(numArr[0]);
        break;
      case "×":
        numArr[0] = Number(numArr[0]) * Number(numArr[i + 1]);
        console.log(numArr[0]);
        break;
      case "÷":
        numArr[0] = Number(numArr[0]) / Number(numArr[i + 1]);
        console.log(numArr[0]);
        break;

      default:
        break;
    }

    results = numArr[0];
    result.innerText = numArr[0];
  }
});

keyDelete.addEventListener("click", () => {
  results = result.innerText;
  let neoResults = results.split("");
  // console.log(neoResults);
  // console.log(neoResults.length);

  if (neoResults.length == 1) {
    results = "0";
    result.innerText = "0";
    return;
  }

  let lastResult = neoResults.pop(); //最後の文字
  //Results = "551"
  //lastResult = [1], neoResult = [5,5] ← 上記でpopをくらったあとの結果が表示される．
  //  console.log(lastResult);
  //  console.log(neoResults);

  results = neoResults.join("");
  result.innerText = results;
});

keyClear.addEventListener("click", () => {
  result.innerText = "0";
});

keyPercent.addEventListener("click", () => {
  if (!isNaN(results)) {
    // resultsを数値に変換し、0.01を掛けて結果を表示に反映
    result.innerText = parseFloat(results) * 0.01;
  }
  results = result.innerText;
});

keyPlusMinus.addEventListener("click", () => {
  alert("よう分からんので，未実装ですぅ");
});

//-----------------------------------------

// // クリックされた演算子を対応する文字に変換する関数
// function getOperatorText(operator) {
//   switch (operator) {
//     case "÷":
//       return "/";
//     case "×":
//       return "*";
//     case "−":
//       return "-";
//     default:
//       return operator;
//   }
// }

// // 演算子keyを押したときに，入力される．

// operatorBtns.forEach((key) => {
//   key.addEventListener("click", () => {
//     // 演算子がクリックされた場合、それを表示結果に追加
//     const operatorText = getOperatorText(key.innerText);
//     appendOperator(operatorText);
//   });
// });

// // ...

// // 電卓の表示結果に演算子を追加する関数
// function appendOperator(operator) {
//   // 電卓の現在の表示テキストを取得
//   let currentText = result.innerText;

//   // 最後の文字が演算子でない場合にのみ演算子を追加
//   if (!isOperator(currentText.charAt(currentText.length - 1))) {
//     currentText += operator;
//     updateResult(currentText);
//   }
// }

// // 文字列が演算子かどうかを判定する関数
// function isOperator(char) {
//   return char === "+" || char === "-" || char === "*" || char === "/";
// }

// // 電卓の表示結果を更新する関数
// function updateResult(text) {
//   result.innerText = text;
// }
