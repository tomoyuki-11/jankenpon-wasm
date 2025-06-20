import init, { janken } from "./pkg/jankenpon_wasm.js";

async function run() {
  await init();

  const hands = ["✊", "✌️", "🖐️"];
  const resultDiv = document.getElementById("result");
  const computerDiv = document.getElementById("computer-hand");

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const userHand = button.textContent;

      document.querySelectorAll("button").forEach((btn) =>
        btn.classList.remove("selected")
      );
      button.classList.add("selected");

      // 初期状態
      resultDiv.innerHTML = "";
      let index = 0;
      let count = 0;

      const interval = setInterval(() => {
        computerDiv.textContent = hands[index];
        index = (index + 1) % hands.length;
        count++;

        if (count > 30) {
          clearInterval(interval);

          const res = janken(userHand);
          const { computer_hand, result } = res;

          computerDiv.textContent = computer_hand;
          resultDiv.innerHTML = `<span class="result">${result}</span>`;

        if (result.includes("勝ち")) {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
        }
      }, 100); // 100msごとに順番に切り替え
    });
  });
}

run();
