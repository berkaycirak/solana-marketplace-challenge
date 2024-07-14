import { redditMono } from "@/app/fonts";
import SolanaIcon from "@/assets/icon/SolanaIcon";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Clipboard } from "lucide-react";
import { truncateString } from "@/utils";
import { toast } from "sonner";

interface NFTProps {
  name: string;
  description: string;
  price?: number;
  image: string;
  mintAddress: string;
  collectionAddress?: string;
  button?: any;
}

const NFT = ({
  description,
  image,
  mintAddress,
  collectionAddress,
  name,
  price,
  button,
}: NFTProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="h-[300px] w-[300px]">
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className="mb-1 cursor-pointer rounded-lg border border-gray-300 shadow-md shadow-black"
          />
          <div className="flex items-center justify-between gap-2 px-2">
            <h5 className="font-semibold">{name}</h5>
            <h4 className={cn("gap flex items-center", redditMono.className)}>
              {price && price}
              <SolanaIcon />
            </h4>
          </div>

          {button && button}
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="flex w-[950px] items-center justify-center">
          <div className="flex py-4">
            <Image
              src={image}
              alt={name}
              width={350}
              height={350}
              className="mb-1 cursor-pointer rounded-lg border border-gray-300 shadow-md shadow-black"
            />
            <div className="flex flex-col px-6">
              <h5 className={cn("mb-4 font-bold", redditMono.className)}>
                {name}
              </h5>
              <p className="flex-1">{description}</p>
              <div>
                <p className="mb-2 text-sm underline underline-offset-2">
                  Mint Address
                </p>
                <div className="flex items-center">
                  <Clipboard />{" "}
                  <p
                    className="hover:opac cursor-pointer font-bold opacity-90 transition"
                    onClick={() => {
                      toast.success("Mint Address is copied!");
                      navigator.clipboard.writeText(mintAddress);
                    }}
                  >
                    {truncateString(mintAddress, 12, 7)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                {button && button}
                <h4
                  className={cn(
                    "gap mx-auto mt-2 flex w-[120px] items-center justify-center text-center",
                    redditMono.className,
                  )}
                >
                  {price && price}
                  <SolanaIcon />
                </h4>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NFT;
