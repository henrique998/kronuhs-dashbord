import styled from 'styled-components'

export const AddUserContainer = styled.main`
  padding: 2rem;
  height: calc(100vh - 4rem);
  overflow-y: auto;

  h1 {
    text-align: center;
    color: ${(props) => props.theme['gray-500']};

    font-weight: 500;
    font-size: 2rem;

    span {
      color: ${(props) => props.theme['green-500']};
    }
  }
`

export const FormContainer = styled.form`
  max-width: 720px;
  margin: 3.125rem auto;

  display: grid;
  gap: 1.875rem;
`
export const InputGroup = styled.div`
  display: grid;
  gap: 0.75rem;

  label {
    font-size: 1.25rem;
    color: ${(props) => props.theme.black};
  }

  select {
    max-width: 150px;
    height: 40px;
    padding: 0 1rem;
    border-radius: 8px;
    border-color: ${(props) => props.theme['gray-400']};
    outline: none;

    &:focus {
      border-color: ${(props) => props.theme['green-500']};
    }
  }
`
