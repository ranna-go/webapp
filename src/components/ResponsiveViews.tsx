import styled from 'styled-components';

const SWITCH_WIDTH = '37em';

export const MobileView = styled.div`
  @media screen and (min-width: ${SWITCH_WIDTH}) {
    display: none;
  }
`;

export const DesktopeView = styled.div`
  @media screen and (max-width: ${SWITCH_WIDTH}) {
    display: none;
  }
`;
