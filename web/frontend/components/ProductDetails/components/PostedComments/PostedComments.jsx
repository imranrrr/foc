import React, {useEffect, useCallback, useState} from "react";
import "./PostedComments.css";
import { useAppQuery } from "../../../../hooks";
import {Page, Spinner, TextStyle} from '@shopify/polaris';

const PostedComments = ({productId, selected}) => {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const {
    data,
    refetch: refetchComments,
    isLoading: isCommentsLoading,
  } = useAppQuery({
    url: `/api/product/comments/${productId}`,
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });


  useEffect(()=>{
    if(!isCommentsLoading && data){
      setComments(data.comment)
    }else{
        setIsLoading(true);
    }
  }, [data, isCommentsLoading])

  useEffect(()=>setIsLoading(true)
  ,[selected])


    return (
      <>
        {
          isLoading ? <Spinner accessibilityLabel="Spinner example" size="large" />
        :
          <section className="comments__addComments">
            {
              comments.length > 0 ? comments.map((comment) =>(
                <section section key={comment.id} className="comments__addComments__main">
                  <div className="comments__addComments__main__box">
                    <img
                      src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                      alt=""
                      className="comments__addComments__main__box__avatar"
                    />
                    <span>{comment.user_name}</span>
                  </div>
                  <div section className="comments__addComments__main__postedComments">
                    <p>
                    {comment?.description}
                    </p>
                  </div>
                  <div className="comments__addComments__main__commentTime">
                    <span>{comment?.date}</span>
                  </div>
                </section>
              ))
              :
              <TextStyle variation="warning">No comments</TextStyle>
            }
          {/* </Frame> */}
          </section>
        }
      </>
    );
};

export default PostedComments;
