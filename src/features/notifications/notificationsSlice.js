import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  notifications: [],
};

const overviewSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notify(state, action) {
      const { payload } = action;
      const notification = {
        message: payload,
        options: {
          key: nanoid(9),
        },
      };
      state.notifications.push(notification);
    },
    notifyError(state, action) {
      const { payload } = action;
      const notification = {
        message: payload,
        options: {
          key: nanoid(9),
          variant: "error",
        },
      };
      state.notifications.push(notification);
    },
    notifyInfo(state, action) {
      const { payload } = action;
      const notification = {
        message: payload,
        options: {
          key: nanoid(9),
          variant: "info",
        },
      };
      state.notifications.push(notification);
    },
    notifySuccess(state, action) {
      const { payload } = action;
      const notification = {
        message: payload,
        options: {
          key: nanoid(9),
          variant: "success",
        },
      };
      state.notifications.push(notification);
    },
    notifyWarning(state, action) {
      const { payload } = action;
      const notification = {
        message: payload,
        options: {
          key: nanoid(9),
          variant: "warning",
        },
      };
      state.notifications.push(notification);
    },
    enqueueAlert(state, action) {
      const { payload } = action;
      payload.options = {
        key: nanoid(9),
        variant: payload.variant,
      };
      state.notifications.push(payload);
    },
    removeAlert(state, action) {
      state.notifications = state.notifications.filter(
        (notification) => notification.options.key !== action.payload
      );
    },
  },
});

export const {
  notify,
  notifyError,
  notifyInfo,
  notifySuccess,
  notifyWarning,
  enqueueAlert,
  removeAlert,
} = overviewSlice.actions;

export default overviewSlice.reducer;
