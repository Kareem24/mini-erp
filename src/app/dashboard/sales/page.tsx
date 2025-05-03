// app/(dashboard)/sales/page.tsx
import Sales from "@/components/sales/sales";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Suspense } from "react";

export default async function SalesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create Sales</h1>
        <Link href="/dashboard/sales/all-sales">
          <Button variant={"outline"} size={"lg"}>
            See all Sales
          </Button>
        </Link>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Sales />
      </Suspense>
    </div>
  );
}
