import styled from 'styled-components'

export const CreatePublicationContainer = styled.main`
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
  max-width: 960px;
  margin: 3.125rem auto;

  display: grid;
  gap: 1.875rem;
` 
export const ButtonsWrapper = styled.div`
  margin-left: auto;

  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const InputGroup = styled.div`
  display: grid;
  gap: 0.75rem;

  label {
    font-size: 1.25rem;
    color: ${(props) => props.theme.black};

    span {
      color: ${(props) => props.theme['green-500']};
    }
  }
`

export const StatusContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  
  label {
    font-size: 1.25rem;
    color: ${(props) => props.theme.black};
  }
`

interface SelectProps {
  isError?: boolean;
}

export const Select = styled.select<SelectProps>`
  max-width: 150px;
  height: 40px;
  padding: 0 1rem;
  border-radius: 8px;
  border-color: ${(props) => props.isError ? props.theme.red : props.theme['gray-400']};
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme['green-500']};
  }
`
