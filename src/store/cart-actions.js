import { uiActions } from "./ui";
import { cartActions } from "./cart";
import { DB_URL } from "../config";

export function fetchCartData() {
  return async (dispatch) => {
    try {
      const response = await fetch(DB_URL);

      if (!response.ok) {
        throw new Error("Could not load cart data!");
      }

      const data = await response.json();
      dispatch(
        cartActions.replaceCart({
          items: data.items || [],
          totalQuantity: data.totalQuantity,
        }),
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Could not load cart data!",
        }),
      );
    }
  };
}

export function sendCartData(cart) {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Uploading cart data!",
      }),
    );

    const sendRequest = async () => {
      const response = await fetch(DB_URL, {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart uploaded successfully",
        }),
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed!",
        }),
      );
    }
  };
}
