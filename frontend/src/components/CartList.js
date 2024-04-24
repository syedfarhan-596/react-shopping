/* eslint-disable jsx-a11y/alt-text */
import { useContext, useEffect, useState } from "react";
import "../App.css";
import { BiTrash } from "react-icons/bi";
import { GlobalContext } from "../context/Context";
import Layout from "./Layout/index.js";
function CartList() {
  const { cart } = useContext(GlobalContext);
  const { removeFromCart } = useContext(GlobalContext);
  const [CART, setCART] = useState([]);

  useEffect(() => {
    setCART(cart);
  }, [cart]);

  return (
    <Layout>
      <div className="flex flex-wrap items-center justify-center mx-auto max-w-6xl mt-10 mr-8  relative">
        {CART?.map((cartItem, cartindex) => {
          return (
            <div className="mb-4 flex gap-8">
              <img
                className="w-1/4"
                alt="Cart Items"
                src={cartItem.url}
                width={40}
              />
              <div>
                <span className="text-lg font-semibold"> {cartItem.name} </span>
                <div className="flex items-center  gap-2 mt-4">
                  <button
                    className="bg-blue-500 flex items-center justify-center rounded-full w-5 h-5 text-white"
                    onClick={() => {
                      const _CART = CART.map((item, index) => {
                        return cartindex === index
                          ? {
                              ...item,
                              quantity:
                                item.quantity > 0 ? item.quantity - 1 : 0,
                            }
                          : item;
                      });
                      setCART(_CART);
                    }}
                  >
                    -
                  </button>
                  <span> {cartItem.quantity} </span>
                  <button
                    className="bg-blue-500 flex items-center justify-center rounded-full w-5 h-5 text-white"
                    onClick={() => {
                      const _CART = CART.map((item, index) => {
                        return cartindex === index
                          ? { ...item, quantity: item.quantity + 1 }
                          : item;
                      });
                      setCART(_CART);
                    }}
                  >
                    +
                  </button>{" "}
                  =<span> $ {cartItem.price * cartItem.quantity} </span>
                </div>
                <button
                  className="flex items-center justify-center gap-2 bg-red-500 text-white mt-4 rounded-lg px-4 py-2 cursor-pointer"
                  onClick={() => removeFromCart(cartItem.id)}
                >
                  <p>Remove Item</p>
                  <span>
                    <BiTrash />
                  </span>
                </button>
              </div>
            </div>
          );
        })}

        <p className="flex gap-2 justify-center items-center bg-gray-300 px-8 py-4 absolute right-20 top-0">
          <span className="font-bold text-lg">Total Amount:</span>
          {CART.map((item) => item.price * item.quantity).reduce(
            (total, value) => total + value,
            0
          )}
        </p>
      </div>
    </Layout>
  );
}

export default CartList;
