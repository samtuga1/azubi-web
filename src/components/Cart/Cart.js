import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [ordering, setOrdering] = useState(false);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  function onOrderClickHandler() {
    setIsCheckedOut(true);
  }

  const onSubmitHandler = async (userData) => {
    setOrdering(true);
    await fetch("http://localhost:3001/api/v1/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        cartCtx.items.map((item) => {
          return {
            productId: Number(item.id),
            quantity: Number(item.amount),
          };
        })
      ),
    });

    setOrdering(false);
    cartCtx.clearItems();
    props.onClose();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onClose} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button
          className={classes.button}
          onClick={ordering ? () => {} : onOrderClickHandler}
        >
          {ordering ? "Ordering" : "Order"}
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckedOut && (
        <Checkout onConfirm={onSubmitHandler} onCancel={props.onClose} />
      )}
      {!isCheckedOut && modalActions}
    </Modal>
  );
};

export default Cart;
