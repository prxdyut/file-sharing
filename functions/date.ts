export function formatDate(date : Date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    
    return `${day} ${month}`;
  }