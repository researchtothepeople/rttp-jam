import sanityClient from "part:@sanity/base/client"
import { RiNewspaperFill as icon } from "react-icons/ri"
import RepoUrl from "../components/RepoUrl"
import SlugInput from "../components/Slug"

export default {
  name: "repository",
  title: "Results",
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
      name: "repositoryUrl",
      title: "GitHub Repository Link",
      type: "url",
      inputComponent: RepoUrl,
      validation: (Rule) =>
        Rule.uri({
          scheme: ["https", "http"],
        }),
    },
    {
      name: "slug",
      title: "URL",
      description: "Click “Generate” to use the repository name if it exists.",
      type: "slug",
      inputComponent: SlugInput,
      validation: (Rule) => Rule.required(),
      options: {
        basePath: "cases.researchtothepeople.org/[case-name]/",
        //   (doc) => {
        //   const query = `*[_type == "studyCase" && _id == $id]{slug{current}}`
        //   const params = { id: doc.studyCase._ref }
        //   return sanityClient.fetch(query, params).then((res) => {
        //     console.log(res)
        //     return
        //   })
        // },
        source: (doc) => new URL(doc.repositoryUrl).pathname.split("/")[2],
        slugify: (input) => input.replace(/\s+/g, "-"),
      },
    },
    // {
    //   name: "doi",
    //   title: "DOI Number",
    //   description: "https://doi.org/10.1109/",
    //   type: "slug",
    //   options: {
    //     source: "teamName",
    //     maxLength: 200,
    //     slugify: () => {
    //       return "5.771073"
    //     },
    //   },
    // },
    {
      name: "projectTitle",
      title: "Project Title",
      type: "text",
      rows: 3,
    },
    {
      name: "authors",
      title: "Authors",
      type: "array",
      of: [{ type: "author" }],
      options: {
        editModal: "popover",
      },
    },
    {
      name: "teamAffiliation",
      title: "Team Affiliation / Organization",
      type: "string",
    },
    {
      name: "descriptionSource",
      title: "Content Source",
      type: "string",
      options: {
        list: [
          {
            value: "readme",
            title: "Use GitHub Readme",
          },
          { value: "manual", title: "Edit manually below" },
        ],
        layout: "radio",
      },
      initialValue: "manual",
    },
    // {
    //   name: "description",
    //   title: "Description",
    //   type: "markdown",
    // },
    {
      name: "body",
      title: "Body",
      type: "richText",
    },
  ],
  preview: {
    select: {
      slug: "slug.current",
      projectTitle: "projectTitle",
      studyCaseName: "studyCase.name",
      studyCaseTopic: "studyCase.topic",
    },
    prepare: ({ slug, projectTitle, studyCaseName, studyCaseTopic }) => {
      return {
        title: [slug, projectTitle].filter(Boolean).join(" — "),
        subtitle: [studyCaseName, studyCaseTopic].filter(Boolean).join(", "),
      }
    },
  },
}
