type TransitionTimingFunction =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear"
  | "step-start"
  | "step-end"
  | "initial"
  | "inherit";

type TransitionEffect = (
  properties: string[] | string,
  duration: number,
  options?: TransitionTimingFunction,
) => { transition: string };

const getTransitionEffect: TransitionEffect = (properties, duration, options = "ease") => {
  let transition: string;

  if (properties instanceof Array) {
    transition = properties.map((property) => `${property} ${duration}ms ${options}`).join(", ");
  } else {
    transition = `${properties} ${duration}ms ${options}`;
  }

  return {
    transition,
    MozTransition: transition,
    OTransition: transition,
  };
};

export { getTransitionEffect };
