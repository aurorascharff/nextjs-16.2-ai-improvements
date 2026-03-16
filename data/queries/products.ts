import { delay, products, type Product } from "@/data/db";

export async function getProducts(category?: string): Promise<Product[]> {
  await delay(2000);
  if (category && category !== "all") {
    return products.filter((p) => p.category === category);
  }
  return products;
}
