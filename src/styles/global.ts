import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${(props) => props.theme.white};
        -webkit-font-smoothing: antialiased;
        overflow: hidden;
    }

    body, input, textarea, button {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

    button {
        cursor: pointer;
        background: transparent;
        border: 0;
    }

    .modal-overlay {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
    }

    .modal-content {
        position:  relative;

        max-width: 35.75rem;
        width: 100%;
        margin: 0 auto;

        background-color: ${(props) => props.theme.white};
        padding: 4.5rem;
        border-radius: 1rem;
    }
`
