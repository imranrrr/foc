import React, { useEffect, useState } from "react";
import { useAppQuery } from "../hooks";
import SeacrchFilter from '../components/searchFilter/SearchFilter'

export default function Product() {
  const [products, setProducts] = useState([])
  const [productsData, setProductsData] = useState([])

  const {
    data,
    refetch: refetchProducts,
    isLoading: isProductLoading,
  } = useAppQuery({
    url: "/api/products",
  });

  useEffect(()=>{
    if(!isProductLoading && data){
        setProducts(data)
        setProductsData(data)
    }
  }, [data, isProductLoading])

  return (
    <>
      <SeacrchFilter products={products} isProductLoading={isProductLoading} productsData={productsData} setProductsData={setProductsData} refetchProducts={refetchProducts}/>
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
