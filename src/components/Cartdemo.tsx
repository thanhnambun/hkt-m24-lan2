import { useState, useEffect } from "react";
// import { CartItem, Product } from '../components/types';

const useCart = (
  updateProductStock: (product: Product, quantity: number) => void
) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "warning" | "error";
  } | null>(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    if (product.quantity <= 0) {
      setNotification({ message: "Product out of stock", type: "error" });
      return;
    }

    const existingProduct = cart.find((item) => item.product.id === product.id);
    if (existingProduct) {
      if (existingProduct.quantity === 0) {
        setNotification({
          message: "Cannot add more than available stock",
          type: "error",
        });
        return;
      }
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    updateProductStock(product, -1);
    setNotification({ message: "Added to cart successfully", type: "success" });
  };

  const updateQuantity = (product: Product, quantity: number) => {
    if (quantity > product.quantity) {
      setNotification({
        message: "Cannot add more than available stock",
        type: "error",
      });
      return;
    }

    const existingProduct = cart.find((item) => item.product.id === product.id);
    if (existingProduct) {
      const quantityChange = quantity - existingProduct.quantity;
      setCart(
        cart.map((item) =>
          item.product.id === product.id ? { ...item, quantity } : item
        )
      );
      updateProductStock(product, -quantityChange); // Update the product quantity in the product list
      setNotification({ message: "Updated successfully", type: "warning" });
    }
  };

  const removeFromCart = (product: Product) => {
    const existingProduct = cart.find((item) => item.product.id === product.id);
    if (existingProduct) {
      updateProductStock(product, existingProduct.quantity); // Increase the product quantity when removing from the cart
    }
    setCart(cart.filter((item) => item.product.id !== product.id));
    setNotification({ message: "Deleted successfully", type: "error" });
  };

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    notification,
    setNotification,
  };
};

export default useCart;
import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}
export default function ProductList({ products, addToCart }: ProductListProps) {
  const productList = [
    "public/bread.jpg",
    "public/Cake.jpg",
    "public/Pizza.jpg",
    "public/Hamburger.jpg",
  ];

  const allProducts: Product[] = [
    {
      id: 1,
      name: "Bread",
      image: productList[0],
      quantity: 10,
      price: 20.99,
    },
    {
      id: 2,
      name: "Cake",
      image: productList[1],
      quantity: 20,
      price: 30.99,
    },
    {
      id: 3,
      name: "Pizza",
      image: productList[2],
      quantity: 30,
      price: 15.99,
    },
    {
      id: 4,
      name: "Hamburger",
      image: productList[3],
      quantity: 40,
      price: 25.99,
    },
  ];

  const [product, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem("allProducts");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  return (
    <div>
      <h1>Product List</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <div className="media product">
              <div className="media-left">
                <a href="#">
                  <img
                    className="media-object"
                    src={product.image}
                    alt={product.name}
                  />
                </a>
              </div>
              <div className="media-body">
                <h4 className="media-heading">{product.name}</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                  dicta asperiores veniam repellat unde debitis quisquam magnam
                  magni ut deleniti!
                </p>
                <input
                  name={`quantity-product-${product.id}`}
                  defaultValue={product.quantity}
                />
                <button onClick={() => addToCart(product)}>
                  {product.name}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
