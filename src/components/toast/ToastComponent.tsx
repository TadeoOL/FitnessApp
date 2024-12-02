import Toast from "react-native-toast-message";
import { toastConfig } from "./config";

export const ToastComponent = () => {
  return (
    <Toast
      visibilityTime={3000}
      autoHide
      position="bottom"
      config={toastConfig}
    />
  );
};
