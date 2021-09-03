import client from "part:@sanity/base/client"
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
      name: "studyCase",
      title: "Study Case",
      type: "reference",
      to: [{ type: "studyCase" }],
    },
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
        basePath: "journal.researchtothepeople.org/[case-name]/",
        source: async (doc) => {
          const studyCase = await client.getDocument(doc.studyCase._ref)
          return [studyCase.slug.current, doc.title].filter(Boolean).join("-")
        },
      },
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
    },
    prepare: ({ title, studyCaseName, studyCaseTopic }) => {
      return {
        title: `${title}`,
        subtitle: `${studyCaseName}, ${studyCaseTopic}`,
      }
    },
  },
}
