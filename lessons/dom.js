let toggle = false;
let btnElement = document.querySelector(".js-button");
function button() {
  if (toggle) {
    btnElement.innerHTML = "Subscribe"
    btnElement.classList.remove('subscribed-btn');
    toggle = false;
  } else {
    btnElement.innerHTML = "Subscribed"
    btnElement.classList.add('subscribed-btn');
    toggle = true;
  }
}

function calculate() {
  let orderPrice = document.querySelector(".js-calculate").value;
  let number = Number(orderPrice);

  if (number < 40) {
    number += 10;
    document.querySelector(
      ".total-price"
    ).innerHTML = `<p>$${number} with shipping</p>`;
  } else {
    document.querySelector(
      ".total-price"
    ).innerHTML = `<p>$${number} free shipping</p>`;
  }
}
function handlekey(e) {
  if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    document.querySelector(".total-price").innerHTML = "";
  }
}
let text = document.getElementById("text");

const button1 = document.getElementById("click");

button1.addEventListener('click', (() => {
   text.textContent = 'Hello DOM';
}))

const input = document.getElementById("js-input");
let text2 = document.getElementById("js-display-input");

document.getElementById('click2').addEventListener('click', (() => {
    text2.innerHTML = input.value;
}))

const colorText = document.getElementById("color-text");
document.getElementById("change-color").addEventListener('click', () => {
    colorText.style.color = "red"
})
let num2 = document.getElementById("checker");
const resultDisplay = document.getElementById("result2");
document.getElementById("checkBtn").addEventListener('click', () => {
    const convertNum = Number(num2.value);
    if(convertNum % 2===0){
        resultDisplay.innerHTML = "<p>Even</p>";
    }else{
        resultDisplay.innerHTML = "<p>Odd</p>";
    }
})

const secretTxt = document.getElementById("secret");
const btn1 = document.getElementById("toggle1");
console.log(btn1)

btn1.addEventListener('click', () => {
    if(btn1.innerHTML === 'Hide'){
        secretTxt.style.display = "none";
        btn1.innerHTML = 'Show'
    }else{
        secretTxt.style.display = "block";
        btn1.innerHTML = 'Hide'
    }
})