import { colors } from "@oyvinmar-forks/tokens";
import { darken } from "polished";

const getDimmerColor = (color: string) => {
  if (["white", "#fff", "#ffffff"].includes(color)) {
    return colors.grey100;
  }
  return color;
};

export const dimmers = {
  hover: (color?: string) =>
    color ? darken(0.075, getDimmerColor(color)) : "#000",
  active: (color?: string) =>
    color ? darken(0.15, getDimmerColor(color)) : "#000",
};
