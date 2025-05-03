/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
// import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Customer {
  id: string;
  full_name: string;
}

interface CustomerDropDownProps {
  customers: Customer[];
  control: any;
  setValue: any;
}

export function CustomerDropDown({
  customers,
  control,
  setValue,
}: CustomerDropDownProps) {
  return (
    <FormField
      control={control}
      name="customer"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Select Customer</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? customers.find((customer) => customer.id === field.value)
                        ?.full_name
                    : "Select Customer"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search Customer..." />
                <CommandList>
                  <CommandEmpty>No Customer found.</CommandEmpty>
                  <CommandGroup>
                    {customers.map((customer) => (
                      <CommandItem
                        value={customer.full_name.toLowerCase()}
                        key={customer.id}
                        onSelect={() => {
                          setValue("customer", customer.id);
                        }}
                      >
                        {customer.full_name}
                        <Check
                          className={cn(
                            "ml-auto",
                            customer.id === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
