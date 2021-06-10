import { RiStickyNoteFill } from "react-icons/ri"

export default {
  name: "note",
  title: "Notes",
  type: "document",
  icon: RiStickyNoteFill,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      description:
        "A unique id for the URL. Click “Generate” to use the title.",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 140,
      },
    },
    {
      name: "studyCase",
      title: "Study Case",
      type: "reference",
      to: [{ type: "studyCase" }],
    },
    {
      name: "authors",
      title: "Authors",
      type: "array",
      of: [{ type: "author" }],
    },
    {
      title: "Published Date",
      name: "date",
      type: "date",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString().substring(0, 10),
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      studyCaseName: "studyCase.name",
      studyCaseTopic: "studyCase.topic",
      author0: "authors.0.name",
    },
    prepare: ({ title, studyCaseName, studyCaseTopic, author0 }) => {
      return {
        title: `${author0} — ${title}`,
        subtitle: `${studyCaseName}, ${studyCaseTopic}`,
      }
    },
  },
}
