import frameImg from "@/app/assets/Badge.svg";
type RGB = [number, number, number];
type Creds = { key: string; iv: string };
const GRID_SIZE = 200;
const CELL_SIZE = GRID_SIZE / 20;
const NUMBER_OF_CELLS = (GRID_SIZE / CELL_SIZE) ** 2;
const KEY_LENGTH = 64;
const IV_LENGTH = 32;
const frame64 =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDI4MCAzMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMzIwIiByeD0iMTAiIGZpbGw9IiMyODJDMzQiLz4KPHJlY3QgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSIyNzkiIGhlaWdodD0iMzE5IiByeD0iOS41IiBzdHJva2U9IiM0MzRGNjQiIHN0cm9rZS1vcGFjaXR5PSIwLjYiLz4KPHBhdGggZD0iTTEwNy43OCAyNTYuNlYyNTlIOTUuMjk5NlYyNDAuMTlIMTA3LjUxVjI0Mi41SDk3Ljg0OTZWMjQ4LjI2SDEwNi40VjI1MC41MUg5Ny44NDk2VjI1Ni42SDEwNy43OFpNMTEzLjI4MyAyNTlIMTEwLjgyM1YyNDQuMThIMTEyLjk1M0wxMTMuMDczIDI0NS42MkgxMTMuMTYzQzExMy45NjMgMjQ1LjAyIDExNC43OTMgMjQ0LjU4IDExNS42NTMgMjQ0LjNDMTE2LjUzMyAyNDQuMDIgMTE3LjUxMyAyNDMuODggMTE4LjU5MyAyNDMuODhDMTIwLjIzMyAyNDMuODggMTIxLjQ3MyAyNDQuMjkgMTIyLjMxMyAyNDUuMTFDMTIzLjE3MyAyNDUuOTMgMTIzLjYwMyAyNDcuMTQgMTIzLjYwMyAyNDguNzRWMjU5SDEyMS4xNDNWMjQ5LjA0QzEyMS4xNDMgMjQ4LjA0IDEyMC44NjMgMjQ3LjMgMTIwLjMwMyAyNDYuODJDMTE5Ljc0MyAyNDYuMzQgMTE4Ljg4MyAyNDYuMSAxMTcuNzIzIDI0Ni4xQzExNy4wMDMgMjQ2LjEgMTE2LjI2MyAyNDYuMjIgMTE1LjUwMyAyNDYuNDZDMTE0Ljc2MyAyNDYuNjggMTE0LjAyMyAyNDcuMDEgMTEzLjI4MyAyNDcuNDVWMjU5Wk0xMjkuOTg0IDI0MS42SDEyNy4zNDRWMjM5LjA1SDEyOS45ODRWMjQxLjZaTTEyOS44OTQgMjU5SDEyNy40MzRWMjQ0LjE4SDEyOS44OTRWMjU5Wk0xMzkuODggMjYzLjg2QzEzOC44OCAyNjMuODYgMTM3Ljk0IDI2My43OSAxMzcuMDYgMjYzLjY1QzEzNi4yIDI2My41MyAxMzUuNDkgMjYzLjM2IDEzNC45MyAyNjMuMTRWMjYwLjk1QzEzNS4zOSAyNjEuMTMgMTM2LjA2IDI2MS4yOCAxMzYuOTQgMjYxLjRDMTM3Ljg0IDI2MS41MiAxMzguNzMgMjYxLjU4IDEzOS42MSAyNjEuNThDMTQxLjExIDI2MS41OCAxNDIuMTUgMjYxLjI4IDE0Mi43MyAyNjAuNjhDMTQzLjMxIDI2MC4xIDE0My42IDI1OS4wNiAxNDMuNiAyNTcuNTZWMjU2LjYzQzE0Mi44NiAyNTcuMDcgMTQyLjA3IDI1Ny40MSAxNDEuMjMgMjU3LjY1QzE0MC4zOSAyNTcuODcgMTM5LjU0IDI1Ny45OCAxMzguNjggMjU3Ljk4QzEzNi43IDI1Ny45OCAxMzUuMjggMjU3LjQzIDEzNC40MiAyNTYuMzNDMTMzLjU4IDI1NS4yMyAxMzMuMTYgMjUzLjQzIDEzMy4xNiAyNTAuOTNDMTMzLjE2IDI0OC4zOSAxMzMuNyAyNDYuNTggMTM0Ljc4IDI0NS41QzEzNS44OCAyNDQuNDIgMTM3Ljc0IDI0My44OCAxNDAuMzYgMjQzLjg4QzE0MS4zIDI0My44OCAxNDIuMzEgMjQzLjk0IDE0My4zOSAyNDQuMDZDMTQ0LjQ3IDI0NC4xNiAxNDUuMzYgMjQ0LjI5IDE0Ni4wNiAyNDQuNDVWMjU2Ljg3QzE0Ni4wNiAyNTkuNDcgMTQ1LjYgMjYxLjI4IDE0NC42OCAyNjIuM0MxNDMuNzYgMjYzLjM0IDE0Mi4xNiAyNjMuODYgMTM5Ljg4IDI2My44NlpNMTQwLjM2IDI0Ni4xQzEzOC40NCAyNDYuMSAxMzcuMTcgMjQ2LjQzIDEzNi41NSAyNDcuMDlDMTM1LjkzIDI0Ny43NSAxMzUuNjIgMjQ5LjAzIDEzNS42MiAyNTAuOTNDMTM1LjYyIDI1Mi43MyAxMzUuODggMjUzLjk4IDEzNi40IDI1NC42OEMxMzYuOTQgMjU1LjM2IDEzNy45NyAyNTUuNyAxMzkuNDkgMjU1LjdDMTQwLjE1IDI1NS43IDE0MC44MyAyNTUuNjEgMTQxLjUzIDI1NS40M0MxNDIuMjUgMjU1LjIzIDE0Mi45NCAyNTQuOTYgMTQzLjYgMjU0LjYyVjI0Ni40M0MxNDMuMTIgMjQ2LjMzIDE0Mi42IDI0Ni4yNSAxNDIuMDQgMjQ2LjE5QzE0MS41IDI0Ni4xMyAxNDAuOTQgMjQ2LjEgMTQwLjM2IDI0Ni4xWk0xNTIuNDUzIDI1OUgxNDkuOTkzVjI0NC4xOEgxNTIuMjQzTDE1Mi4zNjMgMjQ1LjMySDE1Mi40NTNDMTUzLjMzMyAyNDQuODIgMTU0LjEzMyAyNDQuNDYgMTU0Ljg1MyAyNDQuMjRDMTU1LjU3MyAyNDQgMTU2LjI5MyAyNDMuODggMTU3LjAxMyAyNDMuODhDMTU3Ljg1MyAyNDMuODggMTU4LjU3MyAyNDQuMDEgMTU5LjE3MyAyNDQuMjdDMTU5Ljc3MyAyNDQuNTMgMTYwLjI0MyAyNDQuOTIgMTYwLjU4MyAyNDUuNDRIMTYwLjY3M0MxNjEuNDczIDI0NC45NCAxNjIuMzEzIDI0NC41NiAxNjMuMTkzIDI0NC4zQzE2NC4wOTMgMjQ0LjAyIDE2NC45OTMgMjQzLjg4IDE2NS44OTMgMjQzLjg4QzE2Ny4zMTMgMjQzLjg4IDE2OC4zODMgMjQ0LjI2IDE2OS4xMDMgMjQ1LjAyQzE2OS44NDMgMjQ1Ljc2IDE3MC4yMTMgMjQ2Ljg2IDE3MC4yMTMgMjQ4LjMyVjI1OUgxNjcuNzUzVjI0OC42MkMxNjcuNzUzIDI0Ny43NiAxNjcuNTIzIDI0Ny4xMyAxNjcuMDYzIDI0Ni43M0MxNjYuNjAzIDI0Ni4zMSAxNjUuODczIDI0Ni4xIDE2NC44NzMgMjQ2LjFDMTY0LjMxMyAyNDYuMSAxNjMuNzIzIDI0Ni4xOSAxNjMuMTAzIDI0Ni4zN0MxNjIuNDgzIDI0Ni41MyAxNjEuODYzIDI0Ni43NyAxNjEuMjQzIDI0Ny4wOUMxNjEuMjgzIDI0Ny4yOSAxNjEuMzAzIDI0Ny40OSAxNjEuMzAzIDI0Ny42OUMxNjEuMzIzIDI0Ny44OSAxNjEuMzMzIDI0OC4xIDE2MS4zMzMgMjQ4LjMyVjI1OUgxNTguODczVjI0OC42MkMxNTguODczIDI0Ny43NiAxNTguNjQzIDI0Ny4xMyAxNTguMTgzIDI0Ni43M0MxNTcuNzIzIDI0Ni4zMSAxNTYuOTkzIDI0Ni4xIDE1NS45OTMgMjQ2LjFDMTU1LjQ5MyAyNDYuMSAxNTQuOTYzIDI0Ni4xOSAxNTQuNDAzIDI0Ni4zN0MxNTMuODQzIDI0Ni41MyAxNTMuMTkzIDI0Ni44MSAxNTIuNDUzIDI0Ny4yMVYyNTlaTTE3Ny40MDUgMjU5LjI0QzE3NS44ODUgMjU5LjI0IDE3NC43NjUgMjU4Ljg4IDE3NC4wNDUgMjU4LjE2QzE3My4zNDUgMjU3LjQyIDE3Mi45OTUgMjU2LjI2IDE3Mi45OTUgMjU0LjY4QzE3Mi45OTUgMjUzLjA4IDE3My40MjUgMjUxLjk1IDE3NC4yODUgMjUxLjI5QzE3NS4xNDUgMjUwLjYxIDE3Ni42MDUgMjUwLjI3IDE3OC42NjUgMjUwLjI3QzE3OS4zNDUgMjUwLjI3IDE4MC4wMTUgMjUwLjMgMTgwLjY3NSAyNTAuMzZDMTgxLjMzNSAyNTAuNDIgMTgxLjk1NSAyNTAuNTEgMTgyLjUzNSAyNTAuNjNWMjQ5LjE5QzE4Mi41MzUgMjQ4LjA5IDE4Mi4yNTUgMjQ3LjMgMTgxLjY5NSAyNDYuODJDMTgxLjEzNSAyNDYuMzQgMTgwLjIzNSAyNDYuMSAxNzguOTk1IDI0Ni4xQzE3OC4wNzUgMjQ2LjEgMTc3LjI2NSAyNDYuMTQgMTc2LjU2NSAyNDYuMjJDMTc1Ljg2NSAyNDYuMjggMTc1LjE2NSAyNDYuMzkgMTc0LjQ2NSAyNDYuNTVWMjQ0LjQyQzE3NS4yNjUgMjQ0LjIyIDE3Ni4wNzUgMjQ0LjA4IDE3Ni44OTUgMjQ0QzE3Ny43MzUgMjQzLjkyIDE3OC42ODUgMjQzLjg4IDE3OS43NDUgMjQzLjg4QzE4MS41MjUgMjQzLjg4IDE4Mi44NDUgMjQ0LjMgMTgzLjcwNSAyNDUuMTRDMTg0LjU2NSAyNDUuOTYgMTg0Ljk5NSAyNDcuMjQgMTg0Ljk5NSAyNDguOThWMjU5SDE4Mi43NDVMMTgyLjYyNSAyNTcuNjJIMTgyLjU2NUMxODEuOTY1IDI1OC4xIDE4MS4xODUgMjU4LjQ5IDE4MC4yMjUgMjU4Ljc5QzE3OS4yODUgMjU5LjA5IDE3OC4zNDUgMjU5LjI0IDE3Ny40MDUgMjU5LjI0Wk0xNzguOTM1IDI1Mi4yOEMxNzcuNTc1IDI1Mi4yOCAxNzYuNjI1IDI1Mi40NSAxNzYuMDg1IDI1Mi43OUMxNzUuNTY1IDI1My4xMSAxNzUuMzA1IDI1My42OSAxNzUuMzA1IDI1NC41M0MxNzUuMzA1IDI1NS40MSAxNzUuNTI1IDI1Ni4wNSAxNzUuOTY1IDI1Ni40NUMxNzYuNDA1IDI1Ni44MyAxNzcuMTI1IDI1Ny4wMiAxNzguMTI1IDI1Ny4wMkMxNzguOTA1IDI1Ny4wMiAxNzkuNzA1IDI1Ni45IDE4MC41MjUgMjU2LjY2QzE4MS4zNDUgMjU2LjQyIDE4Mi4wMTUgMjU2LjEyIDE4Mi41MzUgMjU1Ljc2VjI1Mi41OEMxODEuODc1IDI1Mi40OCAxODEuMjU1IDI1Mi40MSAxODAuNjc1IDI1Mi4zN0MxODAuMTE1IDI1Mi4zMSAxNzkuNTM1IDI1Mi4yOCAxNzguOTM1IDI1Mi4yOFoiIGZpbGw9IndoaXRlIi8+CjxtYXNrIGlkPSJwYXRoLTQtaW5zaWRlLTFfNjAxXzk4MSIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMCAyMzBIMjgwVjI2OUgwVjIzMFoiLz4KPC9tYXNrPgo8cGF0aCBkPSJNMCAyMzFIMjgwVjIyOUgwVjIzMVpNMjgwIDI2OEgwVjI3MEgyODBWMjY4WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIiBtYXNrPSJ1cmwoI3BhdGgtNC1pbnNpZGUtMV82MDFfOTgxKSIvPgo8cGF0aCBkPSJNMTMzLjc2OSAyODYuNTM4VjI4NC40NjJIMTM1LjE1NE0xMzkuMzA4IDI5Mi4wNzdIMTQwLjY5MlYyOTAuNjkyTTEzNS44NDYgMjkyLjA3N1YyOTBIMTMzLjc2OU0xMzguNjE1IDI4NC40NjJIMTQwLjY5MlYyODcuOTIzTTEzNi41MzkgMjg3LjIzMUwxMzcuOTIzIDI4Ny45MjMiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS4zODQ2MiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMzYuNTM4IDI5NS41MzhIMTM3LjkyM00xNDIuMDc3IDI4MUgxMzIuMzg1QzEzMi4wMTcgMjgxIDEzMS42NjUgMjgxLjE0NiAxMzEuNDA2IDI4MS40MDZDMTMxLjE0NiAyODEuNjY1IDEzMSAyODIuMDE3IDEzMSAyODIuMzg1VjI5Ny42MTVDMTMxIDI5Ny45ODMgMTMxLjE0NiAyOTguMzM1IDEzMS40MDYgMjk4LjU5NEMxMzEuNjY1IDI5OC44NTQgMTMyLjAxNyAyOTkgMTMyLjM4NSAyOTlIMTQyLjA3N0MxNDIuNDQ0IDI5OSAxNDIuNzk2IDI5OC44NTQgMTQzLjA1NiAyOTguNTk0QzE0My4zMTYgMjk4LjMzNSAxNDMuNDYyIDI5Ny45ODMgMTQzLjQ2MiAyOTcuNjE1VjI4Mi4zODVDMTQzLjQ2MiAyODIuMDE3IDE0My4zMTYgMjgxLjY2NSAxNDMuMDU2IDI4MS40MDZDMTQyLjc5NiAyODEuMTQ2IDE0Mi40NDQgMjgxIDE0Mi4wNzcgMjgxWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjM4NDYyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==";
export async function generateBadge({ iv, key }: Creds) {
  const frame = await loadImage(frame64);
  const canvas = document.createElement("canvas");
  canvas.width = frame.width;
  canvas.height = frame.height;
  const ctx = canvas.getContext("2d")!;
  const badgeData = generateEncryptedImage({ key, iv });
  ctx.drawImage(frame, 0, 0);
  ctx.putImageData(badgeData, 35, 10);
  return canvas.toDataURL();
}
export function readBadge(img: HTMLImageElement) {
  const canvas = new OffscreenCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  const { iv, key } = decodeImage(ctx.getImageData(35, 10, 200, 200));
  return { iv, key };
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
function generateEncryptedImage({ iv, key }: Creds) {
  const canvas = new OffscreenCanvas(GRID_SIZE, GRID_SIZE);
  const ctx = canvas.getContext("2d", { alpha: true })!;
  let currentStringPos = 0;
  const stringToEncode = Array.from(key + iv);
  Array(NUMBER_OF_CELLS)
    .fill(null)
    .forEach((_, i) => {
      const { x, y } = getCell(i);
      if (i % 3 === 0 && i > 55 && i < 343) {
        const altaredColor = devideNumberPerChannel(
          convertHexToNumber(stringToEncode[currentStringPos]),
        );
        ctx.fillStyle = createColor(altaredColor);
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        currentStringPos++;
        //uncomment to see witch cells are used, Will break decoding(on purpose)
        // showEncodedCells(ctx, x, y);
      } else {
        ctx.fillStyle = createColor();
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
      }
    });
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}
export function decodeImage(imageData: ImageData) {
  let numbersToHex: number[] = [];
  const offscreenCtx = new OffscreenCanvas(GRID_SIZE, GRID_SIZE).getContext(
    "2d",
  )!;
  offscreenCtx.putImageData(imageData, 0, 0);
  Array(NUMBER_OF_CELLS)
    .fill(null)
    .forEach((_, i) => {
      if (i % 3 == 0 && i > 55 && i < 343) {
        const { x, y } = getCell(i);
        let imageData = offscreenCtx.getImageData(x, y, 1, 1);
        let data = imageData.data;
        const channelSum =
          data.reduce((channel, sum) => (sum += channel), 0) - 255;
        numbersToHex.push(
          channelSum > 400 ? 674 - channelSum : channelSum - 182,
        );
      }
    });
  const decodedString = convertToHexString(numbersToHex);
  return {
    key: decodedString.slice(0, KEY_LENGTH),
    iv: decodedString.slice(KEY_LENGTH, KEY_LENGTH + IV_LENGTH),
  };
}
function showEncodedCells(
  ctx: OffscreenCanvasRenderingContext2D,
  x: number,
  y: number,
) {
  ctx.strokeStyle = "rgb(255,0,5)";
  ctx.rect(x, y, CELL_SIZE, CELL_SIZE);
  ctx.stroke();
}
function devideNumberPerChannel(numb: number): RGB {
  const channelR = Math.floor(numb / 3);
  const channelG = Math.floor(numb / 3);
  const channelB = numb - (channelR + channelG);
  return [channelR, channelG, channelB];
}
function createColor(altared?: RGB) {
  const color = altared ?? [
    Math.floor(Math.random() * 6),
    Math.floor(Math.random() * 6),
    Math.floor(Math.random() * 6),
  ];
  if (Math.random() >= 0.5) {
    return `rgba(${86 + color[0]},${20 + color[1]},${76 + color[2]},1)`;
  } else {
    return `rgba(${206 - color[0]},${214 - color[1]},${254 - color[2]},1)`;
  }
}

function convertHexToNumber(hex: string): number {
  return parseInt(hex, 16);
}

function convertToHexString(numbers: number[]): string {
  let str = "";
  numbers.forEach((num) => (str += num.toString(16)));
  return str;
}
function getCell(cell: number) {
  let x = (cell % (GRID_SIZE / CELL_SIZE)) * CELL_SIZE;
  let y = Math.floor(cell / (GRID_SIZE / CELL_SIZE)) * CELL_SIZE;
  return { x, y };
}
