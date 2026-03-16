"use server";

import { cookies } from "next/headers";
import { refresh } from "next/cache";

export async function addToCart() {
  const cookieStore = await cookies();
  const current = parseInt(cookieStore.get("cart-count")?.value ?? "0", 10);
  cookieStore.set("cart-count", String(current + 1));
  refresh();
}
