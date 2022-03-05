import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { removeAlert } from "../features/notifications/notificationsSlice";
import { useDispatch, useSelector } from "react-redux";

let displayed = [];

const storeDisplayed = (id) => {
  displayed = [...displayed, id];
};

const removeDisplayed = (id) => {
  displayed = [...displayed.filter((key) => id !== key)];
};

export const useNotifications = () => {
  const notifications = useSelector((state) => state.notifications.notifications);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    notifications.forEach(({ message, options = {}, dismissed = false }) => {
      if (displayed.includes(options.key)) return;

      enqueueSnackbar(message, {
        message,
        ...options,
        onExited: (event, key) => {
          dispatch(removeAlert(key));
          removeDisplayed(key);
        },
      });

      storeDisplayed(options.key);
    });
  }, [notifications]);
};
