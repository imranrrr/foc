import { Card, Tabs } from "@shopify/polaris";
import { useState, useCallback } from "react";
import PostedComments from "../PostedComments/PostedComments";
import NewComment from "../NewComment/NewComment";

const CommentsTab = ({productId}) => {
  const [selected, setSelected] = useState(0);
  

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "all-customers-1",
      content: "Comments",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content-1",
      component: <PostedComments productId={productId} selected={selected}/>,
    },
    {
      id: "accepts-marketing-1",
      content: "Add Comments",
      panelID: "accepts-marketing-content-1",
      component: <NewComment productId={productId}/>,
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
export default CommentsTab;
