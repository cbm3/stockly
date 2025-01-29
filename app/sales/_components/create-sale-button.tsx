"use client";

import { Button } from "@/app/_components/ui/button";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { Product } from "@prisma/client";
import { useState } from "react";
import UpsertSheetContent from "./upsert-sheet-content";
import { PlusIcon } from "lucide-react";

interface CreateSaleButtonProps {
  products: Product[];
  productOptions: ComboboxOption[];
}

const CreateSaleButton = (props: CreateSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <PlusIcon />
          Nova venda</Button>
      </SheetTrigger>
      <UpsertSheetContent onSubmitSuccess={() => {setSheetIsOpen(false)}} {...props} />
    </Sheet>
  );
}
export default CreateSaleButton;