import React from "react";
type CartItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  imgUrl: string;
  value: number;
};

type Props = {
  cart: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
};

export default function Cart(props: Props) {
  const { cart } = props;
  const { updateQuantity } = props;
  const { removeFromCart } = props;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div>
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.price} USD</td>
            <td>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
                style={{ width: "60px" }}
              />
            </td>
            <td>
              <button  onClick={() => removeFromCart(item.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5}>Chưa có sản phẩm trong giở hàng</td>
        </tr>
      )}
    </div>
  );
}
