import React, { useEffect, useState } from "react";
import { useAppQuery } from "../hooks";
import SeacrchFilter from '../components/searchFilter/SearchFilter'

export default function Product() {
  const [products, setProducts] = useState([])
  const [productsData, setProductsData] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const {
    data,
    refetch,
    isLoading: isProductLoading,
  } = useAppQuery({
    url: "/api/products",
    refetchOnMount: 'always'
  });

  useEffect(()=>{
    if(!isProductLoading && data){
        setProducts(data)
        setProductsData(data)
    }
  }, [data, isProductLoading])

  return (
    <>
      <SeacrchFilter setIsLoading={setIsLoading} isLoading={isLoading} title="Products" products={products} isProductLoading={isProductLoading} productsData={productsData} setProductsData={setProductsData} refetchProducts={refetch}/>
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
