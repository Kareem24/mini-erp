"use client";
import React, { useState } from "react";
import DeleteModal from "../delete-modal";
import { useDeleteCustomer } from "@/hooks/customers/use-delete-customer";

interface DeleteCustomerProps {
  customerId: string;
}

const DeleteCustomer = ({ customerId }: DeleteCustomerProps) => {
  const [open, setOpen] = useState(false);
  const { isPending, mutate: deleteCustomer } = useDeleteCustomer();
  const handleDelete = (id: string) => {
    deleteCustomer(id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };
  return (
    <DeleteModal
      modalTitle="Are you sure you want to delete this Customer?"
      modalDescription="This action cannot be undone. This will permanently delete the product from the list."
      id={customerId}
      isPending={isPending}
      open={open}
      setOpen={setOpen}
      handleDelete={handleDelete}
    >
      Delete
    </DeleteModal>
  );
};

export default DeleteCustomer;
