import { data } from "@shopify/app-bridge/actions/Modal";
import React, {useState, useEffect} from "react";
import { useAppQuery } from "../../../hooks";
import SeacrchFilter from '../../searchFilter/SearchFilter';
const SoldProducts = ({width}) => {

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
    <div style={{width: `${width}`, padding: "20px 5px",  height:"300px"}}>
      <SeacrchFilter height='0px' title={"Sold Products"} products={products.length > 1 ? products.slice(0,5) : []} isProductLoading={isProductLoading} productsData={productsData} setProductsData={setProductsData} refetchProducts={refetchProducts}/>
    </div>
  );
};

export default SoldProducts;
