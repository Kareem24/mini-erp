"use client";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../form-input";
import { Button } from "../ui/button";
import { useAddCustomer } from "@/hooks/customers/use-add-customer";
import { useEditCustomer } from "@/hooks/customers/use-edit-customer";
import { Customers } from "@/lib/types";

interface CustomerFormProps {
  id?: string;
  data?: Customers;
}

const FormSchema = z.object({
  full_name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(100, { message: "Maximum character exceeded" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.coerce
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" })
    .max(15, { message: "Maximum character exceeded" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" })
    .max(200, { message: "Maximum character exceeded" }),
});

const CustomerForm = ({ id, data }: CustomerFormProps) => {
  const { mutate: addCustomer, isPending } = useAddCustomer();
  const { mutate: editCustomer, isPending: isEditing } = useEditCustomer();

  const isEdit = !!id;

  const form = useForm({
    defaultValues:
      isEdit && data
        ? {
            full_name: data.full_name,
            email: data.email,
            phone: data.phone,
            address: data.address,
          }
        : {
            full_name: "",
            email: "",
            phone: "",
            address: "",
          },
    resolver: zodResolver(FormSchema),
  });

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    addCustomer(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  const handleEdit = (data: z.infer<typeof FormSchema>) => {
    if (id) {
      editCustomer(
        { customerData: data, id },
        {
          onSuccess: () => {
            form.reset();
          },
        }
      );
    }
  };

  return (
    <div className="overflow-y-auto  h-full  ">
      <Form {...form}>
        <form
          action=""
          className="space-y-6"
          onSubmit={form.handleSubmit(isEdit ? handleEdit : handleSubmit)}
        >
          <FormInput
            name="full_name"
            type="text"
            placeholder="e.g John Doe"
            control={form.control}
            label="Full Name"
          />
          <FormInput
            name="email"
            type="email"
            placeholder="e.g e@gmail.com"
            control={form.control}
            label="Email"
          />
          <FormInput
            name="phone"
            type="number"
            placeholder="e.g 08012345678"
            control={form.control}
            label="Phone Number"
          />
          <FormInput
            name="address"
            type="text"
            placeholder="Enter address ..."
            control={form.control}
            label="Address"
          />
          {isEdit ? (
            <Button disabled={isEditing}>
              {isEditing ? "Editing ..." : ` Edit customer`}
            </Button>
          ) : (
            <Button disabled={isPending}>
              {isPending ? "Adding ..." : ` Add customer`}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CustomerForm;
