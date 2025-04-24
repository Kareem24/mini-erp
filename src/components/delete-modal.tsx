"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import React from "react";
import { DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { useDeleteProduct } from "@/hooks/use-delete-product";

const DeleteModal = ({
  children,
  productId,
}: {
  children: React.ReactNode;
  productId: string;
}) => {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-red-500 text-white px-4 py-2 rounded"
          variant={"destructive"}
          size={"sm"}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this product?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            product from the list.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          <Button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => setOpen((prev) => !prev)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(productId)}
            className="bg-red-500 text-white px-4 py-2 rounded"
            disabled={isPending}
          >
            {isPending ? "Deleting" : " Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
