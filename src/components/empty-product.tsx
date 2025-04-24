import React from "react";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";

const EmptyProduct = () => {
  return (
    <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-4 text-center">
      <h3>There is no product yet</h3>
      <Button className="flex items-center gap-4">
        <span>
          <PlusCircle />
        </span>
        <span>Add Product</span>
      </Button>
    </div>
  );
};

export default EmptyProduct;
