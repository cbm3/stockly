import { Button } from "@/app/_components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { ClipboardCopyIcon, EditIcon, MoreHorizontalIcon } from "lucide-react";

interface UpsertSalesTableDropdownMenuProps {
  product: Pick<Product, "id">
  onDelete: (productId: string) => void;
}

const UpsertSalesTableDropdownMenu = ({product, onDelete}: UpsertSalesTableDropdownMenuProps) => {
  return (
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
              <DropdownMenuItem className="gap-1.5" onClick={() => onDelete(product.id)}>
                <EditIcon size={16} />
                Deletar
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  );
}
 
export default UpsertSalesTableDropdownMenu;