import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import App from "App";
import { AppRegistry } from "react-native";
import { expo as appName } from "./app.json";

enableScreens();

AppRegistry.registerComponent(appName.name, () => App);
