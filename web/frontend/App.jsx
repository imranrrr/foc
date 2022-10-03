import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <NavigationMenu
              navigationLinks={[
                {
                  label: "Dashboard",
                  destination: "/dashboard",
                },
                {
                  label: "Suppliers",
                  destination: "/suppliers",
                },
                {
                  label: "Inbox",
                  destination: "/inbox",
                },
                {
                  label: "Stocktakes",
                  destination: "/stocktakes",
                },
                {
                  label: "Receiving",
                  destination: "/receiving",
                },
                {
                  label: "Purchase Orders",
                  destination: "/purchase-orders",
                },
                {
                  label: "Inventory",
                  destination: "/inventory",
                },
                {
                  label: "Products",
                  destination: "/product",
                },
                

              ]}
            />
            <Routes pages={pages} />
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
