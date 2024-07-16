import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Check, Minus, Plus, X } from "lucide-react";
import React, {
  Dispatch,
  ElementRef,
  SetStateAction,
  useRef,
  useState,
} from "react";

interface ListPriceInputProps {
  handleList: (e: any, price: number) => Promise<void>;
  setListInput: Dispatch<SetStateAction<boolean>>;
}

const ListPriceInput = ({ setListInput, handleList }: ListPriceInputProps) => {
  const [listPrice, setListPrice] = useState<number>(0);

  return (
    <div className="flex w-full justify-between">
      <Button
        onClick={(e) => {
          e.stopPropagation();
          console.log("hello");
          setListInput(false);
        }}
      >
        <X />
      </Button>
      <div className="flex items-center justify-evenly space-x-4 rounded-md bg-primary-foreground/30 px-4">
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
          <div className="font-bold tracking-tighter">
            <input
              placeholder="0"
              className="w-full bg-inherit text-center"
              value={listPrice}
            />
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
      <Button
        onClick={(e) => {
          handleList(e, listPrice);
        }}
      >
        <Check />
      </Button>
    </div>
  );
};

export default ListPriceInput;
