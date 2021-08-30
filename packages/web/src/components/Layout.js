import React from "react"
import { Helmet } from "react-helmet"

import GlobalStyle from "./GlobalStyle"
// import { AnimateSharedLayout } from "framer-motion"

const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" /> */}
      </Helmet>
      <GlobalStyle />
      {children}
    </>
  )
}

export default Layout
