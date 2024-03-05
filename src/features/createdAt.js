export function createdAt(dateString) {
  
  var date = new Date(dateString);
  var options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
  var formattedDate = date.toLocaleDateString('en-US', options).replace(","," ");

  return formattedDate
}
