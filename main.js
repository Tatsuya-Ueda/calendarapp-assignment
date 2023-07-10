const daysOfWeekChar = ["日", "月", "火", "水", "木", "金", "土"]; // characters of days of week

const prevMonth = () => {
  updateCalendar();
};

const nextMonth = () => {
  //   alert();

  updateCalendar();
};

const updateCalendar = () => {
  let x = "";
  // 曜日のセルを描画
  for (let i = 0; i < daysOfWeekChar.length; i++) {
    x += '<div class="cell">' + daysOfWeekChar[i] + "</div>";
  }
  // 日付のセルを描画
  for (let i = 0; i < 6 * daysOfWeekChar.length; i++) {
    x += '<div class="cell">(日付)</div>';
  }
  document.querySelector(".calendar-grid").innerHTML = x;
};
