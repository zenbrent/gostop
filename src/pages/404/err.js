import React from 'react';
import styled from 'styled-components';
import { SectionTitle, SectionSubtitle } from '../../Theme';

const Page = styled.div`
  grid-area: page;
`;


export function NotFound () {
  return (
    <Page>
      <SectionTitle>404</SectionTitle>
      <SectionSubtitle>not found</SectionSubtitle>
    </Page>
  );
}

