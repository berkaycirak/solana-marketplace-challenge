import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface ListPriceInputProps {
  listPrice: number;
  setListPrice: Dispatch<SetStateAction<number>>;
}

const ListPriceInput = ({ listPrice, setListPrice }: ListPriceInputProps) => {
  return (
    <div className="flex max-w-xl items-center justify-evenly space-x-2 border-4 border-red-500">
      <Button
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full"
        onClick={() => setListPrice((prev) => prev - 1)}
        disabled={listPrice <= 0}
      >
        <Minus className="h-4 w-4" />
        <span className="sr-only">Decrease</span>
      </Button>
      <div className="flex-1 text-center">
        <div className="text-7xl font-bold tracking-tighter">
          <span className="">0</span>
        </div>
        <div className="text-[0.70rem] uppercase text-muted-foreground"></div>
      </div>
      <Button
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full"
        onClick={() => setListPrice((prev) => prev + 1)}
      >
        <Plus className="h-4 w-4" />
        <span className="sr-only">Increase</span>
      </Button>
    </div>
  );
};

export default ListPriceInput;
