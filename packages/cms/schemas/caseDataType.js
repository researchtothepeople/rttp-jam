export default {
  name: "caseDataType",
  title: "Case Data Type",
  type: "document",
  fields: [
    {
      name: "abbr",
      title: "Common Name / Abbreviated Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "name",
      title: "Definitive Full Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Identifier",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "name",
      },
    },
    {
      name: "altNames",
      title: "Alternative Names",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
  ],
  preview: {
    select: {
      name: "name",
      abbr: "abbr",
    },
    prepare: ({ name, abbr }) => {
      return {
        title: abbr || name,
        subtitle: name || null,
      }
    },
  },
}
