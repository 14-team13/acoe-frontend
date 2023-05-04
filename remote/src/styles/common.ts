import styled from 'styled-components';

import { theme } from './theme';

const { whiteButton, button, onWhiteButton, onButton } = theme;

export const errorLoadingWrap = styled.div`
  background: #fff;
  margin-bottom: 8px;
  width: 100%;
  height: 100%;
  color: #000;
  div:after {
    background: #383f5a;
  }
`;

export const Button = styled.div<{ on?: unknown }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 16px;
  height: 54px;
  border-radius: 100px;
  font-weight: 700;
  font-size: 20;
  line-height: 30px;
  letter-spacing: -0.02em;
  background-color: ${({ on }) => (on ? button : whiteButton)};
  color: ${({ on }) => (on ? onButton : onWhiteButton)};
  box-sizing: border-box;
`;
