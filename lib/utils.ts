import { DocumentNode } from "graphql"

export const asQueryString = (q: DocumentNode | string) => {
  if (typeof q === "string") return q
  if (!q.loc) throw new Error("Query has no source")
  return q.loc.source.body
}
