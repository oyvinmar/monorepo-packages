import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { colors } from "@oyvinmar-forks/tokens";
import {
  dimmers,
  disabledMixin,
  marginMixin,
} from "@oyvinmar-forks/style-helpers";

export interface ButtonProps {
  primary?: boolean;
  primaryLight?: boolean;
  danger?: boolean;
  disabled?: boolean;
  margin?: string;
  active?: boolean;
  hoverBgColor?: string;
  children?: ReactNode;
}

const isDefault = (props: ButtonProps) =>
  !props.primary && !props.primaryLight && !props.danger;

/** If a button is active (e.g. toggled on), it should appear darker, and also
 * have a darker hover state to differentiate between hover and active. */
const getActiveCss = (hoverBgColor: string) => css`
  background-color: ${dimmers.active(hoverBgColor)};
  &:hover {
    background-color: ${dimmers.hover(hoverBgColor)};
  }
`;

const hoverBgColorMap = new Map([
  ["primary", dimmers.hover(colors.blue100)],
  ["primaryLight", colors.grey95],
  ["danger", colors.grey95],
  ["default", colors.grey95],
]);
const getHoverBgColor = (props: ButtonProps) => {
  if (props.hoverBgColor) return props.hoverBgColor;
  const propKeys = Object.keys(props) as (keyof ButtonProps)[];
  const propKeyWithHoverBgColor = propKeys.find(
    (propName: keyof ButtonProps) =>
      Boolean(props[propName] as boolean) &&
      hoverBgColorMap.has(propName as string)
  );
  return propKeyWithHoverBgColor
    ? hoverBgColorMap.get(propKeyWithHoverBgColor)!
    : hoverBgColorMap.get("default")!;
};

/**
 * Represents a clickable button, used to submit forms or anywhere in a document for accessible, standard button functionality.
 */
export const Button = styled.button<ButtonProps>`
  border: none;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.5px;
  line-height: 36px;
  min-width: 64px;
  padding: 0 8px;
  text-transform: uppercase;
  transition: all 0.2s ease-out;
  cursor: pointer;

  ${marginMixin}

  .material-icons-round {
    vertical-align: middle;
    margin: -4px 0 0 0;
    font-size: 18px;
  }

  ${(props) =>
    isDefault(props) &&
    css`
      background-color: #fff;
      &:hover {
        background-color: ${getHoverBgColor(props)};
        color: #000;
      }
      ${props.active &&
      css`
        ${getActiveCss(getHoverBgColor(props))}
        color: #000;
      `}
    `}

  ${(props) =>
    props.primaryLight &&
    css`
      color: ${colors.green75};
      background-color: transparent;
      &:hover {
        background-color: ${getHoverBgColor(props)};
        color: ${dimmers.hover(colors.blue100)};
      }
      ${props.active && getActiveCss(getHoverBgColor(props))}
    `}

  ${(props) =>
    props.primary &&
    css`
      color: #fff;
      background-color: ${colors.blue100};
      &:hover {
        background-color: ${getHoverBgColor(props)};
      }
      ${props.active && getActiveCss(getHoverBgColor(props))}
    `}

  ${(props) =>
    props.danger &&
    css`
      background-color: #fff;
      color: ${colors.red80};
      &:hover {
        color: ${dimmers.hover(colors.red80)};
        background-color: ${getHoverBgColor(props)};
      }
      ${props.active && getActiveCss("#fff")}
    `}

  ${disabledMixin}
`;
