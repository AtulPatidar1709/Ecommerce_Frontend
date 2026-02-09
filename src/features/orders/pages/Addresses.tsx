import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MoreVertical, MapPin, Plus } from "lucide-react";
import { useAddresses } from "../hooks/address.hook";
import CreateAddress from "../components/createAddress";
import type { CreateAddressInputType } from "../schemas/address.schema";
import CardSkeleton from "@/components/CardSkeleton";

const Addresses = () => {
  const { addresses, deleteAddress, isLoading, isError } = useAddresses();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return <CardSkeleton />;

  console.log("Addresses is ", addresses);
  if (isError || !addresses) {
    toast.error("Failed to load addresses");
    navigate("/");
  }

  return (
    <div className="w-full sm:w-4/5 flex flex-col justify-center mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center mt-3 justify-between">
        <div>
          <h1 className="text-2xl font-semibold">My Addresses</h1>
          <p className="text-sm text-muted-foreground">
            Manage your saved delivery addresses
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="link">
              <Plus className="mr-2 h-4 w-4" />
              Add Address
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px] max-h-fu">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <CreateAddress onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      {/* Empty State */}
      {addresses?.length === 0 && (
        <Card className="flex flex-col items-center justify-center py-16">
          <MapPin className="h-10 w-10 text-muted-foreground mb-3" />
          <p className="text-muted-foreground">
            No addresses found. Add a new one.
          </p>
        </Card>
      )}

      {/* Address Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {addresses.map((address: CreateAddressInputType) => (
          <Card key={address.id} className="relative p-2">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {address.city}, {address.state}
              </CardTitle>
              <CardDescription>{address.pincode}</CardDescription>

              {/* Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => deleteAddress(address.id!)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>

            <CardContent className="space-y-2 text-sm">
              <p>{address.street}</p>
              <div className="flex items-center justify-between pt-2">
                <Badge variant="outline">Phone: {address.phone}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Addresses;
