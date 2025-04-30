// app/(dashboard)/sales/new/SaleForm.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Customer {
  id: string;
  full_name: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

interface SalesFormProps {
  customers: Customer[];
  products: Product[];
}

export default function SaleForm({ customers, products }: SalesFormProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<{
    [key: string]: number;
  }>({});

  const handleProductToggle = (productId: string) => {
    setSelectedProducts((prev) => {
      const newProducts = { ...prev };
      if (newProducts[productId]) {
        delete newProducts[productId];
      } else {
        newProducts[productId] = 1; // default quantity = 1
      }
      return newProducts;
    });
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const calculateTotal = () => {
    return Object.entries(selectedProducts).reduce((sum, [id, qty]) => {
      const product = products.find((p) => p.id === id);
      if (!product) return sum;
      return sum + product.price * qty;
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Send form data to server action to save the sale
    console.log({
      customer_id: selectedCustomer,
      products: selectedProducts,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Select Customer */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Customer</label>
            <Select onValueChange={(value) => setSelectedCustomer(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Select Products */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Products</label>
            <div className="space-y-2">
              {products.map((product) => (
                <div key={product.id} className="flex items-center space-x-4">
                  <Checkbox
                    checked={!!selectedProducts[product.id]}
                    onCheckedChange={() => handleProductToggle(product.id)}
                  />
                  <span className="flex-1">
                    {product.name} (₦{product.price})
                  </span>

                  {selectedProducts[product.id] && (
                    <Input
                      type="number"
                      className="w-24"
                      min={1}
                      value={selectedProducts[product.id]}
                      onChange={(e) =>
                        handleQuantityChange(
                          product.id,
                          parseInt(e.target.value)
                        )
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="text-right font-semibold text-lg">
            Total: ₦{calculateTotal().toLocaleString()}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={
                !selectedCustomer || Object.keys(selectedProducts).length === 0
              }
            >
              Create Sale
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
