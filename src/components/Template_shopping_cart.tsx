import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";
import "./bootstrap.min.css";
import "./Style.css";
type Product = {
  id: number;
  img: string;
  name: string;
  detail: string;
  price: number;
  quantity: number;
};

type CartProduct = {
  id: number;
  idProduct: number;
  name: string;
  price: number;
  quantity: number;
  quantityChange: number;
};

export default function ShoppingCart() {
  const productListFix: Product[] = [
    {
      id: 1,
      img: "public/bread.jpg",
      name: "Pizza",
      detail:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
      price: 30,
      quantity: 10,
    },
    {
      id: 2,
      img: "public/Hamburger.jpg",
      name: "Hamburger",
      detail:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
      price: 15,
      quantity: 10,
    },
    {
      id: 3,
      img: "public/Cake.jpg",
      name: "Cake",
      detail:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
      price: 20,
      quantity: 5,
    },
    {
      id: 4,
      img: "public/Bread.jpg",
      name: "Bread",
      detail:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
      price: 10,
      quantity: 20,
    },
  ];
  useEffect(() => {
    localStorage.setItem("productList", JSON.stringify(productListFix));
  }, []);

  const [productList, setproductList] = useState<Product[]>(productListFix);

  const [cartLocal, setCartLocal] = useState<CartProduct[]>(() => {
    let cartLocal = localStorage.getItem("cart");
    return cartLocal ? JSON.parse(cartLocal) : [];
  });
  const [activeProduct, setActiveProduct] = useState<boolean>(false);
  const [activeDelete, setActiveDelete] = useState<boolean>(false);
  const [activeUpdate, setActiveUpdate] = useState<boolean>(false);
  const clearNotification = () => {
    setActiveProduct(false);
    setActiveDelete(false);
    setActiveUpdate(false);
  };
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const addProduct = (id: number) => {
    const productChange = productList.find((item) => item.id === id);
    if (productChange) {
      clearNotification();
      let productInCart = cartLocal.find((product) => product.idProduct === id);
      if (productInCart) {
        let newCart = cartLocal.map((product) =>
          product.idProduct === id
            ? {
                ...product,
                quantity: product.quantity + 1,
                quantityChange: product.quantity + 1,
              }
            : product
        );
        setCartLocal(newCart);
        setActiveProduct(true);
      } else {
        let newCart = [
          ...cartLocal,
          {
            id: Math.floor(Math.random() * 100000000),
            idProduct: productChange.id,
            name: productChange.name,
            price: productChange.price,
            quantity: 1,
            quantityChange: 1,
          },
        ];
        setCartLocal(newCart);
        setActiveProduct(true);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartLocal));

    const newTotalPrice = cartLocal.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cartLocal]);
  const deleteItem = (id: number) => {
    clearNotification();
    let newCart = cartLocal.filter((product) => product.id !== id);
    setCartLocal(newCart);
    setActiveDelete(true);
  };
  const handleQuantity = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    clearNotification();
    let value = +e.target.value;
    let newCart = cartLocal.map((product) =>
      product.id === id ? { ...product, quantityChange: value } : product
    );
    setCartLocal(newCart);
  };
  const update = (id: number) => {
    clearNotification();
    let newCart = cartLocal.map((product) =>
      product.id === id
        ? { ...product, quantity: product.quantityChange }
        : product
    );
    setCartLocal(newCart);
    setActiveUpdate(true);
  };
  return (
    <>
      <div className="container">
        <div className="page-header">
          <h1>Shopping Cart</h1>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">List Products</h1>
              </div>
              <div className="panel-body" id="list-product">
                {productList.map((product) => (
                  <ProductList
                    key={product.id}
                    product={product}
                    addProduct={addProduct}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div className="panel panel-danger">
              <div className="panel-heading">
                <h1 className="panel-title">Your Cart</h1>
              </div>
              <div className="panel-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ width: "4%" }}>STT</th>
                      <th>Name</th>
                      <th style={{ width: "15%" }}>Price</th>
                      <th style={{ width: "4%" }}>Quantity</th>
                      <th style={{ width: "25%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody id="my-cart-body">
                    {cartLocal.map((product, index) => (
                      <Cart
                        key={product.id}
                        product={product}
                        index={index}
                        deleteItem={deleteItem}
                        update={update}
                        handleQuantityChange={handleQuantity}
                      />
                    ))}
                  </tbody>
                  <tfoot id="my-cart-footer">
                    <tr>
                      <td colSpan={4}>
                        There are <b>{cartLocal.length}</b> items in your
                        shopping cart.
                      </td>
                      <td colSpan={2} className="total-price text-left">
                        {totalPrice} USD
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            {cartLocal.length === 0 ? (
              <div
                className="alert alert-success"
                role="alert"
                id="mnotification"
              >
                There is no product in your cart !
              </div>
            ) : (
              ""
            )}
            {activeProduct && (
              <div
                className="alert alert-success"
                role="alert"
                id="mnotification"
              >
                Add to cart successfully
              </div>
            )}
            {activeDelete && (
              <div
                className="alert alert-danger"
                role="alert"
                id="mnotification"
              >
                Delete product successfully!
              </div>
            )}
            {activeUpdate && (
              <div
                className="alert alert-warning"
                role="alert"
                id="mnotification"
              >
                Update product successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
