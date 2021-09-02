/**
 * @see https://github.com/hdoro/sanity-plugin-better-slug
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 */

import React from "react"
import speakingurl from "speakingurl"
import {
  TextInput,
  Text,
  Button,
  Flex,
  Box,
  Card,
  Stack,
  ThemeProvider,
  studioTheme,
} from "@sanity/ui"
import * as PathUtils from "@sanity/util/paths"
import { ChangeIndicatorCompareValueProvider } from "@sanity/base/lib/change-indicators/ChangeIndicator"
import { withDocument, withValuePath } from "part:@sanity/form-builder"
import PatchEvent, { set, unset } from "@sanity/form-builder/PatchEvent"
import { FormField } from "@sanity/base/components"

const createPatchFrom = (value) =>
  PatchEvent.from(value === "" ? unset() : set(value))

function getNewFromSource(source, valuePath, document) {
  const parentPath = valuePath.slice(0, -1)
  const parent = PathUtils.get(document, parentPath)
  return Promise.resolve(
    typeof source === "function"
      ? source(document, { parentPath, parent })
      : PathUtils.get(document, source)
  )
}

/**
 * Custom slug component for better UX & safer slugs:
 * - shows the final URL for the relative address (adds the BASE.PATH/ at the start)
 * - removes special characters and startin/trailing slashes
 */
class SlugInput extends React.Component {
  inputRef

  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
    this.state = {
      basePath: undefined,
    }
  }

  focus = () => {
    if (this.inputRef && this.inputRef.current) {
      this.inputRef.current.focus()
    }
  }

  updateValue = (strValue) => {
    const patchValue = {
      _type: this.props.type?.name || "slug",
      current: strValue,
    }
    this.props.onChange(createPatchFrom(patchValue))
  }

  /**
   * Avoids trailing slashes, double slashes, spaces, special characters and uppercase letters
   */
  formatSlug = (input) => {
    const customValue = typeof input === "string" ? input : undefined
    let finalSlug = customValue || this.props.value?.current || ""
    // Option that can be passed to this input component to format values on input
    const customSlugify = this.props.type.options?.slugify
    if (customSlugify) {
      finalSlug = customSlugify(finalSlug || "")
    } else {
      // Removing special characters, spaces, uppercase letters, etc.
      finalSlug = finalSlug
        // As we want to allow slashes between segments (segment-1/segment-2)
        // We're splitting the string to preserve these slashes
        .split("/")
        // If a segment is empty, this means a starting or trailing slash, or double slashes, which we want to get rid of
        .filter((segment) => !!segment)
        .map((segment) => speakingurl(segment, { symbols: true }))
        .join("/")
    }

    // Finally, save this final slug to the document
    this.updateValue(finalSlug)
  }

  componentDidMount() {
    const { type, document } = this.props
    const options = type.options

    const getBasePath = async () => {
      if (typeof options?.basePath === "string") {
        return options.basePath
      }
      if (typeof options?.basePath === "function") {
        try {
          const value = await Promise.resolve(options.basePath(document))
          return value
        } catch (error) {
          console.error(error)
          return undefined
        }
      }
      return undefined
    }

    getBasePath().then((basePath) => {
      if (basePath) {
        this.setState({ basePath })
      }
    })
  }

  generateSlug = async () => {
    const { document, type } = this.props
    const newSlug = await getNewFromSource(
      type.options?.source,
      this.props.getValuePath(),
      document
    )
    this.formatSlug(newSlug)
  }

  render() {
    const { value, type, compareValue } = this.props

    return (
      <ThemeProvider theme={studioTheme}>
        <ChangeIndicatorCompareValueProvider
          value={value?.current}
          compareValue={compareValue?.current}
        >
          <FormField
            title={type.title || type.name}
            description={type.description}
            level={this.props.level}
            // Necessary for validation warnings to show up contextually
            markers={this.props.markers}
            // Necessary for presence indication
            presence={this.props.presence}
          >
            <Stack space={3}>
              <Flex>
                {this.state.basePath && (
                  <Card
                    border={true}
                    paddingX={3}
                    style={{
                      whiteSpace: "nowrap",
                      alignItems: "center",
                      background: "#f2f2f2",
                      borderRight: 0,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    display="flex"
                  >
                    <Text muted>{this.state.basePath}</Text>
                  </Card>
                )}
                <Box
                  flex={2}
                  style={{
                    borderTopRightRadius: 12,
                    borderBottomRightRadius: 12,
                  }}
                >
                  <TextInput
                    onChange={(event) => this.updateValue(event.target.value)}
                    onBlur={this.formatSlug}
                    value={value?.current || ""}
                    readOnly={this.props.readOnly}
                    radius={0}
                  />
                </Box>
                {type.options?.source && (
                  <Box marginLeft={1}>
                    <Button
                      mode="ghost"
                      type="button"
                      disabled={this.props.readOnly}
                      onClick={this.generateSlug}
                      text={"Generate"}
                    />
                  </Box>
                )}
              </Flex>
            </Stack>
          </FormField>
        </ChangeIndicatorCompareValueProvider>
      </ThemeProvider>
    )
  }
}

export default withValuePath(withDocument(SlugInput))
