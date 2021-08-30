export default {
  name: "sponsor",
  title: "Sponsor",
  type: "object",
  fields: [
    {
      name: "logo",
      title: "logo",
      description: "Transparent-background PNG preferred.",
      type: "image",
    },
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    // {
    //   name: "note",
    //   title: "Note",
    //   type: "string",
    // },
  ],
}
