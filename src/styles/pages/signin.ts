import styled from 'styled-components'

export const SignInContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`

export const ContentWrapper = styled.main`
  flex: 6;

  height: 100%;
  padding: 1.25rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  footer {
    span {
      font-size: 0.875rem;
      font-weight: 500;

      color: ${(props) => props.theme['gray-400']};
    }
  }
`

export const ContentContainer = styled.div`
  max-width: 484px;
  margin: 0 auto;

  .headingTexts {
    text-align: center;
  }

  h2 {
    font-size: 2.25rem;
    color: ${(props) => props.theme['gray-700']};
    font-weight: 500;
  }

  span {
    margin-top: 1.5rem;
    font-size: 1rem;
    color: ${(props) => props.theme['gray-400']};
    font-weight: 500;
  }

  form {
    margin-top: 2rem;

    display: grid;
    gap: 1.125rem;

    label {
      font-size: 1.05rem;
      color: ${(props) => props.theme.black};
    }
  }

  button {
    margin-top: 0.65rem;
  }

  .forgotPasswordLink {
    margin-top: 1rem;
    display: block;
    text-align: center;

    color: ${(props) => props.theme['gray-400']};

    font-size: 0.875rem;
    font-weight: 500;

    transition: color 0.1s;

    &:hover {
      color: ${(props) => props.theme['green-500']};
    }
  }
`

export const InputGroup = styled.div`
  display: grid;
  gap: 0.625rem;

  label {
    color: ${(props) => props.theme.black};
    font-size: 1.25rem;
  }
`

export const LogoWrapper = styled.aside`
  flex: 5;

  background: linear-gradient(
    106.87deg,
    #11ef76 31.82%,
    rgba(17, 239, 118, 0.31) 80.83%
  );
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`
