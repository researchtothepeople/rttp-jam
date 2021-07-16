import { RiStickyNoteFill as icon } from "react-icons/ri"
import { EqualIcon as MathIcon } from "@sanity/icons"
import SlugInput from "../components/Slug"

export default {
  name: "note",
  title: "Notes",
  type: "document",
  icon,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL",
      type: "slug",
      inputComponent: SlugInput,
      validation: (Rule) => Rule.required(),
      options: {
        basePath: "https://cases.researchtothepeople.org/notes",
        source: "title",
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
      type: "richText",
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
