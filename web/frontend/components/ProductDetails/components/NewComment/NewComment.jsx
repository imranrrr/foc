import React, {useState} from "react";
import "./NewComment.css";
import { Button } from "@shopify/polaris";
import { useAuthenticatedFetch } from "../../../../hooks";

const NewComment = ({productId}) => {
  const [comment, setComment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const emptyToastProps = { content: null };
  const [toastProps, setToastProps] = useState(emptyToastProps);

  const fetch = useAuthenticatedFetch();

  const toastMarkup = toastProps.content && !setIsLoading && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const onSubmit = async ()=>{
    setIsLoading(true);
    const parsedBody = { description: comment, date: new Date() };
    const method = "POST";
    const  message = comment+"^"+productId

    await fetch(`/api/comment/${message}`, {
      method,
      body: JSON.stringify(parsedBody),
      headers: { "Content-Type": "application/json" },
    });
    setIsLoading(false);
    setComment(null)
  }

  return (
    <>
      {toastMarkup}
      <main className="comments__newComment">
        <section className="comments__newComment__addNew">
          <textarea placeholder="Add your comments here..." rows="8" onChange={(e) => setComment(e.target.value)} value={comment}/>
          <div className="comments__newComment__addNew__button">
            <Button loading={isLoading} onClick={onSubmit}>Submit</Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default NewComment;
