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
  properties: string[],
  duration: number,
  options?: TransitionTimingFunction,
) => string;

const getTransitionEffect: TransitionEffect = (properties, duration, options = "ease") => {
  const transitionEffect = properties
    .map((property) => `${property} ${duration}ms ${options}`)
    .join(", ");

  return transitionEffect;
};

export { getTransitionEffect };
