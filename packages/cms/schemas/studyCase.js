import { RiContactsBook2Fill as icon } from "react-icons/ri"
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
        basePath: "cases.researchtothepeople.org/",
        source: "name",
      },
    },
    {
      name: "topic",
      title: "Topic / Diagnosis",
      type: "string",
    },
    {
      name: "type",
      title: "Case Type",
      type: "string",
      options: {
        list: [
          {
            value: "person",
            title: "Single Patient",
          },
          { value: "cohort", title: "Cohort" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "person",
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
      name: "bio",
      title: "Biography",
      type: "richText",
    },
    {
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(280),
    },
    {
      name: "caseDataTypes",
      title: "Case Data Types",
      type: "tags",
      options: {
        closeMenuOnSelect: false,
      },
    },
    // {
    //   title: "Case Data Types",
    //   name: "caseDataTypes",
    //   type: "array",
    //   of: [
    //     {
    //       type: "string",
    //     },
    //   ],
    //   options: {
    //     layout: "tags",
    //   },
    //   validation: (Rule) => Rule.unique(),
    // },
    {
      name: "sponsors",
      title: "Sponsors",
      type: "array",
      of: [{ type: "sponsor" }],
      options: {
        layout: "grid",
        editModal: "popover",
      },
    },
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
