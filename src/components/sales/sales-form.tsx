"use client";

import { useCreateSale } from "@/hooks/use-add-sale";
import { Customer, Product } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Form } from "../ui/form";
import { CustomerDropDown } from "./customer-drop-down";
import ProductList from "./product-list";

interface SalesFormProps {
  customers: Customer[];
  products: Product[];
}

const FormSchema = z.object({
  customer: z.string({
    required_error: "Please select a Customer",
  }),
});

const SalesForm = ({ customers, products }: SalesFormProps) => {
  const { mutate: createSale, isPending } = useCreateSale();
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({});
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createSale({
      customerId: data.customer,
      items: Object.entries(quantity).map(([productId, quantity]) => ({
        product_id: productId,
        quantity,
      })),
    });
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <h1>Create sales</h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <CustomerDropDown
                customers={customers}
                control={form.control}
                setValue={form.setValue}
              />

              <ProductList
                products={products}
                quantity={quantity}
                setQuantity={setQuantity}
              />
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesForm;
