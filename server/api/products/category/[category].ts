export default defineEventHandler(async (event) => {
  const { category } = event.context.params;
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: "Category not found",
    });
  }

  const products = await res.json();
  return products;
});
