"use client";

import { useOptimistic, useActionState, startTransition } from "react";
import { addToCart } from "@/data/actions/cart";
import { Button } from "@/components/ui/button";

export function AddToCartButton() {
  const [, action, pending] = useActionState(addToCart, undefined);
  const [added, setAdded] = useOptimistic(false);

  // Uncomment to demo browser log forwarding (infinite render loop):
  // const [count, setCount] = useState(0);
  // setCount(count + 1);

  return (
    <Button
      size="sm"
      variant="secondary"
      className="w-full transition-all duration-200"
      disabled={pending}
      onClick={() =>
        startTransition(() => {
          setAdded(true);
          action();
        })
      }
    >
      {added ? (
        <span className="inline-flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-1 duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Added
        </span>
      ) : (
        "Add to Cart"
      )}
    </Button>
  );
}
