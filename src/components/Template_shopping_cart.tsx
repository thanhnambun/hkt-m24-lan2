import React from "react";
import { useEffect, useState } from "react";
import "./Style.css";
import "./bootstrap.min.css";
import ProductList from "./ProductList";
import Cart from "./Card";
import Modal from "./Modal";
import Alert from "react-bootstrap/Alert";
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  imgUrl: string;
  value: number;
}

export default function Template_shopping_cart() {
  const [addSuccess, setAddSuccess] = useState<boolean>(false);
  const [updateSuccess, setUpdateSucccess] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>(() => {
    const data = localStorage.getItem("products");
    return data ? JSON.parse(data) : [];
  });
  const [cart, setCart] = useState<Product[]>(() => {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  });
  const addToCart = (product: Product) => {
    setAddSuccess(true);
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      setProducts(
        products.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        })
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      setProducts([
        ...products,
        { ...product, quantity: product.quantity - 1 },
      ]);
    }
    setTimeout(() => {
      setAddSuccess(false);
    }, 1000);
  };
  const updateQuantity = (id: number, quantity: number) => {
    setUpdateSucccess(true);
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: quantity };
        }
        return item;
      })
    );
    setProducts(
      products.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - (quantity || 0) };
        } else {
          return { ...item };
        }
      })
    );
    setTimeout(() => {
      setUpdateSucccess(false);
    }, 1000);
  };
  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  useEffect(() => {
    cart.map((item) => {
      if (item.quantity < 1) {
        return (item.quantity = 1);
      }
    });
    products.map((item) => {
      if (item.quantity < 0) {
        return (item.quantity = 0);
      }
    });
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("cart", JSON.stringify(cart));
  });
  return (
    <div>
      <div className="container">
        <div className="page-header">
          <h1>Shopping Cart</h1>
        </div>
        <div className="row">
          <div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h1 className="panel-title">List Products</h1>
                </div>
                <div className="panel-body" id="list-product">
                  {addSuccess ? (
                    <Modal
                      addSuccess={addSuccess}
                      updateSuccess={updateSuccess}
                    />
                  ) : (
                    ""
                  )}
                  <ProductList products={products} addToCart={addToCart} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div className="panel panel-danger">
                <div className="panel-heading">
                  <h1 className="panel-title">Your Cart</h1>
                </div>
                <div className="panel-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th width="4%">STT</th>
                        <th>Name</th>
                        <th width="15%">Price</th>
                        <th width="4%">Quantity</th>
                        <th width="25%">Action</th>
                      </tr>
                    </thead>
                    <tbody id="my-cart-body">
                      <tr>
                        <th scope="row">1</th>
                        <td>Cake</td>
                        <td>10 USD</td>
                        <td>
                          <input
                            name="cart-item-quantity-1"
                            type="number"
                            defaultValue={15}
                          />
                        </td>
                        <td>
                          <a
                            className="label label-info update-cart-item"
                            data-product=""
                          >
                            Update
                          </a>
                          <a
                            className="label label-danger delete-cart-item"
                            data-product=""
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Hamburger</td>
                        <td>15 USD</td>
                        <td>
                          <input
                            name="cart-item-quantity-1"
                            type="number"
                            defaultValue={32}
                          />
                        </td>
                        <td>
                          <a
                            className="label label-info update-cart-item"
                            data-product=""
                          >
                            Update
                          </a>
                          <a
                            className="label label-danger delete-cart-item"
                            data-product=""
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot id="my-cart-footer">
                      <tr>
                        <td colSpan={4}>
                          There are <b>2</b> items in your shopping cart.
                        </td>
                        <td colSpan={2} className="total-price text-left">
                          630 USD
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div
                className="alert alert-success"
                role="alert"
                id="mnotification"
              >
                Add to cart successfully
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
