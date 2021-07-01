import { RiNewspaperFill as icon } from "react-icons/ri"
import RepoUrl from "../componnets/repoUrl"

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
      name: "name",
      title: "Team Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      description:
        "A unique id that will be used for the URL. Click “Generate” to use the team name.",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "name",
        maxLength: 140,
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
            title: "Import from GitHub Readme and put it below",
          },
          { value: "manual", title: "Edit manually" },
        ],
        layout: "radio",
      },
    },
    {
      name: "description",
      title: "Description",
      type: "markdown",
    },
  ],
  preview: {
    select: {
      name: "name",
      projectTitle: "projectTitle",
      studyCaseName: "studyCase.name",
      studyCaseTopic: "studyCase.topic",
      author0: "authors.0.name",
      author1: "authors.1.name",
      author2: "authors.2.name",
    },
    prepare: ({
      name,
      projectTitle,
      studyCaseName,
      studyCaseTopic,
      author0,
      author1,
      author2,
    }) => {
      return {
        title: `${name} — ${projectTitle}`,
        subtitle: `${studyCaseName}, ${studyCaseTopic} — ${author0}, ${author1}, ${author2}, et al.`,
      }
    },
  },
}
