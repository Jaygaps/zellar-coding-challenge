import React, { useEffect, useState } from "react";
import { Products } from "./utils/products";

import "./App.scss";
import { fetchProducts } from "./utils/api";

function App() {
  const [products, setProducts] = useState({});
  const [gasValue, setGasValue] = useState(0);
  const [searchedProduct, setSearchedProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    fetchProducts(Products).then(response => setProducts(response.products));
  }, []);

  function handleGasValue(e) {
    setGasValue(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setSearchedProduct(true);
  }

  function calculateTotalCost(rate, dailyCharge) {
    const gasRate = rate * gasValue;
    const dayCharge = dailyCharge * 365;
    const totalCost = gasRate + dayCharge;
    return `$${(Math.round(totalCost * 100) / 100).toFixed(2)}`;
  }

  return (
    <div className="App">
      <div className="searchwrapper">
        <form
          className="searchwrapper__container"
          onSubmit={e => handleFormSubmit(e)}
        >
          <p className="searchwrapper__container--text">
            Total gas consumption
          </p>
          <input
            type="number"
            className="searchwrapper__container--input"
            onChange={e => handleGasValue(e)}
          />
          <input
            type="submit"
            value="Search products"
            className="searchwrapper__container--button"
          />
        </form>
      </div>
      {searchedProduct && (
        <div className="products">
          <div className="products__header">
            <div className="products__header--title">Supplier</div>
            <div className="products__header--title">Annual Cost</div>
            <div className="products__header--title">Contract Length</div>
          </div>
          {products.map(product => {
            return (
              <div key={product.id} className="products__body">
                <div className="product__bodywrapper">
                  <div className="product__bodywrapper--text">
                    {product.supplier}
                  </div>
                  <div className="product__bodywrapper--text">
                    {calculateTotalCost(
                      product.rate,
                      product.dailystandingcharge
                    )}
                  </div>
                  <div className="product__bodywrapper--text">
                    {`${product.contractlenght} months`}
                    <button
                      className="product__bodywrapper--button"
                      onClick={() => setSelectedProduct(product)}
                    >
                      More info
                    </button>
                  </div>
                </div>
                <div className="product__moreinfo">
                  {selectedProduct && selectedProduct.id == product.id && (
                    <>
                      <div className="product__moreinfo--text">{`Pricing Type: ${selectedProduct.name}`}</div>
                      <div className="product__moreinfo--text">{`Rate: ${selectedProduct.rate}`}</div>
                      <div className="product__moreinfo--text">{`Daily Standing Charge: ${selectedProduct.dailystandingcharge}`}</div>
                      <div className="product__moreinfo--text">{`Status: ${selectedProduct.status}`}</div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
