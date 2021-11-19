import * as React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import Layout from "../components/Layout"
import ToggleButton from "../components/ToggleButton"
import {
  ChakraProvider,
  extendTheme,
  Flex,
  Spacer,
  Grid,
  Wrap,
  WrapItem,
  Heading,
  Container,
  Center,
  Text,
  Tag,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Checkbox,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react"
import Wizard from "../components/Wizard"

const Catalog = ({ data }) => {
  const sampleTypes = data.allAirtable.nodes.map((item) => ({
    name: item.data.Name,
    recordId: item.recordId,
    selected: false,
    amount: 0,
    more: false,
    featured: item.data.Featured,
    dataTypes: item.data.Available_Data_Types?.map((item) => ({
      name: item.data.Name,
      recordId: item.recordId,
    })),
  }))

  const [state, setState] = React.useState(sampleTypes)

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Center minH="100vh" p={12}>
          <Container maxW="container.md">
            <Wizard steps={3}>
              <Wizard.Pages>
                <article>
                  <Heading mb={8}>What kind of sample do you have?</Heading>
                  <Wrap mb={2}>
                    {state
                      .filter((item) => item.featured === true)
                      .map((item, i, arr) => (
                        <WrapItem key={item.recordId}>
                          <ToggleButton
                            isSelected={item.selected}
                            onPress={() =>
                              setState((prevState) => {
                                const newState = [...prevState]
                                item.selected = !item.selected
                                return newState
                              })
                            }
                            size="lg"
                          >
                            {item.name}
                          </ToggleButton>
                        </WrapItem>
                      ))}
                  </Wrap>
                  <Wrap>
                    {state
                      .filter((item) => item.featured !== true)
                      .map((item, i, arr) => (
                        <WrapItem key={item.recordId}>
                          <ToggleButton
                            isSelected={item.selected}
                            onPress={() =>
                              setState((prevState) => {
                                const newState = [...prevState]
                                item.selected = !item.selected
                                return newState
                              })
                            }
                          >
                            {item.name}
                          </ToggleButton>
                        </WrapItem>
                      ))}
                  </Wrap>
                </article>
                <article>
                  {state?.filter((item) => item.selected).length ? (
                    <Heading mb={8}>How much of these do you have?</Heading>
                  ) : (
                    <Text>
                      Start by selecting the types of sample you might have.
                    </Text>
                  )}
                  {state
                    ?.filter((item) => item.selected)
                    ?.map((item, i) => (
                      <Row key={item.recordId}>
                        <Heading as="h2" mt={4}>
                          {item.name}
                        </Heading>
                        <div>
                          <FormControl id="amount">
                            <Grid
                              templateColumns="1fr minmax(2rem, auto)"
                              mt={4}
                              align="center"
                              gap={4}
                            >
                              <Slider
                                value={item.amount}
                                onChange={(value) =>
                                  setState((prevState) => {
                                    const newState = [...prevState]
                                    item.amount = value
                                    return newState
                                  })
                                }
                              >
                                <SliderTrack>
                                  <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                              </Slider>
                              <FormHelperText m={0} textAlign="right">
                                {item.amount} mm<sup>2</sup>
                              </FormHelperText>
                            </Grid>
                          </FormControl>
                          <FormControl id="more">
                            {/* <Checkbox color="gray.600">
                              Can provide more later
                            </Checkbox> */}
                          </FormControl>
                        </div>
                      </Row>
                    ))}
                </article>
                <article>
                  <Heading>Potential Data Generation</Heading>
                  {state
                    ?.filter((item, i) => item.selected)
                    ?.filter((item, i) => item.amount > 0)
                    ?.map((item, i) => (
                      <Row key={item.recordId}>
                        <div>
                          <Heading as="h2" mt={4}>
                            {item.name}
                          </Heading>
                          <Text color="gray.500">
                            {item.amount} mm<sup>2</sup>
                          </Text>
                        </div>
                        <Wrap mt={4}>
                          {item?.dataTypes?.map((item, i) => {
                            return (
                              <WrapItem>
                                <Tag>{item.name}</Tag>
                              </WrapItem>
                            )
                          })}
                        </Wrap>
                      </Row>
                    ))}
                </article>
                {/* <pre>{JSON.stringify(sampleTypes, null, 2)}</pre> */}
              </Wizard.Pages>
              <Flex mt={8} bt={1}>
                <Wizard.ButtonPrev />
                <Spacer />
                <Wizard.ButtonNext
                  visibility={
                    state?.filter((item) => item.selected).length
                      ? "visible"
                      : "hidden"
                  }
                />
              </Flex>
            </Wizard>
          </Container>
        </Center>
      </Layout>
    </ChakraProvider>
  )
}

export default Catalog
export const query = graphql`
  {
    allAirtable(
      filter: { table: { eq: "Sample Type" } }
      sort: { order: ASC, fields: rowIndex }
    ) {
      nodes {
        data {
          Name
          Available_Data_Types {
            data {
              Name
            }
            recordId
          }
          Featured
        }
        recordId
      }
    }
  }
`

const theme = extendTheme({
  fonts: {
    body: `ArchivoVariable, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif`,
    heading: `ArchivoVariable, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif`,
  },
})

const Row = styled.div`
  margin: 1rem 0 2rem;
  border-top: 1px solid var(--BG1);
  h2 {
    font-size: 1rem;
    font-weight: 700;
  }
  display: grid;
  grid-template-columns: 1fr 2fr;
`
