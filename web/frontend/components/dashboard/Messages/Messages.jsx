import React, {useState, useEffect} from "react";
import { useAppQuery } from "../../../hooks";
import {
    RangeSlider,
    Card,
    Filters,
    useIndexResourceState,
    DataTable,
    IndexTable,
    TextField,
    TextStyle,
  } from "@shopify/polaris";

const resourceName = {
    singular: "message",
    plural: "messages",
  };

const Messages = ({width}) => {
  const [messages, setMessages] = useState([])

  const {
    data,
    refetch: refetchMessagess,
    isLoading: isMessageLoading,
  } = useAppQuery({
    url: "/api/messages",
  });

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(messages);

  const rowMarkup = messages
    ? messages.map(({ id, description, user_name, date, to }, index) => (
        <IndexTable.Row
          id={id}
          key={id}
          selected={selectedResources.includes(id)}
          position={index}
        >
          <IndexTable.Cell>
          <div style={{display:"flex", alignItems:"center"}} >
           
            <span>
                <img
                    src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                    alt=""
                    className="comments__addComments__main__box__avatar"
                />
            </span>
            <IndexTable.Cell> {user_name}</IndexTable.Cell>
             
        </div>
          </IndexTable.Cell>
          <IndexTable.Cell>{description}</IndexTable.Cell>
          <IndexTable.Cell>{to}</IndexTable.Cell>
          <IndexTable.Cell>{date}</IndexTable.Cell>
        </IndexTable.Row>
      ))
    : null;

  useEffect(()=>{
    if(!isMessageLoading && data){    
      setMessages(data.commentsList.length > 0 ? data.commentsList.slice(data.commentsList.length - 5,data.commentsList.length - 1) : [])
    }
  }, [data, isMessageLoading])
 
  return (
    <div style={{width: `${width}`,  padding: "20px 5px",  height: "300px" }}>
       <div style={{ height: "308px" }}>
        <Card style={{height: "312px" }}>
        <Card.Section style={{height: "100px" }}>
          <h1 style={{fontWeight: "bold"}}>Messages</h1>
        </Card.Section>
          <IndexTable
              resourceName={resourceName}
              itemCount={messages.length}
              selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
              }
              loading={isMessageLoading}
              onSelectionChange={handleSelectionChange}
              headings={[
              { title: "User Name" },
              { title: "Messages" },
              { title: "To" },
              { title: "Date" }
              ]}
          >
              {rowMarkup}
          </IndexTable>
        </Card>
      </div>
    </div>

  );
};

export default Messages;