/** @format */

import "./src/theme.js"
import HttpTool from "./src/http/HttpTool";
import Config from "./src/Config";

import {AppRegistry} from 'react-native';
import App from './App';
import "./libconfig";
import Orientation from "react-native-orientation";

HttpTool.setEncrypt(Config.publicKey);
AppRegistry.registerComponent("yitu8_app_client1", () => App);

Orientation.lockToPortrait();
