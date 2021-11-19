import { createGlobalStyle, css } from "styled-components"
import "@fontsource/archivo/variable-full.css"

const Global = css`
  :root {
    --BG0: #ffffffff;
    --BG1: #f5f5f5ff;
    --BG2: #e3e3e3ff;

    --FG0: #000000;
    --FG1: #333333;
    --FG2: #808080;
    --FG3: #a0a0a0;

    --accent: #210aea;
    --accent2: #ed1766;
    --accent3: #c8ff47;
  }

  /* https://piccalil.li/blog/a-modern-css-reset/ */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body:focus-within {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    min-height: 100vh;
    line-height: 1.4;
    font-family: ArchivoVariable, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    font-size: 16px;
    letter-spacing: 0.01em;
    color: var(--FG1);
    background: var(--BG0);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1em;
    margin-bottom: 1rem;
    letter-spacing: 0;
  }

  p,
  figure,
  blockquote,
  dl,
  dd {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  /* Make images easier to work with */
  img,
  picture {
    max-width: 100%;
    display: block;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  a {
    color: var(--accent);
    text-decoration: none;

    /* nav &[aria-current] {
      box-shadow: currentColor 0 2px;
    } */
  }

  figure {
    margin: 1rem 0;
  }

  figcaption {
    font-size: 0.875rem;
    color: var(--FG2);
  }

  ul,
  ol {
    padding-left: 1.25em;
  }
`

const GlobalStyle = createGlobalStyle`
${Global}
`

export default GlobalStyle
