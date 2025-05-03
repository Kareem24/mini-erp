"use client";
import { useAddProduct } from "@/hooks/use-add-product";
import { useEditProduct } from "@/hooks/use-edit-product";
import { ProductFormValues, Products } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "../form-input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

interface AddProductFormProps {
  id?: string;
  data?: Products;
}

const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "name must be at least 2 characters long" })
    .max(100, { message: "Maximum character exceeded" }),
  description: z
    .string()
    .min(2, { message: "description must be at least 2 characters long" })
    .max(400, { message: "Maximum character exceeded" }),
  price: z.coerce.number().min(1, { message: "price must be at least 1" }),

  stock: z.coerce.number().min(1, { message: "stock must be at least 1" }),
});

const AddProductForm = ({ id, data }: AddProductFormProps) => {
  const isEdit = Boolean(id);
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: isEdit
      ? {
          name: data?.name,
          description: data?.description,
          price: data?.price,
          stock: data?.stock,
        }
      : {
          name: "",
          description: "",
          price: 0,
          stock: 0,
        },
    resolver: zodResolver(FormSchema),
  });

  const { isPending, mutate: addData } = useAddProduct();
  const { isPending: isEditPending, mutate: editData } = useEditProduct();

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    const productData: ProductFormValues = {
      ...data,
    };
    console.log("Form data:", productData);
    addData(productData, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  const handleEdit = (data: z.infer<typeof FormSchema>) => {
    const productData: ProductFormValues = {
      ...data,
    };

    if (id) {
      editData(
        { data: productData, id },
        {
          onSuccess: () => {
            form.reset();
          },
        }
      );
    } else {
      console.error("Edit operation failed: 'id' is undefined.");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(isEdit ? handleEdit : handleSubmit)}
        >
          <FormInput
            name="name"
            label="Product Name"
            placeholder="Product name"
            control={form.control}
            type="text"
          />
          <FormInput
            name="price"
            label="Product Price"
            placeholder="00.00"
            control={form.control}
            type="number"
          />
          <FormInput
            name="stock"
            label="Stock Count"
            placeholder="1"
            control={form.control}
            type="number"
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Product description ..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {isEdit ? (
            <Button disabled={isEditPending}>
              {isEditPending ? "Editing... " : "Edit Product"}
            </Button>
          ) : (
            <Button disabled={isPending}>
              {isPending ? "Adding... " : "Add Product"}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default AddProductForm;
