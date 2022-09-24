import { Card, Tabs } from "@shopify/polaris";
import { useState, useCallback } from "react";
import LowInventory from "../LowInventory/LowInventory";
import OutOfStock from "../OutOfStock/OutOfStock";
import SoldProducts from "../SoldProducts/SoldProducts";

const DashboardTab = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "all-customers-1",
      content: "Bestseller",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content-1",
      component: <SoldProducts />,
    },
    {
      id: "accepts-marketing-2",
      content: "Low Inventory",
      panelID: "accepts-marketing-content-1",
      component: <LowInventory />,
    },
    {
      id: "accepts-marketing-1",
      content: "Out of Stock",
      panelID: "accepts-marketing-content-1",
      component: <OutOfStock />,
    },
  ];

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Card.Section title={tabs[selected].content}>
          {tabs[selected].component}
        </Card.Section>
      </Tabs>
    </Card>
  );
};
export default DashboardTab;
