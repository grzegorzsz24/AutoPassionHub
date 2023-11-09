class DateFormatter {
  private static readonly months = [
    "stycznia",
    "lutego",
    "marca",
    "kwietnia",
    "maja",
    "czerwca",
    "lipca",
    "sierpnia",
    "września",
    "października",
    "listopada",
    "grudnia",
  ];

  static formatDate(date: string): string {
    const then = new Date(date);
    const now = new Date();
    const diff = (now.getTime() - then.getTime()) / 1000;

    if (diff < 5) {
      return "Przed chwilą";
    } else if (diff < 60) {
      return `${Math.floor(diff)} sek.`;
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)} min`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)} godz.`;
    } else if (diff < 2592000) {
      return `${Math.floor(diff / 86400)} dni`;
    } else {
      return `${then.getDate()} ${
        DateFormatter.months[then.getMonth()]
      } ${then.getFullYear()}`;
    }
  }

  static getDayNumber(date: string): string {
    return `${new Date(date).getDate()}`;
  }

  static getMonthName(date: string): string {
    return `${DateFormatter.months[new Date(date).getMonth()]}`;
  }
}

export default DateFormatter;
