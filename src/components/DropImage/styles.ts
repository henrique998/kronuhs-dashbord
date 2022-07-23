import styled from 'styled-components'

interface DropImageContainerProps {
  isDragin: boolean
}

export const DropImageContainer = styled.div<DropImageContainerProps>`
  border: 3px dashed
    ${(props) =>
      props.isDragin ? props.theme['green-500'] : props.theme['gray-400']};
  background-color: ${(props) => props.theme['gray-200']};
  border-radius: 8px;
`
export const Wrapper = styled.div`
  position: relative;
  padding: 1.875rem;

  img {
    display: block;
    margin: 0 auto;
    width: 100px;
  }

  p {
    font-size: 1rem;
    text-align: center;
    color: ${(props) => props.theme.black};

    label {
      font-weight: 700;
      color: ${(props) => props.theme['green-500']};
      cursor: pointer;
    }
  }

  span {
    display: block;
    text-align: center;
    font-size: 12px;
    color: ${(props) => props.theme['gray-500']};
  }

  input {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 1;
  }
`
