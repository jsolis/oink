export function formatDate(date) {
  const dayOfWeekArr = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'
  ];
  const monthArr = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
  ];

  let dateObj = new Date(date);

  let dayOfWeek = dayOfWeekArr[dateObj.getDay()];
  let month = monthArr[dateObj.getMonth()];
  let dayOfMonth = dateObj.getDate();
  let hour = dateObj.getHours();
  let minute = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();

  return `${dayOfWeek} ${month} ${dayOfMonth} ${hour}:${minute}`;
};