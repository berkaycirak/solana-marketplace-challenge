import React from "react";
import YourAssets from "./component/YourAssets";
import ListedAssets from "./component/ListedAssets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CollectionPage = () => {
  return (
    <section className="container mx-auto p-12">
      {/* Banner For MarketHall  */}
      <div></div>
      {/* Tabs */}
      <Tabs defaultValue="market" className="mx-auto w-[400px]">
        <TabsList className="flex w-full items-center">
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="owned">Owned Rabbids</TabsTrigger>
        </TabsList>
        <TabsContent value="market">
          <ListedAssets />
        </TabsContent>
        <TabsContent value="owned">
          <YourAssets />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default CollectionPage;
