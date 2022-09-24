import { data } from "@shopify/app-bridge/actions/Modal";
import React from "react";
import "./SoldProducts.css";

const SoldProducts = () => {
  function createData(title, stock, image) {
    return { title, stock, image };
  }
  const products = [
    createData(
      "Air Pods",
      85,
      "https://lh3.googleusercontent.com/uY0DBQik6UA-8r3u940KST-4No0y-XK9SdLkA8cirg9XMg5hw43uvY04aMt_suipYETIU-g7GYZ12T1nUvefZBSpugr9xlvkvVb9L6p5EibJwYIX2A"
    ),
    createData(
      "Air Pods-1",
      85,
      "https://lh3.googleusercontent.com/uY0DBQik6UA-8r3u940KST-4No0y-XK9SdLkA8cirg9XMg5hw43uvY04aMt_suipYETIU-g7GYZ12T1nUvefZBSpugr9xlvkvVb9L6p5EibJwYIX2A"
    ),
    createData(
      "Air Pods-2",
      85,
      "https://lh3.googleusercontent.com/uY0DBQik6UA-8r3u940KST-4No0y-XK9SdLkA8cirg9XMg5hw43uvY04aMt_suipYETIU-g7GYZ12T1nUvefZBSpugr9xlvkvVb9L6p5EibJwYIX2A"
    ),
    createData(
      "Air Pods-3",
      85,
      "https://lh3.googleusercontent.com/uY0DBQik6UA-8r3u940KST-4No0y-XK9SdLkA8cirg9XMg5hw43uvY04aMt_suipYETIU-g7GYZ12T1nUvefZBSpugr9xlvkvVb9L6p5EibJwYIX2A"
    ),
  ];

  return (
    <main className="soldProducts">
      <header className="soldProducts__heading">
        <h4 className="soldProducts__heading__left">Top 10 sold products</h4>
        <h4 className="soldProducts__heading__right">
          Most units sold in this period
        </h4>
      </header>
      {products.map((product, index) => {
        return (
          <section className="soldProducts__body" key={product.title}>
            {index % 2 == 0 && (
              <section className="soldProducts__body__boxLeft">
                <div className="soldProducts__body__boxLeft__product">
                  <div className="soldProducts__body__boxLeft__product__description">
                    <span>{product.title}</span>
                    <span>Units Sold</span>
                    <span>{product.stock}</span>
                  </div>
                  <div className="soldProducts__body__boxLeft__product__image">
                    <img src={product.image} alt="" />
                  </div>
                </div>
              </section>
            )}
            <section className="soldProducts__body__boxRight">
              <div className="soldProducts__body__boxRight__product">
                <div className="soldProducts__body__boxRight__product__description">
                  <span>{product.title}</span>
                  <span>Units Sold</span>
                  <span>{product.stock}</span>
                </div>
                <div className="soldProducts__body__boxRight__product__image">
                  <img src={product.image} alt="" />
                </div>
              </div>
            </section>
          </section>
        );
      })}
    </main>
  );
};

export default SoldProducts;
