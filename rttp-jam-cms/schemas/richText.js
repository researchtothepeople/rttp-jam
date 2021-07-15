import { BinaryDocumentIcon, EqualIcon, ImageIcon } from "@sanity/icons"

export default {
  name: "richText",
  title: "Rich Text",
  type: "array",

  of: [
    { type: "figure", icon: ImageIcon, title: "Figure" },
    { type: "latex", icon: EqualIcon, title: "LaTeX Block" },
    {
      type: "block",
      of: [{ type: "latex", icon: EqualIcon, title: "Inline LaTeX" }],
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
    },
    {
      type: "file",
      title: "File",
      icon: BinaryDocumentIcon,
      // fields: [
      //   {
      //     name: "description",
      //     type: "string",
      //     title: "Description",
      //   },
      // ],
      // preview: {
      //   select: {
      //     title: "description",
      //     subtitle: "originalFilename",
      //     media: "image",
      //   },
      // },
    },
  ],
}
