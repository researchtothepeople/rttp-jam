import { EqualIcon, ImageIcon } from "@sanity/icons"

export default {
  name: "richText",
  title: "Rich Text",
  type: "array",
  of: [
    // { type: "image", icon: ImageIcon, title: "Image" },
    { type: "figure", icon: ImageIcon, title: "Figure" },
    {
      type: "block",
      of: [{ type: "latex", icon: EqualIcon, title: "Inline math" }],
    },
    { type: "latex", icon: EqualIcon, title: "Math block" },
  ],
}
