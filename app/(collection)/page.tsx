import React from "react";
import YourAssets from "./component/YourAssets";
import ListedAssets from "./component/ListedAssets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock } from "lucide-react";

const CollectionPage = () => {
  return (
    <section className="container mx-auto p-12">
      {/* Banner For MarketHall  */}
      <div></div>
      {/* Tabs */}
      <Tabs defaultValue="market" className="mx-auto w-full">
        <TabsList className="mx-auto mb-6 flex w-full items-center md:max-w-screen-md xl:mb-12 2xl:max-w-screen-lg">
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="owned">Owned Rabbidos</TabsTrigger>
          <TabsTrigger value="mint" className="cursor-not-allowed" disabled>
            <Lock size={14} /> Mint Rabiddo
          </TabsTrigger>
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
