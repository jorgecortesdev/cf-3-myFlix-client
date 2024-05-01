// TODO: Fix the bug with timezone
export const formattedDate = (value) => {
  if (value) {
    const inputDate = new Date(value);

    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  return value;
};

export const removeNullOrUndefined = (object) => {
  for (const key in object) {
    if (object[key] === null || object[key] === undefined) {
      delete object[key];
    }
  }
};
