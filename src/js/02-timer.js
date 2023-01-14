// Напиши скрипт таймера, который ведёт обратный отсчет до определенной даты.

// В HTML есть готовая разметка таймера, поля выбора конечной даты и кнопки, при клике по которой таймер должен запускаться. Добавь минимальное оформление элементов интерфейса.
// См. common.css

// Используй библиотеку flatpickr для того чтобы позволить пользователю кроссбраузерно выбрать конечную дату и время в одном элементе интерфейса. Для того чтобы подключить CSS код библиотеки в проект, необходимо добавить еще один импорт, кроме того который описан в документации.

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Библиотека уведомлений
// Для отображения уведомлений пользователю вместо window.alert() используй библиотеку notiflix.

import Notiflix from 'notiflix';

// Библиотека flatpickr ожидает что её инициализируют на элементе input[type="text"], поэтому мы добавили в HTML документ поле input#datetime-picker.
// <input type="text" id="datetime-picker" />
// Вторым аргументом функции flatpickr(selector, options) можно передать необязательный объект параметров. Мы подготовили для тебя объект который нужен для выполнения задания. Разберись за что отвечает каждое свойство в документации «Options» и используй его в своем коде.
// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };

// Выбор даты
// Метод onClose() из обьекта параметров вызывается каждый раз при закрытии элемента интерфейса который создает flatpickr. Именно в нём стоит обрабатывать дату выбранную пользователем. Параметр selectedDates это массив выбранных дат, поэтому мы берем первый элемент.

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

let selectedDate = '';
startBtn.addEventListener('click', startCount);

const daysToTarget = document.querySelector('span[data-days]');
const hoursToTarget = document.querySelector('span[data-hours]');
const minutesToTarget = document.querySelector('span[data-minutes]');
const secondsToTarget = document.querySelector('span[data-seconds]');

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < new Date()) {
// Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
        startBtn.disabled = true;
        
// Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
        //   alert('Please choose a date in the future');
          
      Notiflix.Notify.warning('Please choose a date in the future');
          
      } else {
// Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал дату в будущем.
// При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с момента нажатия.
      startBtn.disabled = false;
      selectedDate = selectedDates[0];
    }
  },
});

// Отсчет времени
// При нажатии на кнопку «Start» скрипт должен вычислять раз в секунду сколько времени осталось до указанной даты и обновлять интерфейс таймера, показывая четыре цифры: дни, часы, минуты и секунды в формате xx:xx:xx:xx.

// Количество дней может состоять из более чем двух цифр.
// Таймер должен останавливаться когда дошел до конечной даты, то есть 00:00:00:00.

function startCount() {
  const interval = setInterval(() => {
      const currentTime = new Date();
      
// Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах.
    let time = convertMs(selectedDate - currentTime);

    daysToTarget.textContent = addLeadingZero(time.days);
    hoursToTarget.textContent = addLeadingZero(time.hours);
    minutesToTarget.textContent = addLeadingZero(time.minutes);
    secondsToTarget.textContent = addLeadingZero(time.seconds);

    if (selectedDate - currentTime < 1000) {
      clearInterval(interval);
      // return;
    }
  }, 1000);
}

// НЕ БУДЕМ УСЛОЖНЯТЬ
// Если таймер запущен, для того чтобы выбрать новую дату и перезапустить его - необходимо перезагрузить страницу.

// Форматирование времени
// Функция convertMs() возвращает объект с рассчитанным оставшимся временем до конечной даты. Обрати внимание, что она не форматирует результат. То есть, если осталось 4 минуты или любой другой составляющей времени, то функция вернет 4, а не 04. В интерфейсе таймера необходимо добавлять 0 если в числе меньше двух символов. Напиши функцию addLeadingZero(value), которая использует метод метод padStart() и перед отрисовкой интефрейса форматируй значение.

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах.

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}