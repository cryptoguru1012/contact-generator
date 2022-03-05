import { configureStore } from "@reduxjs/toolkit";
import notificationsSlice from "./features/notifications/notificationsSlice";
import userSlice from "./features/user/userSlice";

export default configureStore({
  reducer: {
    notifications: notificationsSlice,
    user: userSlice,
  },
});
