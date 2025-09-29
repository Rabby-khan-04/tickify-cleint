export const formatYear = (date) => {
  return new Date(date).toLocaleDateString("en-us", { year: "numeric" });
};

export const formatMonth = (date) => {
  return new Date(date).toLocaleDateString("en-us", {
    month: "short",
  });
};

export const formatDay = (date) => {
  return new Date(date).toLocaleDateString("en-us", {
    day: "2-digit",
  });
};

export const formatWeakDay = (date) => {
  return new Date(date).toLocaleDateString("en-us", {
    weekday: "short",
  });
};
export const formatYearTwo = (date) => {
  return new Date(date).toLocaleDateString("en-us", {
    year: "2-digit",
  });
};
