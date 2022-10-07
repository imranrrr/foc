import React, {useState, useEffect} from "react";
import { useAppQuery } from "../../../hooks";
import SeacrchFilter from '../../searchFilter/SearchFilter';

const LowInventory = ({width}) => {
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
        const productData = products.filter((product) => product.variants[0].inventory_quantity < 10)
        setProducts(productData)
        setProductsData(productData)
    }
  }, [data, isProductLoading])
 
  return (
    <div style={{width: `${width}`, padding: "20px 5px", height:"300px"}}>
      <SeacrchFilter height='0px' title={"Low Inventory"} products={products.length > 1 ? products.slice(0,5) : []} isProductLoading={isProductLoading} productsData={productsData} setProductsData={setProductsData} refetchProducts={refetchProducts}/>
    </div>
    );
};

export default LowInventory;
