import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector } from "react-redux";
import { DB_URL } from "./config.js";
import { uiActions } from "./store/ui";
import { useDispatch } from "react-redux";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartIsOpen = useSelector((state) => state.ui.cartIsOpen);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    async function fetchCart() {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Uploading cart data!",
        }),
      );

      const response = await fetch(DB_URL, {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart uploaded successfully",
        }),
      );
    }

    if (isInitial) {
      isInitial = false;
      return;
    }

    fetchCart().catch(() => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed!",
        }),
      );
    });
  }, [cart]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsOpen && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
