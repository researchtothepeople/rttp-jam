import { RiContactsBook2Fill as icon } from "react-icons/ri"

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
      name: "topic",
      title: "Topic / Diagnosis",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      description:
        "A unique id that will be used for the URL. You might want to abbreviate some words to keep it short, like “Neurofibromatosis Type 2” to “nf2”.",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: (doc) => `${doc.name}-${doc.topic}`,
      },
    },
    {
      name: "photo",
      title: "Photo",
      description: "Profile photo of the person, if available.",
      type: "image",
    },
    {
      name: "time",
      title: "Time Span",
      type: "string",
      description: "Visible to users. E.g., Fall 2020",
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
      name: "caseData",
      title: "Case Data Description",
      type: "string",
    },
    {
      name: "caseDataUrl",
      title: "Case Data URL",
      type: "url",
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
