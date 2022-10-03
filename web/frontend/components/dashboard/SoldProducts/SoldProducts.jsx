import { data } from "@shopify/app-bridge/actions/Modal";
import React, {useState, useEffect} from "react";
import { useAppQuery } from "../../../hooks";
import SeacrchFilter from '../../searchFilter/SearchFilter';
const SoldProducts = () => {

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
    <SeacrchFilter products={products.slice(0,5)} isProductLoading={isProductLoading} productsData={productsData} setProductsData={setProductsData} refetchProducts={refetchProducts}/>
  );
};

export default SoldProducts;
