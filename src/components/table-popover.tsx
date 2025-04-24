"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { ShowModal } from "./form-modal";
import { AddClientForm } from "./clients/add-client-form";
import Link from "next/link";
import { useState } from "react";

const TablePopover = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2 p-2">
          <ShowModal
            btn={
              <Button variant={"ghost"} className="text-sm text-gray-500">
                Edit
              </Button>
            }
            modalTitle="Edit Client"
            open={open}
            setOpen={setOpen}
          >
            <AddClientForm id="1" open={open} setOpen={setOpen} />
          </ShowModal>
          <Button variant={"ghost"} className="text-sm text-gray-500">
            Delete
          </Button>
          <Button variant={"ghost"} className="text-sm text-gray-500">
            <Link href={"/clients/1"}>View</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TablePopover;
