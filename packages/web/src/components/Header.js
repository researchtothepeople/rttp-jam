import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"


export default function Header() {
  return <SHeader>
    <HomeNav>
        <HomeLink href="https://www.researchtothepeople.org/">
          <StaticImage
            src="../images/icon.png"
            alt=""
            width={80}
            placeholder="none" />
          Research to the People
        </HomeLink>
        <Spacer />
        <NavLinks>
          <a href="https://www.researchtothepeople.org/cases">Cases</a>
          <Link to="/">Results</Link>
          <a href="https://www.researchtothepeople.org/team">Team</a>
          <a href="https://www.researchtothepeople.org/donate">Donate</a>
        </NavLinks>
      </HomeNav>
  </SHeader>
}


const SHeader = styled.header`
  max-width: 1020px;
  padding: 0 20px;
  margin: auto;
`

const HomeNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1em;
  color: black;
  a {
    color: inherit;
  }
`

const HomeLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.875em;
  font-size: 2.125rem;
  color: black;
  font-weight: 700;
  text-transform: uppercase;
  font-variation-settings: "wdth" 75;
  min-height: 128px;
`

const NavLinks = styled.div`
  font-size: 0.875rem;
  text-transform: uppercase;
  color: var(--accent2);
  display: flex;
  font-weight: 300;
  > * {
    padding: 2em;
  }
`

const Spacer = styled.div`
  flex: 1 1 auto;
`