import { createGlobalStyle, css } from "styled-components"

const GlobalStyle = createGlobalStyle`
/* https://piccalil.li/blog/a-modern-css-reset/ */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin */
body {
  margin: 0;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 1em;
  margin-bottom: 1rem;
}

p,
figure,
blockquote,
dl,
dd {
  margin-top: 0;
  margin-bottom: 1rem;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  line-height: 1.5;
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
`

export default GlobalStyle
