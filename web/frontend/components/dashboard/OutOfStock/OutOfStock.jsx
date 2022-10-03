import React, {useState, useEffect} from "react";
import { useAppQuery } from "../../../hooks";
import SeacrchFilter from '../../searchFilter/SearchFilter';

const OutOfStock = () => {
  
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
        const productData = products.filter((product) => product.variants[0].inventory_quantity === 0)
        setProducts(productData)
        setProductsData(productData)
    }
  }, [data, isProductLoading])
 
  return (
    <SeacrchFilter products={products.slice(0,5)} isProductLoading={isProductLoading} productsData={productsData} setProductsData={setProductsData} refetchProducts={refetchProducts}/>
  );
};

export default OutOfStock;
