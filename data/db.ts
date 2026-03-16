export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type Product = {
  id: string;
  name: string;
  price: number;
  category: "clothing" | "accessories" | "prints";
  description: string;
};

export const products: Product[] = [
  { id: "1", name: "Classic Hoodie", price: 65, category: "clothing", description: "Soft cotton blend, relaxed fit" },
  { id: "2", name: "Everyday Tee", price: 30, category: "clothing", description: "100% organic cotton, crew neck" },
  { id: "3", name: "Structured Cap", price: 28, category: "accessories", description: "Six-panel, adjustable strap" },
  { id: "4", name: "Ceramic Mug", price: 18, category: "accessories", description: "12oz, matte black finish" },
  { id: "5", name: "Poster Set", price: 24, category: "prints", description: "Set of 3, A3 size, matte paper" },
  { id: "6", name: "Art Print", price: 16, category: "prints", description: "Limited edition, signed, A4" },
];
