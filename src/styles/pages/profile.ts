import styled from "styled-components";

export const ProfileContainer = styled.main`
  padding: 2rem;
  height: calc(100vh - 4rem);
  overflow-y: auto;
`

export const Heading = styled.div`
    text-align: center;

    color: ${props => props.theme.black};

    h1 {
        font-size: 2rem;
        font-weight: 500;
    }

    span {
        font-size: 1.25rem;
    }
`

export const AvatarFormContainer = styled.form`
    max-width: 568px;
    margin: 2.625rem auto 0;

    display: grid;
    justify-content: center;
    gap: 1rem;

    .userAvatar {
        width: 9.375rem;
        height: 9.375rem;
        border-radius: 50%;
        object-fit: cover;
    }

    > label {
        height: 2.5rem;
        border-radius: 8px;
        padding: 0 1rem;
        background: rgba(158, 255, 202, 0.24);
        color: ${(props) => props.theme["green-500"]};

        font-weight: 500;
        font-size: 0.875rem;

        line-height: 40px;

        transition: filter 0.1s;
        cursor: pointer;
    }
`

export const DataFormContainer = styled.form`
    max-width: 48rem;
    margin: 4rem auto;

    display: grid;
    gap: 1.875rem;
`

export const InputGroup = styled.div`
  display: grid;
  gap: 0.75rem;

  label {
    font-size: 1.25rem;
    color: ${(props) => props.theme.black};

    span {
        color: ${(props) => props.theme["green-500"]};
    }
  }
`