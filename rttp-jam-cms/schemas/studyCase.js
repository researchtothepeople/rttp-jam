import { RiContactsBook2Fill as icon } from "react-icons/ri"
import { EqualIcon as MathIcon } from "@sanity/icons"
import SlugInput from "../components/Slug"

export default {
  name: "studyCase",
  title: "Study Cases",
  type: "document",
  icon,
  fields: [
    {
      name: "name",
      title: "Case Name",
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
        basePath: "https://cases.researchtothepeople.org/cases",
        source: "name",
      },
    },
    {
      name: "topic",
      title: "Topic / Diagnosis",
      type: "string",
    },
    {
      name: "photo",
      title: "Photo",
      description: "Profile photo or organization logo.",
      type: "image",
    },
    {
      name: "time",
      title: "Time Span",
      type: "string",
      description: "Visible to visitors. E.g., Fall 2020",
    },
    {
      name: "launchDate",
      title: "Launch Date",
      type: "date",
      description: "For sorting.",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString().substring(0, 10),
    },
    {
      name: "originalCaseUrl",
      title: "Original Case URL",
      type: "url",
    },
    {
      name: "caseDataUrl",
      title: "Case Data URL",
      type: "url",
    },
    {
      name: "caseData",
      title: "Case Data Description",
      type: "string",
    },
    {
      name: "bio",
      title: "Biography",
      type: "richText",
    },
    // {
    //   name: "repositories",
    //   title: "Teams/Repositories Order",
    //   type: "array",
    //   weak: true,
    //   of: [
    //     {
    //       type: "reference",
    //       to: [
    //         {
    //           type: "repository",
    //         },
    //       ],
    //       options: {
    //         filter: ({ document }) => {
    //           console.log(document._id.split("."))
    //           return {
    //             filter: "studyCase._ref == $studyCaseRef",
    //             params: {
    //               studyCaseRef: document._id.split(".").pop(),
    //             },
    //           }
    //         },
    //       },
    //     },
    //   ],
    // },
  ],
  orderings: [
    {
      title: "Launch Date",
      name: "launchDateDesc",
      by: [{ field: "launchDate", direction: "desc" }],
    },
    {
      title: "A–Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "topic",
      media: "photo",
    },
  },
}
