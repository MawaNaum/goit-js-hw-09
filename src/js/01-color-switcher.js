// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.

// ВНИМАНИЕ
// Учти, на кнопку «Start» можно нажать бесконечное количество раз. Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна (disabled).

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', startChangeBgColor);
stopBtn.addEventListener('click', stopChangeBgColor);

let changeBgColorInterval = null;

function startChangeBgColor() {
  startBtn.disabled = true;
  changeBgColorInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 2000);
}

function stopChangeBgColor() {
  startBtn.disabled = false;
  clearInterval(changeBgColorInterval);
}

// Для генерации случайного цвета используй функцию getRandomHexColor.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
