/**
 * @see https://github.com/Pondorasti/remark-img-links
 */

import { visit } from "unist-util-visit"

export default function attacher(options) {
  function visitor(node) {
    node.url = new URL(node.url.replace(/^\//, ""), options.absolutePath).href
    console.log(node.url)
  }

  function transform(tree) {
    if (options && options.absolutePath) {
      visit(tree, "image", visitor)
    } else {
      throw Error("Missing required `absolutePath` option.")
    }
  }

  return transform
}
