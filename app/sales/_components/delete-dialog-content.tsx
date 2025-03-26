import { deleteSale } from "@/app/_actions/sale/delete-sale";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/app/_components/ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface DeleteSaleDialogContentProps {
  saleId: string;
}

const DeleteProductDialogContent = ({
  saleId,
}: DeleteSaleDialogContentProps) => {
  const { execute: executeDeleteSale } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Venda excluída com sucesso!");
    },
    onError: () => {
      toast.error("Ocorreu algum erro ao excluir a venda.");
    },
  });
  const handleContinueClick = () => executeDeleteSale({ id: saleId });

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Você está prestes a excluir esta venda. Esta ação não pode ser desfeita. Deseja continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleContinueClick}>Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default DeleteProductDialogContent;