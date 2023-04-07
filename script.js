const newDate = new Date();
let currentYear = newDate.getFullYear();
let currentMonth = newDate.getMonth();
const currentDay = newDate.getDate();

const months = [
  {
    name: "January",
    days: 31,
  },
  {
    name: "February",
    days: leapYearCheck(currentYear) ? 29 : 28,
  },
  {
    name: "March",
    days: 31,
  },
  {
    name: "April",
    days: 30,
  },
  {
    name: "May",
    days: 31,
  },
  {
    name: "June",
    days: 30,
  },
  {
    name: "July",
    days: 31,
  },
  {
    name: "August",
    days: 31,
  },
  {
    name: "September",
    days: 30,
  },
  {
    name: "October",
    days: 31,
  },
  {
    name: "November",
    days: 30,
  },
  {
    name: "December",
    days: 31,
  },
];

function leapYearCheck(year) {
  const isDivisibleBy4 = year % 4 === 0;
  const isDivisibleBy100 = year % 100 === 0;
  const isDivisibleBy400 = year % 400 === 0;

  if (isDivisibleBy4 && !isDivisibleBy100) {
    return true;
  }

  if (isDivisibleBy100 && isDivisibleBy400) {
    return true;
  }

  return false;
}

const yearElement = document.querySelector("#year");
const monthNameElement = document.querySelector("#month");
const calendar = document.querySelector(".days-container");

function displayWeek() {
  const weekContainer = document.querySelector(".week-container");

  for (let i = 5; i < 12; i++) {
    const date = new Date(`2023-03-${i}`).toLocaleString("default", {
      weekday: "short",
    });
    console.log(date);
    weekContainer.innerHTML += `<li>${date}</li>`;
  }
}

displayWeek();

function displayCalendar() {
  yearElement.innerHTML = currentYear;
  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    { month: "long" }
  );

  monthNameElement.innerText = monthName;

  const monthStartAt = () => {
    const newDate = new Date(`${currentYear}-${months[currentMonth].name}-1`);
    const weekDay = newDate.getDay();
    return weekDay;
  };

  for (let i = 0; i < monthStartAt(); i++) {
    calendar.innerHTML += `<li></li>`;
  }

  for (let i = 1; i < months[currentMonth].days + 1; i++) {
    if (i === currentDay) {
      calendar.innerHTML += `<li class="today">${i}</li>`;
    } else {
      calendar.innerHTML += `<li>${i}</li>`;
    }
  }
}

function changeMonth() {
  const previousBtn = document.querySelector("#previous-month-btn");
  const nextBtn = document.querySelector("#next-month-btn");
  const month = newDate.getMonth();
  const year = newDate.getFullYear();

  previousBtn.addEventListener("click", () => {
    currentMonth--;
    calendar.innerHTML = "";
    displayCalendar();

    if (currentMonth <= 0) {
      currentMonth = 12;
      currentYear--;
    }

    if (month !== currentMonth || year !== currentYear) {
      const today = calendar.querySelector(".today");
      today.classList.remove("today");
    }
  });

  nextBtn.addEventListener("click", () => {
    currentMonth++;
    calendar.innerHTML = "";
    displayCalendar();

    if (currentMonth >= 11) {
      currentMonth = -1;
      currentYear++;
    }

    if (month !== currentMonth || year !== currentYear) {
      const today = calendar.querySelector(".today");
      today.classList.remove("today");
    }
  });
}

changeMonth();

displayCalendar();
