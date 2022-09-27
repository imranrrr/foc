import React, { useEffect, useState } from "react";
import {
  Card,
  IndexTable,
  TextStyle,
  useIndexResourceState,
} from "@shopify/polaris";
import { useAppQuery } from "../hooks";
import  BulkActions from "../components/bulkActions/BulkActions"
import { Link } from "react-router-dom";
import SeacrchFilter from '../components/searchFilter/SearchFilter'
const resourceName = {
  singular: "product",
  plural: "products",
};
export default function Product() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([])

  const {
    data,
    refetch: refetchProducts,
    isLoading: isProductLoading,
  } = useAppQuery({
    url: "/api/products",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
        
      },
    },
  });

  useEffect(()=>{
    if(!isProductLoading && data){
        setProducts(data)
    }else{
        setIsLoading(true);
    }
  }, [data, isProductLoading])

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(products);

    const rowMarkup = products
    ? products.map(
        (
          { id, title, variants },
          index
        ) => (
          <IndexTable.Row
            id={id}
            key={id}
            selected={selectedResources.includes(id)}
            position={index}
          >
            <IndexTable.Cell>
              <TextStyle variation="strong">
                <Link
                  to={`/product/${id}`}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  {title}
                </Link>
              </TextStyle>
            </IndexTable.Cell>
            <IndexTable.Cell>${variants[0].price}</IndexTable.Cell>
            <IndexTable.Cell>{variants[0].sku}</IndexTable.Cell>
            <IndexTable.Cell>{variants[0].inventory_quantity}</IndexTable.Cell>
            <IndexTable.Cell>{variants[0].old_inventory_quantity}</IndexTable.Cell>
          </IndexTable.Row>
        )
      )
    : null;

  return (
    <>
      <SeacrchFilter products={products}/>
      {/* <Card
        title="Products"
        sectioned
        actions={[
          {
            content: (
              <BulkActions />
            ),
          },
        ]}
      >
        <IndexTable
          resourceName={resourceName}
          itemCount={products.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          loading={isLoading || isProductLoading}
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "Product Title" },
            { title: "Price" },
            { title: "SKU Number" },
            { title: "Net Quantity" },
            { title: "Total Quantity" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </Card> */}
    </>
  );
}
