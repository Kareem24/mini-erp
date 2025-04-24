"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "../form-input";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  full_name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone_number: z
    .string()
    .min(10, { message: "Phone number can't be less than ten characters" })
    .max(11, {
      message: "Phone number must be between 10 and 11 digits.",
    }),
});

interface AddClientFormProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  id?: string;
}

export function AddClientForm({ id, setOpen }: AddClientFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      full_name: "",
    },
  });

  const EditId = !!id;

  // async function onSubmit(data: z.infer<typeof FormSchema>) {
  //   if (EditId) {
  //     console.log("Editing client with ID:", id);
  //     return;
  //   }
  //   const { error } = await supabase
  //     .from("clients")
  //     .insert([{ ...data }])
  //     .select();

  //   if (error) {
  //     console.error("Error inserting data:", error);
  //   } else {
  //     revalidatePath("/clients");
  //     form.reset(); // Reset the form after successful submission
  //     console.log("Data inserted successfully:", data);
  //   }
  // }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormInput
          name="full_name"
          placeholder="Enter your full name ..."
          control={form.control}
          label="Full Name"
        />
        <FormInput
          name="email"
          placeholder="example@gmail.com"
          control={form.control}
          label="Email"
          type="email"
        />
        <FormInput
          name="phone_number"
          placeholder="08012345678"
          control={form.control}
          label="Phone Number"
          type="number"
        />

        {EditId ? (
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
}
