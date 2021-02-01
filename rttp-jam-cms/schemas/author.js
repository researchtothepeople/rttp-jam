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
      title: "Affiliation/Organization",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "photo",
      title: "Photo",
      type: "image",
    },
  ],
  preview: {
    select: {
      name: "name",
      role: "role",
      affiliation: "affiliation",
      email: "email",
      media: "photo",
    },
    prepare: ({ name, role, affiliation, email, media }) => {
      const subtitle = [role, affiliation, email].filter((i) => i).join(" — ")
      return {
        title: name,
        subtitle,
        media,
      }
    },
  },
}
