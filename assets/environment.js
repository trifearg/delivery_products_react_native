import {Platform} from "react-native";

export const API_URL = Platform.OS === 'ios' ? 'http://localhost:3000/' : "http://192.168.0.101:3000/";
export const isIOS = Platform.OS === 'ios';