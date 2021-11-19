import * as React from "react"
import { Box, Center, Flex, Spacer, Button } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

const WizardContext = React.createContext()

const ButtonPrev = (props) => {
  const { activePageIndex, goPrevPage } = React.useContext(WizardContext)
  return activePageIndex > 0 ? (
    <Button
      leftIcon={<ChevronLeftIcon />}
      colorScheme="teal"
      variant="outline"
      onClick={goPrevPage}
      {...props}
    >
      Back
    </Button>
  ) : null
}

const ButtonNext = (props) => {
  const { activePageIndex, goNextPage, steps } = React.useContext(WizardContext)

  return activePageIndex < steps - 1 ? (
    <Button
      rightIcon={<ChevronRightIcon />}
      colorScheme="teal"
      variant="outline"
      onClick={goNextPage}
      {...props}
    >
      Next
    </Button>
  ) : null
}

const Pages = ({ children }) => {
  const { activePageIndex } = React.useContext(WizardContext)
  const pages = React.Children.toArray(children)
  return <div>{pages[activePageIndex]}</div>
}

const Wizard = ({ children, steps }) => {
  const [activePageIndex, setActivePageIndex] = React.useState(0)

  const goNextPage = () => {
    setActivePageIndex((index) => index + 1)
  }

  const goPrevPage = () => {
    setActivePageIndex((index) => index - 1)
  }

  const context = {
    activePageIndex,
    goPrevPage,
    goNextPage,
    steps,
  }

  return (
    <WizardContext.Provider value={context}>
      {/* <Flex direction="column" minH="50vh" align="stretch">
        <Center flex={1}>{currentPage}</Center>
        <Flex mt={8}>
          <ButtonPrev />
          <Spacer />
          <ButtonNext />
        </Flex>
      </Flex> */}
      <div>{children}</div>
    </WizardContext.Provider>
  )
}

Wizard.Pages = Pages
Wizard.ButtonPrev = ButtonPrev
Wizard.ButtonNext = ButtonNext

export default Wizard
