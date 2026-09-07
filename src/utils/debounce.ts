const debounce = <Args extends unknown[]>(func: (...args: Args) => void, delay: number) => {
  let timer: NodeJS.Timeout;

  return (...args: Args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export { debounce };
