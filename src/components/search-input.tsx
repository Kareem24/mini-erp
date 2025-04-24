"use client";
import React from "react";
import { Input } from "./ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((value: string) => {
    const param = new URLSearchParams(searchParams);
    if (value) {
      param.set("search", value);
    } else {
      param.delete("search");
    }
    replace(`${pathname}?${param.toString()}`);
  }, 600);
  return (
    <div>
      <Input
        type="text"
        placeholder="Search Product here .."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search") || ""}
      />
    </div>
  );
};

export default SearchInput;
