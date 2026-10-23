export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;
let producers = 2;
let maxProducers = 6;

//render rectangle function
function display_graph(
  color: string,
  text: string,
  amount: number,
  text_position: number,
) {
  ctx.fillStyle = "#233e43";
  ctx.fillText(`${text}: ${amount}`, 18, text_position);
  ctx.fillStyle = color;
  ctx.fillRect(18, text_position + 8, amount * 14, 20);
}

function update() {
  //calc new production, consumption and balance values based on new producer count
  const production = producers * 3;
  const consumption = 6;
  const balance = production - consumption;

  //render producer rectangles
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < maxProducers; i++) {
    ctx.fillStyle = i < producers ? "#27766b" : "#c9d2c9";
    ctx.fillRect(18 + i * 45, 16, 36, 36);
    ctx.fillStyle = i < producers ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(i + 1), 31 + i * 45, 40);
  }

  //render producer/consumer bars, text, and summary text
  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";
  ctx.fillText(`Producers: ${producers} / ${maxProducers}`, 18, 76);
  display_graph("#27766b", "Production", production, 102);
  display_graph("#a44d23", "Consumption", consumption, 154);
  readout.textContent =
    `Assigned: ${producers}/${maxProducers} · Production: ${production} · Consumption: ${consumption} · Balance: ${
      balance > 0 ? "+" : ""
    }${balance}`;
}

document.querySelector<HTMLButtonElement>("#allocation-less")!.onclick = () => {
  producers = Math.max(0, producers - 1);
  update();
};
document.querySelector<HTMLButtonElement>("#allocation-more")!.onclick = () => {
  producers = Math.min(maxProducers, producers + 1);
  update();
};
document.querySelector<HTMLButtonElement>("#allocation-reset")!.onclick =
  () => {
    producers = 2;
    update();
  };
update();
