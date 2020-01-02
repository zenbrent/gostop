import { css } from 'styled-components';

export const responsive = {
  small: '@media (max-width: 449px)',
  large: '@media (min-width: 450px)'
};

const hidden = css`
  display: none;
`;

export const hideable = css`
  ${p => p.hidden ? hidden : ''}
`;

