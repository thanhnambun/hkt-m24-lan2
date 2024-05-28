// ProductList.tsx
import { useState } from "react";
import ProductItem from "./Product/ProductItem";
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

type Props = {
  products: Product[];
  addToCart: (product: Product) => void;
};


export default function ProductList(props: Props) {
  // const allProducts: Product[] = [
  //   {
  //     id: 1,
  //     name: "Bread",
  //     image: "public/bread.jpg",
  //     quantity: 10,
  //     price: 20.99,
  //   },
  //   {
  //     id: 2,
  //     name: "Cake",
  //     image: "public/Cake.jpg",
  //     quantity: 20,
  //     price: 30.99,
  //   },
  //   {
  //     id: 3,
  //     name: "Pizza",
  //     image: "public/Pizza.jpg",
  //     quantity: 30,
  //     price: 15.99,
  //   },
  //   {
  //     id: 4,
  //     name: "Hamburger",
  //     image: "public/Hamburger.jpg",
  //     quantity: 40,
  //     price: 25.99,
  //   },
  // ];
  // localStorage.setItem("allProducts", JSON.stringify(allProducts));
  // const [product, setProducts] = useState<Product[]>(() => {
  //   const savedProducts = localStorage.getItem("allProducts");
  //   return savedProducts ? JSON.parse(savedProducts) : [];
  // });
  const { products } = props;
  const { addToCart } = props;
  // useEffect(() => {
  //   localStorage.setItem("products", JSON.stringify(products));
  // }, products);
  return (
    <div className="flex gap-[10px] flex-wrap">
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
  );
}