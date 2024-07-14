export const checkOwnership = (
  mint_address: string,
  connected_address: string | undefined,
) => {
  if (mint_address === connected_address) {
    return true;
  } else {
    return false;
  }
};
