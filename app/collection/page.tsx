import React from "react";
import YourAssets from "./component/YourAssets";
import ListedAssets from "./component/ListedAssets";

const CollectionPage = () => {
  return (
    <div>
      <ListedAssets />
      <YourAssets />
    </div>
  );
};

export default CollectionPage;
