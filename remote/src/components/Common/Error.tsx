import styled from 'styled-components';

import { errorLoadingWrap } from 'styles/common';

import errorPng from 'images/page_error.png';

const ErrorBox = styled(errorLoadingWrap)`
  float: left;
  padding: 5px;
  box-sizing: border-box;
  margin-bottom: 8px;
`;

const ErrorDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const Ebox = styled.div`
  font-weight: bold;
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Img = styled.img`
  width: 20%;
`;

export default function Error({
  css,
}: {
  css: React.CSSProperties | undefined;
}) {
  return (
    <ErrorBox style={css}>
      <ErrorDiv>
        <Ebox>
          <Img src={errorPng} alt="error" />
          <div>
            오류<span> Error</span>
          </div>
        </Ebox>
      </ErrorDiv>
    </ErrorBox>
  );
}
