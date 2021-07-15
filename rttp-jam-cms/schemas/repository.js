import { RiNewspaperFill as icon } from "react-icons/ri"
import RepoUrl from "../components/repoUrl"
import SlugInput from "../components/Slug"

export default {
  name: "repository",
  title: "Repositories",
  type: "document",
  icon,
  fields: [
    {
      name: "repositoryUrl",
      title: "Repository URL",
      description: "Repo URL on GitHub, must be public.",
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
      description: "Click “Generate” to use the repository name.",
      type: "slug",
      inputComponent: SlugInput,
      validation: (Rule) => Rule.required(),
      options: {
        basePath: "https://cases.researchtothepeople.org/results",
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
      name: "studyCase",
      title: "Study Case",
      type: "reference",
      to: [{ type: "studyCase" }],
    },
    {
      name: "projectTitle",
      title: "Project Title",
      type: "text",
      validation: (Rule) => Rule.required(),
      rows: 3,
    },
    {
      name: "authors",
      title: "Authors",
      type: "array",
      of: [{ type: "author" }],
    },
    {
      name: "teamAffiliation",
      title: "Team Affiliation/Organization",
      type: "string",
    },
    {
      name: "descriptionSource",
      title: "Description Source",
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
      author0: "authors.0.name",
      author1: "authors.1.name",
      author2: "authors.2.name",
    },
    prepare: ({
      slug,
      projectTitle,
      studyCaseName,
      studyCaseTopic,
      author0,
      author1,
      author2,
    }) => {
      return {
        title: `${slug} — ${projectTitle}`,
        subtitle: `${studyCaseName} — ${author0}, ${author1}, ${author2}, et al.`,
      }
    },
  },
}
