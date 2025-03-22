export default defineEventHandler(async () => {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const products = await res.json();
  return products;
});
