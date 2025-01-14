"use client";

import { AlertDialog, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CircleIcon, ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import DeleteProductDialogContent from "./delete-dialog-content";
import UpsertProductDialogContent from "./upsert-dialog-content";

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque";
  }
  return "Fora de estoque";
};

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Produto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
    cell: (row) => {
      const product = row.row.original;
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price));
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estoque
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const label = getStatusLabel(product.status);
      return (
        <Badge
          variant={label === "Em estoque" ? "default" : "outline"}
          className="gap-1.5"
        >
          <CircleIcon
            size={14}
            className={`${label === "Em estoque" ? "fill-primary-foreground" : "fill-destructive-foreground"}`}
          />
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ação",
    cell: (row) => {
      const [editDialogOpen, setEditDialogOpen] = useState(false);
      const product = row.row.original
      return (
        <AlertDialog>
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <MoreHorizontalIcon size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-1.5" onClick={() => navigator.clipboard.writeText(product.id)}>
                  <ClipboardCopyIcon size={16} />
                  Copiar ID
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem className="gap-1.5">
                    <EditIcon size={16} />
                    Editar
                  </DropdownMenuItem>
                </DialogTrigger>
                <AlertDialogTrigger>
                  <DropdownMenuItem className="gap-1.5">
                    <TrashIcon size={16} />
                    Deletar
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <UpsertProductDialogContent
              defaultValues={{
                id: product.id,
                name: product.name,
                price: Number(product.price),
                stock: product.stock
              }}
              onSuccess={() => setEditDialogOpen(false)}
              />
            <DeleteProductDialogContent productId={ product.id } />
          </Dialog>
        </AlertDialog>
      )
    }
  },
];