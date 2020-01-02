import React from 'react';
import styled from 'styled-components';
import { MayOfHwatu } from '../../components/Icons';

const LicenseContainer = styled.div`
  grid-area: page;
`;

const License = styled.div`
`;

const LicensedIcon = styled.span`
  svg {
    width: 3em;
    height: 3em;
  }
`;

export const Licenses = () => {
  return (
    <LicenseContainer>
      Licenses & Attributions
      <License>
        <LicensedIcon>
          <MayOfHwatu />
        </LicensedIcon>
        <a href="https://thenounproject.com/search/?q=hanafuda&i=1629152">
          may of hwatu by 1516 from the Noun Project
        </a>
      </License>
    </LicenseContainer>
  );
}
