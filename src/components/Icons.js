import styled from 'styled-components';
import { ReactComponent as _MayOfHwatu } from '../icons/noun_may_of_hwatu_1629152.svg';
import { ReactComponent as _JulyOfHwatu } from '../icons/july_of_hwatu.svg';

export const MayOfHwatu = styledIcon(_MayOfHwatu);
export const JulyOfHwatu = styledIcon(_JulyOfHwatu);


function styledIcon (icon) {
  return styled(icon)`
    /* Use the embedded attribution if the icon is larger than 100px. */
    max-width: 100px;
    max-height: 100px;
    text {
      display: none;
    }
    display: inline;
    vertical-align: middle;
  `;
}
