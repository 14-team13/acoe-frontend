import styled from '@emotion/styled';

export const HostContainer = styled.section`
  position: relative;
`;

export const HostWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 30px;
  padding: 5px;
  display: flex;
  vertical-align: middle;
  div > a + a {
    margin-left: 24px;
  }
`;
