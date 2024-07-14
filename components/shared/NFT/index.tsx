import Image from "next/image";
import React from "react";

interface NFTProps {
  name: string;
  description: string;
  price: number;
  image: string;
  mintAddress: string;
  button?: any;
}

const NFT = ({
  description,
  image,
  mintAddress,
  name,
  price,
  button,
}: NFTProps) => {
  return (
    <div className="">
      <Image
        src={image}
        alt={name}
        width={300}
        height={300}
        className="cursor-pointer rounded-lg border border-gray-300 shadow-md shadow-black"
      />
      {button && button}
    </div>
  );
};

export default NFT;
