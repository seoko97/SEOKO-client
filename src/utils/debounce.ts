type Func = (...args: any[]) => void;

const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export { debounce };
