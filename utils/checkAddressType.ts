import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Check if a string is a valid Solana address
function isValidAddress(value: string): boolean {
  console.log(value);
  try {
    new PublicKey(value);

    return true;
  } catch (error) {
    return false;
  }
}

// Check if a string is a valid transaction signature
function isValidTransactionSignature(value: string): boolean {
  return value.length === 88; // The length of a base-58 encoded signature is typically 44 characters
}

// Check if a slot number is a valid block on the blockchain
async function isValidSlot(slot: number): Promise<boolean> {
  try {
    await connection.getBlockTime(slot);
    return true;
  } catch {
    return false;
  }
}

// Check if a transaction signature is valid
async function isValidTransaction(signature: string): Promise<boolean> {
  try {
    await connection.getTransaction(signature, {
      maxSupportedTransactionVersion: 0,
    });
    return true;
  } catch {
    return false;
  }
}

// Main function to detect the type of value
export async function checkAddressType(
  value: string | number,
): Promise<string> {
  if (typeof value === "string") {
    if (isValidAddress(value)) {
      return "address";
    } else if (isValidTransactionSignature(value)) {
      if (await isValidTransaction(value)) {
        return "transaction";
      } else {
        return "invalid";
      }
    } else {
      return "invalid";
    }
  } else if (typeof value === "number") {
    if (await isValidSlot(value)) {
      return "block";
    } else {
      return "invalid";
    }
  }
  return "invalid";
}
