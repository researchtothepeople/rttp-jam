import { RiSettings3Fill as icon } from "react-icons/ri"

export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
  icon,
  fields: [
    {
      name: "title",
      title: "Site Title",
      type: "string",
    },
    {
      name: "description",
      title: "Site Description",
      type: "text",
    },
  ],
}
