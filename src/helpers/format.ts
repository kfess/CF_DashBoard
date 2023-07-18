export const pluralize = (
  count: number,
  singular: string,
  plural: string | null = null
) => {
  if (!Number.isInteger(count)) {
    throw new Error("count must be an integer");
  }
  if (plural === null) {
    plural = singular + "s";
  }
  return count <= 1 ? singular : plural;
};
