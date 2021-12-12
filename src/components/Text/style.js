import styled from "styled-components";

export const Text = styled.div`
display: flex;
  font-size: ${({ size }) => size};
  font-weight: ${({ bold }) => (bold ? "700" : "400")};
  justify-content: center;
`;
