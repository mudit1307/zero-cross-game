let move_turn = document.querySelector("#move-turn");
let blocks = document.querySelectorAll(".block");
let new_game_btn=document.querySelector("#new-game-btn");

// [zero-image , cross-image]
let zcImages = ["icons8-o-67.png", "icons8-cross-100.png"];
let move = 0;

move_turn.textContent = "First Move - O";

new_game_btn.onclick = () => {
  location.reload();
}

for (let i = 0; i < blocks.length; i++) {
  blocks[i].onclick = () => {
    // console.log("click " + i);

    let img_ele = document.createElement("img");
    img_ele.src = zcImages[move % 2 == 0 ? 0 : 1];

    let ele = document.createElement("div");
    ele.appendChild(img_ele);

    blocks[i].appendChild(ele);

    disableBtn(i);

    if (move % 2 != 0) {
      move_turn.textContent = "O - Move";
    } else {
      move_turn.textContent = "X - Move";
    }

    let val = move % 2 == 0 ? 0 : 1;
    checkWinning(i, val);
    move++;
  };
}

function disableBtn(i) {
  blocks[i].onclick = null;
}

let mask = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];

function checkWinning(i, val) {
  // console.log(Math.floor(i / 3), i % 3, val);

  mask[Math.floor(i / 3)][i % 3] = val;

  if (move > 3) {
    //search in row-col-diagonal values
    let rowSum = null,
      colSum = null,
      diagonalSumOne = null,
      diagonalSumTwo = null;

    for (let x = 0; x < 3; x++) {
      // console.log(rowSum, colSum);
      if (mask[Math.floor(i / 3)][x] != -1) {
        rowSum += mask[Math.floor(i / 3)][x];
      } else {
        rowSum = null;
        break;
      }
    }
    for (let x = 0; x < 3; x++) {
      // console.log(rowSum, colSum);
      if (mask[x][i % 3] == -1) {
        colSum = null;
        break;
      }
      colSum += mask[x][i % 3];
    }
    // console.log(rowSum, colSum);

    //check diagonal sum
    let flagOne = 1,
      flagTwo = 1;
    for (let x = 0; x < 3; x++) {
      if (mask[x][x] != -1) {
        diagonalSumOne += mask[x][x];
      } else {
        flagOne = 0;
        break;
      }
    }
    for (let x = 0; x < 3; x++) {
      if (mask[x][2 - x] != -1) {
        diagonalSumTwo += mask[x][2 - x];
      } else {
        flagTwo = 0;
        break;
      }
    }
    // console.log(diagonalSumOne);
    // console.log(diagonalSumTwo);

    if (
      rowSum == 0 ||
      colSum == 0 ||
      (diagonalSumOne == 0 && flagOne) ||
      (diagonalSumTwo == 0 && flagTwo)
    ) {
      disableRemainingBtn("O");
    } else if (
      rowSum == 3 ||
      colSum == 3 ||
      (diagonalSumOne == 3 && flagOne) ||
      (diagonalSumTwo == 3 && flagTwo)
    ) {
      disableRemainingBtn("X");
    }
  }
}

function disableRemainingBtn(winner) {
  // console.log("game disabled");

  move_turn.textContent = `Winner - ${winner}`;

  for (let x = 0; x < blocks.length; x++) {
    disableBtn(x);
  }
}
