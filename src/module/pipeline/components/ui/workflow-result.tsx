import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { useDisclosure } from "../../hooks/use-disclosure";
import { Button } from "@/components/ui/button";
import type { PipelineParseResponse } from "../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ban, CircleCheck } from "lucide-react";
import { Confetti } from "@/components/ui/confetti";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type WorkflowResultProps = ReturnType<typeof useDisclosure> &
  PipelineParseResponse;

export const WorkflowResult = ({
  isOpen,
  onToggle,
  num_edges,
  num_nodes,
  is_dag,
}: WorkflowResultProps) => {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onToggle}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Workflow Result</DialogTitle>
            <DialogDescription>
              The workflow has been executed successfully and the results are as
              follows.
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nodes</TableHead>
                <TableHead>Edges</TableHead>
                <TableHead>DAG</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{num_nodes}</TableCell>
                <TableCell>{num_edges}</TableCell>
                <TableCell>
                  {is_dag ? (
                    <CircleCheck
                      width={20}
                      height={20}
                      className="text-green-300"
                    />
                  ) : (
                    <Ban width={20} height={20} className="text-destructive" />
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <DialogFooter className="justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {createPortal(
        <Confetti
          className={cn("absolute hidden top-0 left-0 z-100 size-full", {
            block: isOpen,
          })}
        />,
        document.body
      )}
    </>
  );
};
