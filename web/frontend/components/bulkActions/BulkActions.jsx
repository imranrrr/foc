import { Button, Popover, ActionList, TextField } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { CSVLink } from "react-csv";
const BulkActions = ({ products }) => {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const handleImportedAction = useCallback(() => console.log(products), []);

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
              onAction: handleExportedAction,
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