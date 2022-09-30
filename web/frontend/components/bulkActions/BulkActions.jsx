import { Button, Popover, ActionList, TextField } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { CSVLink } from "react-csv";
import { useAuthenticatedFetch } from "../../hooks";
const BulkActions = ({ products, selectedProducts, setIsLoading, isLoading }) => {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const handleImportedAction = useCallback(() => console.log(products), []);
  const fetch = useAuthenticatedFetch();

  const csvData = products.map((product) => ({
    Title: product.title,
    Price: product.variants[0].price,
    Updated:product.updated_at,
    SKUNumber: product.variants[0].sku,
    Vendor: product.vendor,
    NetQuantity: product.variants[0].inventory_quantity,
    TotalQuantity: product.variants[0].old_inventory_quantity,
    Grams:product.variants[0].grams,
    Weight:product.variants[0].weight_unit,
  }));
  const csvReport = {
    filename: "export.csv",
    data: csvData,
  };
  const handleExportedAction = useCallback(() => console.log(products));

  const updateStatus = async (status, productId) =>{
    
    // const parsedBody = { description: comment, date: new Date() };
    const method = "PUT";
    const  body = status+"^"+productId
    debugger
    await fetch(`/api/product/status/${body}`, {
      method,
      headers: { "Content-Type": "application/json" },
    });
  }

  const activeAndDeactive = () =>{
    setIsLoading(true);
    setActive(false)
    selectedProducts.map((id) =>{
      const product = products.find((product) => product.id === id)
      debugger
      const status = product.status === "active" ? "draft" : "active"
      updateStatus(status, id)
    })
    setIsLoading(false);

  }
  const activator = (
    <Button onClick={toggleActive} disclosure>
      Bulk actions
    </Button>
  );

  return (
    <div style={{ height: "50px" }}>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            {
              content: "Create barcodes",
              onAction: handleImportedAction,
            },
            {
              content: (
                <CSVLink
                  {...csvReport}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Export
                </CSVLink>
              ),
              onAction: handleExportedAction,
              products: { products },
            },
            {
              content: "Turn live in shopify",
              onAction: handleExportedAction,
            },
            {
              content: "Deactivate/Activate",
              onAction: activeAndDeactive,
            },
            {
              content: "Archive product",
              onAction: handleExportedAction,
            },
          ]}
        />
      </Popover>
    </div>
  );
};
export default BulkActions;