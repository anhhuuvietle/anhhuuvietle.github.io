/**
 * 
 * 1. Khi người dùng bật power thì mới có thể bấm start để chơi => Khi bấm tắt, tất cả phải trở về ban đầu
 * 2. Khi người dùng bấm bắt đầu, máy sẽ chơi, trong lúc máy chơi, người dùng click vào ko có hiệu lực
 * 3. Sau khi máy chơi xong, người dùng sẽ bắt đầu chơi, nếu chơi đúng hết thì máy sẽ tiếp tục chơi vòng tiếp theo, còn nếu chơi sai thì reset về lại ban đầu, người dùng phải click start để chơi lại
 * 4. Trong quá trình chơi, nếu người dùng bấm start thì coi như bắt đầu chơi lại từ đầu
 */








const PLAYER_TURN = 1, COMPUTER_TURN = 0;

let turn = COMPUTER_TURN;
let order = []; // thu tu choi cua may
let playerOrder = []; // thu tu choi cua nguoi
let power = false; // power bat chua
let round = 0;



// Trong khi làm
let intervalId = 0;

// Lay cac phan tu
const items = document.querySelectorAll(".simon__item");
const powerCheck = document.querySelector("#power");
const roundText = document.querySelector(".simon__count-number");
const audio = document.querySelectorAll("#audio");







// Cap nhat giao dien

function pressOne(item) {
  item.classList.add("press");
  setTimeout(function() {
    item.classList.remove("press");
  }, 500);
}

function pressAll() {
  for(let item of items) {
    pressOne(item);
  }
}
function updateRound() {
  roundText.innerHTML = round;
}



// Logic
function reset() {
  clearInterval(intervalId);
  
  turn = COMPUTER_TURN;
  order = []; // thu tu choi cua may
  playerOrder = []; // thu tu choi cua nguoi
  round = 0;
  intervalId = 0;
  updateRound();
}
powerCheck.addEventListener("click", function() {
  power = !power;
});

function randomOrder() {
  let number = Math.random() * 79; // 0 -> 79
  return Math.round(number) % 4;
}
function play() {
  // Tang so vong len 1
  round++;
  updateRound();
  // Tao ra so ngau nhien moi
  const nextOrder = randomOrder();
  order.push(nextOrder);

  // Chay het order ra giao dien
  let run = 0;
  intervalId = setInterval(function() {
    if (run > round - 1) {
      // Sau khi chạy xong, dừng lại, đổi lượt cho người chơi
      clearInterval(intervalId);
      turn = PLAYER_TURN;
      return;
    }
    audio[order[run]].play();
    pressOne(items[order[run]]);
    run++;
  }, 700);
}

for(const [index, item] of Array.from(items).entries()) {
  item.addEventListener("click", function() {
    if (turn === PLAYER_TURN) {
      pressOne(item);
      audio[index].play();
      let playerOderIndex = playerOrder.length;
      if (order[playerOderIndex] !== index) {
        pressAll();
        reset();
        setTimeout(function() {
          alert("Bạn chơi được " + (round === 0 ? 0 : round - 1) + " điểm");
        }, 100);
        return; 
      }
      playerOrder.push(index);
      if (playerOrder.length === round) {
        turn = COMPUTER_TURN;
        playerOrder = [];
        setTimeout(play, 200);
      }
      
    }
  });
}

document.querySelector("button").addEventListener("click", function() {
  if (power) {
    reset();
    play();
  }
});
