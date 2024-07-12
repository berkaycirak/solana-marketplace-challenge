import { program } from "@/anchor/setup";
import { program_pk } from "@/constants";
import { utf8 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { PublicKey } from "@solana/web3.js";
import Image from "next/image";

export default async function Home() {
  return <main>Hello marketplace</main>;
}
