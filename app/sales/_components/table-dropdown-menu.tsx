"use client";

import { AlertDialog, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { Sale } from "@prisma/client";
import { Pick } from "@prisma/client/runtime/library";
import { ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import DeleteSaleDialogContent from "./delete-dialog-content";
//import UpsertProductDialogContent from "./upsert-dialog-content";

interface SalesTableDropDownMenuProps {
  sale: Pick<Sale, "id">;
}

const SalesTableDropDownMenu = ({
  sale,
}: SalesTableDropDownMenuProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
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
            <DropdownMenuItem className="gap-1.5" onClick={() => navigator.clipboard.writeText(sale.id)}>
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
        {/*<UpsertProductDialogContent
          defaultValues={{
            id: product.id,
            name: product.name,
            price: Number(product.price),
            stock: product.stock
          }}
          onSuccess={() => setEditDialogOpen(false)}
          />*/}
        <DeleteSaleDialogContent saleId={ sale.id } />
      </Dialog>
    </AlertDialog>
  )
}

export default SalesTableDropDownMenu;