import { getProducts } from "@/data/queries/products";
import { getCartCount } from "@/data/queries/cart";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { CategoryFilter } from "@/components/category-filter";
import { ProductImage } from "@/components/product-image";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const cartCount = await getCartCount();
  const products = await getProducts(category);

  return (
    <div className="flex-1">
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold tracking-tight">
            The ACME Store
          </h1>
          <p className="text-muted-foreground mt-1.5 max-w-md">
            Curated goods for everyday life.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <CategoryFilter active={category} />
          <span className="text-sm text-muted-foreground">
            {cartCount} {cartCount === 1 ? "item" : "items"} in cart
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Card key={product.id} className="shadow-none overflow-hidden">
              <ProductImage index={i} />
              <CardContent className="pt-3 pb-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {product.description}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="shrink-0 font-mono text-xs"
                  >
                    ${product.price}
                  </Badge>
                </div>
                <div className="mt-3">
                  <AddToCartButton />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
