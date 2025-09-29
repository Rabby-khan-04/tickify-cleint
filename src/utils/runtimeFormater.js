export const runtimeFormater = (runtime) => {
  const min = runtime % 60;
  const hour = (runtime - min) / 60;

  return `${hour}h ${min}m`;
};
