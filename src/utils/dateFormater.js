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

export const formatTime = (time) => {
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const farmateFullDate = (date) => {
  return new Date(date).toLocaleDateString("en-us", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
