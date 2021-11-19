import { useToggleState } from "react-stately"
import { useToggleButton } from "react-aria"
import * as React from "react"
import { useRef } from "react"
import { css } from "styled-components"
import { Tag } from "@chakra-ui/react"
import { motion } from "framer-motion"

export default function ToggleButton(props) {
  let ref = useRef()
  let state = useToggleState(props)
  let { buttonProps, isPressed } = useToggleButton(props, state, ref)

  return (
    <Tag
      variant={state.isSelected ? "solid" : "subtle"}
      colorScheme="blue"
      {...buttonProps}
      ref={ref}
      cursor="pointer"
      {...props}
    >
      {props.children}
    </Tag>
  )
}
