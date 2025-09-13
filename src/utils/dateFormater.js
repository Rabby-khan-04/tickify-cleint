export const formatYear = (date) => {
  return new Date(date).toLocaleDateString("en-us", { year: "numeric" });
};
