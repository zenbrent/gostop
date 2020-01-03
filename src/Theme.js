import styled, { css } from 'styled-components';

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 300;
  text-align: center;
  margin: 0.5rem 0 0 0;
  padding: 0;

  font-variant: small-caps;
  color: deeppink;
`;

const subtitle = css`
  font-size: 1rem;
  text-align: center;

  font-variant: initial;
  color: red;
`;

export const SectionSubtitle = styled.h3`
  ${subtitle}

  font-weight: 600;
  margin: 0 0 0.5rem 0;
  padding: 0;
`;

export const SectionSubtitleInline = styled.span`
  ${subtitle}

  font-weight: 600;
  margin-left: 0.5rem;
`;

const smallPx = 449;

export const responsive = {
  smallPx,
  largePx: smallPx + 1,
  small: `@media (max-width: ${smallPx}px)`,
  large: `@media (min-width: ${smallPx + 1}px)`
};

const hidden = css`
  display: none;
`;

export const hideable = css`
  ${p => p.hidden ? hidden : ''}
`;

