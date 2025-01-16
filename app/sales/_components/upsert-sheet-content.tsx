"use client";

import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  productId: z.string().uuid({
    message: "O produto é obrigatório.",
  }),
  quantity: z.coerce.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps {
  products: Product[];
  productOptions: ComboboxOption[];
}

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheetContent = ({
  products,
  productOptions,
}: UpsertSheetContentProps) => {
  const [selectedProduts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;
    setSelectedProducts((prev) => [
      ...prev,
      {
        id: selectedProdut.id,
      },
    ]);
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>
          Insira as informações da venda abaixo.
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    placeholder="Selecione um produto"
                    options={productOptions}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full gap-2" variant={"secondary"}>
            <PlusIcon size={20} />
            Adicionar produto a venda
          </Button>
        </form>
      </Form>
    </SheetContent>
  );
};

export default UpsertSheetContent;
