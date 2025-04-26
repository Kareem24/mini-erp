"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterProduct = () => {
  const searchParams = useSearchParams();

  const { replace } = useRouter();
  const pathname = usePathname();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={(value) => handleChange(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder="
        Filter"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="oldest">Oldest</SelectItem>
        <SelectItem value="low">Out Of Stock</SelectItem>
        <SelectItem value="in-stock">In Stock</SelectItem>
        <SelectItem value="price">Price</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FilterProduct;
