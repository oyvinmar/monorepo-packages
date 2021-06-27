import { css } from 'styled-components';

export const marginMixin = (props: any) =>
  props.margin &&
  css`
    margin: ${props.margin};
  `;

export const paddingMixin = (props: any) =>
  props.padding &&
  css`
    padding: ${props.padding};
  `;

export const heightMixin = (props: any) =>
  props.height &&
  css`
    height: ${props.height};
  `;

export const disabledMixin = (props: any) =>
  props.disabled &&
  css`
    pointer-events: none;
    opacity: 0.5;
  `;
