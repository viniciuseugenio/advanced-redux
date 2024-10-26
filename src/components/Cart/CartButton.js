import classes from "./CartButton.module.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui.js";

const CartButton = (props) => {
  const dispatch = useDispatch();

  function handleOpenCart() {
    dispatch(uiActions.toggleCart());
  }

  return (
    <button className={classes.button} onClick={handleOpenCart}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
