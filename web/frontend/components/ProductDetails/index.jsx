import React , {useState, useEffect} from "react";
import { MediaCard } from "@shopify/polaris";
import CommentsTab from "./components/CommentsTab/CommentsTab";
import { Icon } from "@shopify/polaris";
import { useParams } from "react-router-dom";
import { useAppQuery } from "../../hooks";

const ProductDetails = () => {
  const {id} = useParams();
  const [product, setProduct] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const {
    data,
    refetch: refetchProduct,
    isLoading: isProductLoading,
  } = useAppQuery({
    url: `/api/product/${id}`,
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  useEffect(()=>{
    if(!isProductLoading && data){
        setProduct(data)
    }else{
        setIsLoading(true);
    }
  }, [data, isProductLoading])

  return (
    <main className="comments">
      <MediaCard
        title={product && product.title}
        primaryAction={{
          content: "Price: $5",
          onAction: () => {},
        }}
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
      >
        <img
          alt=""
          width="100%"
          height="100%"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
        />
      </MediaCard>
      <CommentsTab productId={id}/>
    </main>
  );
};

export default ProductDetails;
