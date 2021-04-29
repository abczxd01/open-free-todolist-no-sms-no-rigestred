const calendar = document.querySelector('.calendar');

const month_names = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0);

getFebDays = (year) => (isLeapYear(year) ? 29 : 28);

generateCalendar = (month, year) => {
  const calendar_days = calendar.querySelector('.calendar-days');
  const calendar_header_year = calendar.querySelector('#year');

  const days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  calendar_days.innerHTML = '';

  const currDate = new Date();
  if (!month) month = currDate.getMonth();
  if (!year) year = currDate.getFullYear();

  const curr_month = `${month_names[month]}`;
  month_picker.innerHTML = curr_month;
  calendar_header_year.innerHTML = year;

  // get first day of month

  const first_day = new Date(year, month, 1);

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    const day = document.createElement('div');
    if (i >= first_day.getDay()) {
      day.classList.add('calendar-day-hover');
      day.innerHTML = i - first_day.getDay() + 1;
      if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
        day.classList.add('curr-date');
      }
    }
    calendar_days.appendChild(day);
  }
};

const month_list = calendar.querySelector('.month-list');

month_names.forEach((e, index) => {
  const month = document.createElement('div');
  month.innerHTML = `<div data-month="${index}">${e}</div>`;
  month.querySelector('div').onclick = () => {
    month_list.classList.remove('show');
    curr_month.value = index;
    generateCalendar(index, curr_year.value);
  };
  month_list.appendChild(month);
});

let month_picker = calendar.querySelector('#month-picker');

month_picker.onclick = () => {
  month_list.classList.add('show');
};

const currDate = new Date();

let curr_month = { value: currDate.getMonth() };
let curr_year = { value: currDate.getFullYear() };

generateCalendar(curr_month.value, curr_year.value);

document.querySelector('#prev-year').onclick = () => {
  --curr_year.value;
  generateCalendar(curr_month.value, curr_year.value);
};

document.querySelector('#next-year').onclick = () => {
  ++curr_year.value;
  generateCalendar(curr_month.value, curr_year.value);
};
