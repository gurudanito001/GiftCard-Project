import { configureStore } from "@reduxjs/toolkit";
import notificationMessagesReducer from './slices/notificationSlice';


export default configureStore({
  reducer: {
    notificationMessages: notificationMessagesReducer,
  },
})