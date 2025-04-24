"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientDetailsPage() {
  // Normally, you'll fetch client by ID here
  const client = {
    full_name: "Kareem Qudus",
    email: "kareem@example.com",
    phone: "+234 812 345 6789",
    status: "Active",
    notes: "Client is interested in premium package. Good communication.",
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl">{client.full_name}</CardTitle>
          <Badge
            variant={client.status === "Active" ? "default" : "destructive"}
          >
            {client.status}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-base">{client.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="text-base">{client.phone}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Notes</p>
            <p className="text-base">{client.notes}</p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline">Edit</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
