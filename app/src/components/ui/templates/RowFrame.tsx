import styled from "@emotion/styled";

const RowFrame = styled.div`
  width: 980px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    width: 100%;
    padding: 0 16px;
  }
`;

export default RowFrame;
