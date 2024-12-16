import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const onAddToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      photo: props.photo,
      amount: amount,
      name: props.name,
      price: props.price,
    });
  };

  const price = `$${Number(props.price).toFixed(2)}`;
  return (
    <li className={classes.meal}>
      <img src={props.photo} alt={props.name} />
      <div className={classes.mealContent}>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={onAddToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
