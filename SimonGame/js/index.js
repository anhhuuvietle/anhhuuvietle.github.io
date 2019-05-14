/**
 * 
 * 1. Khi người dùng bật power thì mới có thể bấm start để chơi => Khi bấm tắt, tất cả phải trở về ban đầu
 * 2. Khi người dùng bấm bắt đầu, máy sẽ chơi, trong lúc máy chơi, người dùng click vào ko có hiệu lực
 * 3. Sau khi máy chơi xong, người dùng sẽ bắt đầu chơi, nếu chơi đúng hết thì máy sẽ tiếp tục chơi vòng tiếp theo, còn nếu chơi sai thì reset về lại ban đầu, người dùng phải click start để chơi lại
 * 4. Trong quá trình chơi, nếu người dùng bấm start thì coi như bắt đầu chơi lại từ đầu
 */







const PLAYER_TURN=1,COMPUTER_TURN=0;let turn=0,order=[],playerOrder=[],power=!1,round=0,intervalId=0;const items=document.querySelectorAll(".simon__item"),powerCheck=document.querySelector("#power"),roundText=document.querySelector(".simon__count-number"),audio=document.querySelectorAll("#audio");function pressOne(a){a.classList.add("press"),setTimeout(function(){a.classList.remove("press")},500)}function pressAll(){for(let a of items)pressOne(a)}function updateRound(){roundText.innerHTML=round}function reset(){clearInterval(intervalId),turn=COMPUTER_TURN,order=[],playerOrder=[],round=0,intervalId=0,updateRound()}powerCheck.addEventListener("click",function(){power=!power});function randomOrder(){let a=79*Math.random();return Math.round(a)%4}function play(){round++,updateRound();const a=randomOrder();order.push(a);let b=0;intervalId=setInterval(function(){return b>round-1?(clearInterval(intervalId),void(turn=PLAYER_TURN)):void(audio[order[b]].play(),pressOne(items[order[b]]),b++)},700)}for(const[a,b]of Array.from(items).entries())b.addEventListener("click",function(){if(turn==PLAYER_TURN){pressOne(b),audio[a].play();let c=playerOrder.length;if(order[c]!==a)return pressAll(),reset(),void setTimeout(function(){alert("B\u1EA1n ch\u01A1i \u0111\u01B0\u1EE3c "+(0===round?0:round-1)+" \u0111i\u1EC3m")},100);playerOrder.push(a),playerOrder.length===round&&(turn=COMPUTER_TURN,playerOrder=[],setTimeout(play,200))}});document.querySelector("button").addEventListener("click",function(){power&&(reset(),play())});