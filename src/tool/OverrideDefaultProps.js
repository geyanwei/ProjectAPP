import React, { Component } from "react";
import { Text, TextInput, RefreshControl } from 'react-native';

Text.defaultProps = {
    style: [{ fontFamily: YITU.fontName_regular }],
    allowFontScaling: false
}; // This is used to globally DISABLE font scaling
TextInput.defaultProps = {
    style: [{ fontFamily:YITU.fontName_medium }],
    allowFontScaling: false
}; // This is used to globally DISABLE font scaling

RefreshControl.defaultProps = {
    colors:["#ccc"],
    tintColor: "#ccc"
}
