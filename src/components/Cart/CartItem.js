import classes from "./CartItem.module.css";
import { cartActions } from "../../store/cart";
import { useDispatch } from "react-redux";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { id, title, quantity, totalPrice, price } = props.item;

  function handleIncreaseQty() {
    dispatch(cartActions.addItem(props.item));
  }

  function handleDecreaseQty() {
    dispatch(cartActions.removeItem(id));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleDecreaseQty}>-</button>
          <button onClick={handleIncreaseQty}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
