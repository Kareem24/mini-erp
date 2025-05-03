"use client";
import { Product } from "@/lib/types";
import { Checkbox } from "../ui/checkbox";

import { MessageCircleWarning } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

interface Props {
  products: Product[];
  quantity: { [key: string]: number };
  setQuantity: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  selectedProducts: Product[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}
const ProductList = ({
  products,
  quantity,
  setQuantity,
  selectedProducts,
  setSelectedProducts,
}: Props) => {
  const handleProductToggle = (product: Product, isChecked: boolean) => {
    if (isChecked) {
      setSelectedProducts((prev) => [...prev, product]);
      setQuantity((prev) => ({ ...prev, [product.id]: 1 }));

      return;
    } else {
      setSelectedProducts((prev) =>
        prev.filter((item) => item.id !== product.id)
      );
      setQuantity((prev) => {
        const newProducts = { ...prev };
        delete newProducts[product.id];
        return newProducts;
      });
    }
  };

  const calculateTotal = () => {
    return Object.entries(quantity).reduce((sum, [id, qty]) => {
      const product = products.find((p) => p.id === id);
      if (!product) return sum;
      return sum + Number(product.price) * Number(qty);
    }, 0);
  };

  const handleQuantityChange = (product: Product, value: number) => {
    console.log("value", value);
    console.log("quantity", quantity);
    setQuantity((prev) => ({ ...prev, [product.id]: value }));
  };
  // if a product is selected show quantity input field
  //defauslt quantity = 1
  //set the quantity to 1 when a product is selected
  // if a product is unselected remove the quantity input field
  //remove the product quatity from the quantity state
  //on the quantity input field change update the quantity state
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select Products</label>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center space-x-4 min-h-[36px]"
            >
              <Checkbox
                checked={product.id in quantity}
                onCheckedChange={(checked) => {
                  handleProductToggle(product, !!checked);
                }}
              />
              <span className="flex-1 flex-grow capitalize">
                {product.name} (₦{product.price.toLocaleString()})
              </span>

              {product.id in quantity && (
                <Input
                  type="number"
                  className="w-24"
                  key={product.id}
                  value={quantity[product.id] ?? ""}
                  onChange={(e) =>
                    handleQuantityChange(product, parseInt(e.target.value))
                  }
                />
              )}
            </div>
          ))}
        </div>
        <Card>
          {selectedProducts.length === 0 ? (
            <CardContent className="flex items-center gap-2 justify-center h-full ">
              <MessageCircleWarning />
              <p>No product selected</p>
            </CardContent>
          ) : (
            <CardContent className="space-y-10 ">
              <div>
                {selectedProducts?.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between space-y-2"
                  >
                    <p className="capitalize">{product.name}</p>
                    <div className=" min-w-24 flex justify-between">
                      <p className=" font-medium text-left">
                        ₦{product.price.toLocaleString()}
                      </p>
                      <p>
                        x
                        {isNaN(quantity[product.id]) ? 0 : quantity[product.id]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-right">
                <p className="flex items-center gap-1 text-right">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="font-semibold">
                    {isNaN(calculateTotal())
                      ? 0
                      : calculateTotal().toLocaleString()}
                  </span>
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};
//what i need for sale table
//customerId
//total amount
//userId

export default ProductList;
