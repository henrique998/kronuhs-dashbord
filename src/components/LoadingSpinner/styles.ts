import styled from "styled-components"

export const Spinner= styled.div`
  @keyframes spinner {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
  }

  margin: 0 auto;

  width: 25px;
  height: 25px;
  border: 5px solid ${props => props.theme.white};
  border-top: 5px solid transparent;
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
`