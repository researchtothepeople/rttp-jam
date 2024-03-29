export default {
  name: "author",
  title: "Author",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "role",
      title: "Role",
      type: "string",
    },
    {
      name: "affiliation",
      title: "Affiliation / Organization",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "orcid",
      title: "ORCID Link",
      type: "url",
    },
  ],
  preview: {
    select: {
      name: "name",
      role: "role",
      affiliation: "affiliation",
      email: "email",
    },
    prepare: ({ name, role, affiliation, email }) => {
      const subtitle = [role, affiliation, email].filter((i) => i).join(" — ")
      return {
        title: name,
        subtitle,
      }
    },
  },
}
