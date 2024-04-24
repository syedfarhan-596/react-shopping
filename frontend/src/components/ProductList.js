/* eslint-disable jsx-a11y/alt-text */
import { useContext } from "react";
import "../App.css";
import Layout from "./Layout/index";
import { GlobalContext } from "../context/Context";
function ProductList() {
  const { product } = useContext(GlobalContext);
  const { addToCart } = useContext(GlobalContext);
  const { cart } = useContext(GlobalContext);
  console.log(cart);
  return (
    <Layout>
      <div className=" flex flex-wrap gap-1">
        {product.map((productItem, productIndex) => {
          return (
            <div style={{ width: "33%" }} className="">
              <div className="product-item border-1 border-slate-400">
                <img src={productItem.url} width="100%" />
                <h1 className="text-xl font-semibold mt-2">
                  {productItem.name} | {productItem.category}{" "}
                </h1>
                <p className="text-slate-500 mt-1">{productItem.seller} </p>
                <div className="flex justify-between items-center">
                  <p className="text-slate-900 font-semibold text-lg">
                    ${productItem.price}{" "}
                  </p>
                  <button
                    onClick={() => addToCart(productItem)}
                    className="bg-orange-400 px-4 py-2 rounded-md text-white mt-2 hover:bg-orange-500"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default ProductList;
