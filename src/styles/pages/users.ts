import styled from 'styled-components'

export const UsersContainer = styled.main`
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

export const Heading = styled.div`
  margin-top: 3.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: 1.125rem;
    font-weight: 400;
    color: ${(props) => props.theme['gray-500']};

    strong {
      color: ${(props) => props.theme['green-500']};
    }
  }

  .addUserButton {
    padding: 1rem 1.25rem;
    border: 1px solid ${(props) => props.theme['gray-400']};
    border-radius: 8px;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    color: ${(props) => props.theme['gray-500']};

    transition: all 0.1s;

    &:hover {
      border-color: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme['green-500']};
    }
  }
`
export const TableContainer = styled.table`
  margin-top: 3rem;

  width: 100%;
  border-collapse: collapse;

  th {
    padding: 1rem;
    text-align: left;
    background-color: ${(props) => props.theme['gray-300']};
    color: ${(props) => props.theme.black};

    &:first-child {
      border-top-left-radius: 8px;
    }

    &:last-child {
      border-top-right-radius: 8px;
    }
  }

  td {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid ${(props) => props.theme['gray-300']};

    &:first-child {
      border-left: 1px solid ${(props) => props.theme['gray-300']};
    }

    &:last-child {
      border-right: 1px solid ${(props) => props.theme['gray-300']};
    }

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }

    color: ${(props) => props.theme['gray-500']};

    .buttonPencil {
      svg {
        color: ${(props) => props.theme['gray-500']};
        transition: color 0.1s;

        &:hover {
          color: ${(props) => props.theme['green-500']};
        }
      }
    }

    .buttonTrash {
      svg {
        color: ${(props) => props.theme['gray-500']};
        transition: color 0.1s;

        &:hover {
          color: ${(props) => props.theme.red};
        }
      }
    }
  }
`
