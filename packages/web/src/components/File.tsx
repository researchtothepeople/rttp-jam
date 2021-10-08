import React, { ReactElement, ReactNode } from "react"
import styled from "styled-components"
import {
  RiBookMarkFill,
  RiFile3Fill,
  RiFileChart2Fill,
  RiFileCodeFill,
  RiFileTextFill,
  RiFileZipFill,
  RiImageFill,
  RiVideoFill,
} from "react-icons/ri"

interface Props {
  href: string
  children: ReactNode
}

function File({ href, children }: Props): ReactNode {
  const ext =
    typeof children === "string" &&
    children.substr(children.lastIndexOf(".") + 1).toLowerCase()
  return (
    <p>
      <A href={href}>
        {["ppt", "pptx"].includes(ext) ? (
          <RiFileChart2Fill />
        ) : ["doc", "docx", "txt", "pages", "rtf", "md"].includes(ext) ? (
          <RiFileTextFill />
        ) : ["zip", "gz"].includes(ext) ? (
          <RiFileZipFill />
        ) : [
            "jpg",
            "jpeg",
            "png",
            "webp",
            "heif",
            "hdr",
            "exif",
            "gif",
          ].includes(ext) ? (
          <RiImageFill />
        ) : ["mov", "mp4", "m4v", "webm", "hevc"].includes(ext) ? (
          <RiVideoFill />
        ) : [
            "csv",
            "tsv",
            "py",
            "r",
            "json",
            "js",
            "jsx",
            "cjs",
            "ts",
            "tsx",
            "go",
            "h",
            "m",
            "cpp",
            "java",
          ].includes(ext) ? (
          <RiFileCodeFill />
        ) : ["ipynb"].includes(ext) ? (
          <RiBookMarkFill />
        ) : (
          <RiFile3Fill />
        )}
        <div>{children}</div>
      </A>
    </p>
  )
}

export default File

const A = styled.a`
  display: flex;
  padding: 0.875em 1em;
  background: var(--BG1);
  svg {
    height: 1.4em;
    flex: 0 0 auto;
    margin-right: 1em;
    vertical-align: middle;
    color: var(--FG2);
  }
`
