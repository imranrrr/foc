import { Button, Popover, ActionList } from "@shopify/polaris";
import { useState, useCallback } from "react";

const BulkActions = () => {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleImportedAction = useCallback(
    () => console.log("Imported action"),
    []
  );

  const handleExportedAction = useCallback(
    () => console.log("Exported action"),
    []
  );

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
              content: "Export",
              onAction: handleExportedAction,
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
