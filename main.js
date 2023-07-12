const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"]; // characters of days of week
const today = new Date();
let dateLookingAt = new Date(today.getFullYear(), today.getMonth(), 1);

window.onload = () => {
  updateCalendar(today);
};

// 「前月」ボタンを押したときの動作
const prevMonth = () => {
  dateLookingAt.setMonth(dateLookingAt.getMonth() - 1);
  updateCalendar(dateLookingAt);
};

// 「翌月」ボタンを押したときの動作
const nextMonth = () => {
  dateLookingAt.setMonth(dateLookingAt.getMonth() + 1);
  updateCalendar(dateLookingAt);
};

// dateが含まれる日付が今月となるように，カレンダー(grid)と「YYYY年MM月」の表示を更新
const updateCalendar = (date) => {
  const calendarHTML = makeCalendar(date.getFullYear(), date.getMonth());
  document.querySelector(".calendar-grid").innerHTML = calendarHTML;
  document.querySelector(".topbar h1").innerHTML = `${date.getFullYear()}年 ${
    date.getMonth() + 1
  }月`;
};

const isSameDate = (dateA, dateB) => {
  if (
    (dateA.getFullYear() == dateB.getFullYear()) &
    (dateA.getMonth() == dateB.getMonth()) &
    (dateA.getDate() == dateB.getDate())
  ) {
    return true;
  } else {
    return false;
  }
};

// 特定の月をカレンダーに表示するためのHTMLの内容(文字列)を作成する
const makeCalendar = (year, monthIndex) => {
  const startDayOfWeek = new Date(year, monthIndex, 1).getDay();
  const endDateThisMonth = new Date(year, monthIndex + 1, 0).getDate();
  const endDateLastMonth = new Date(year, monthIndex, 0).getDate();
  // const row = Math.ceil((startDayOfWeek + endDate) / week.length);
  let cells = [];

  // 一番目の行(月, 火, 水...の行) = 7セル分
  for (let i = 0; i < daysOfWeek.length; i++) {
    cells.push(`<div class="cell-header">${daysOfWeek[i]}</div>`);
  }
  // 今月にはみ出ている先月の日付のセル = 開始曜日に依存して，0～6セル分
  for (let i = endDateLastMonth - startDayOfWeek; i < endDateLastMonth; i++) {
    cells.push(`<div class="cell-disabled">${i + 1}</div>`);
  }
  // 今月の日付のセル
  for (let i = 0; i < endDateThisMonth; i++) {
    // ある1つの日付に対して以下の処理を行う
    const dateOfCell = new Date(year, monthIndex, i + 1);
    let cellHTML;
    if (holiday_jp.isHoliday(dateOfCell)) {
      // 土日以外の休日である場合
      cellHTML = `<div class="cell-holiday-red">`;
    } else if (dateOfCell.getDay() == 0) {
      // 日曜である場合
      cellHTML = `<div class="cell-holiday-red">`;
    } else if (dateOfCell.getDay() == 6) {
      // 土曜である場合
      cellHTML = `<div class="cell-holiday-blue">`;
    } else {
      // 平日である場合
      cellHTML = `<div class="cell">`;
    }
    if (isSameDate(dateOfCell, today)) {
      cellHTML += `<span class="today">${i + 1}</span></div>`;
    } else {
      cellHTML += `${i + 1}</div>`;
    }
    cells.push(cellHTML);
  }
  // 合計49セルになるまで，来月の日付で埋める
  for (let i = 0; cells.length < 7 * 7; i++) {
    cells.push(`<div class="cell-disabled">${i + 1}</div>`);
  }

  return cells.join("");
};
