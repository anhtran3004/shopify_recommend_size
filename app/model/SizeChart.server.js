import db from "../db.server";
export async function getSizes(name, graphql) {
  const sizes = await db.sizeChart.findMany({
    where: { name },
    orderBy: { id: "desc" },
  });

  if (sizes.length === 0) return [];

  return Promise.all(
    sizes.map((size) => supplementSize(size, graphql))
  );
}
async function supplementSize(size, graphql) {

  const response = await graphql(
    `
      query supplementSize($id: ID!) {
        size(id: $id) {
          name
          condition
          status
        }
      }
    `,
    {
      variables: {
        id: size.id,
      },
    }
  );

  const {
    data: { sizes },
  } = await response.json();

  return {
    ...size,
    name: sizes.name,
    condition: sizes.condition,
    status: sizes.status
  };
}
  