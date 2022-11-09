let select = new Audio("./assets/select.wav");
let over = new Audio("./assets/game-over.mp3");
let turn = "X";
let gameOver = false;
let reset = document.getElementById('btn');

// function to change turn
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

// function to check winner
const checkWin = () => {
  let boxText = document.getElementsByClassName("boxContent");
  let win = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
  ];

  win.forEach(ele => {
    if((boxText[ele[0]].innerText === boxText[ele[1]].innerText) && (boxText[ele[2]].innerText === boxText[ele[1]].innerText) && (boxText[ele[0]].innerText !== "")){
        document.querySelector(".turn").innerText = boxText[ele[0]].innerText + " Won";
        gameOver = true;
        document.querySelector(".line").style.display = 'block';
        document.querySelector(".line").style.transform = `translate(${ele[3]}vw, ${ele[4]}vw) rotate(${ele[5]}deg)`;
        document.querySelector(".line").style.width = "20vw";
        over.play();
    }
  })
};

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((ele) => {
  let boxText = ele.querySelector(".boxContent");
  ele.addEventListener("click", () => {
    if (boxText.innerText === "") {
      boxText.innerText = turn;
      turn = changeTurn();
      select.play();
      checkWin();
      if(!gameOver){
        document.getElementsByClassName("turn")[0].innerText = "Turn for " + turn;
      }
    }
  });
});

reset.addEventListener('click', () => {
  let boxText = document.getElementsByClassName('boxContent');
  Array.from(boxText).forEach(ele => {
    ele.innerText = "";
  })
  turn = 'X';
  gameOver = false;
  document.getElementsByClassName("turn")[0].innerText = "Turn for " + turn;
  document.querySelector(".line").style.display = 'none';
})
