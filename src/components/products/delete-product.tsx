"use client";
import React, { useState } from "react";
import DeleteModal from "../delete-modal";
import { useDeleteProduct } from "@/hooks/use-delete-product";

interface DeleteProductProps {
  children: React.ReactNode;
  productId: string;
}

const DeleteProduct = ({ children, productId }: DeleteProductProps) => {
  const [open, setOpen] = useState(false);
  const { isPending, mutate: deleteProduct } = useDeleteProduct();
  const handleDelete = (id: string) => {
    deleteProduct(id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };
  return (
    <DeleteModal
      modalTitle="Are you sure you want to delete this product?"
      modalDescription="This action cannot be undone. This will permanently delete the product from the list."
      id={productId}
      isPending={isPending}
      open={open}
      setOpen={setOpen}
      handleDelete={handleDelete}
    >
      {children}
    </DeleteModal>
  );
};

export default DeleteProduct;
