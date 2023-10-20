const formatDate = (date: string): string => {
  const then = new Date(date);
  const now = new Date();
  const diff =
    (new Date(now.toISOString()).getTime() -
      new Date(then.toISOString()).getTime()) /
    1000;

  console.log(then, now, diff);

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
    const months = [
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
    return `${then.getDate()} ${months[then.getMonth()]} ${then.getFullYear()}`;
  }
};

export default formatDate;
