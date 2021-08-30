export default {
  name: "figure",
  title: "Figure",
  type: "object",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "caption",
      title: "caption",
      type: "text",
    },
  ],
  preview: {
    select: {
      subtitle: "caption",
      media: "image",
    },
  },
}
