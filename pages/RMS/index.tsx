import React from 'react';
import {WebView} from 'react-native-webview';

const RMSWebView: React.FC = () => {
  return <WebView source={{uri: 'http://192.168.20.86:8080/'}} />;
};

export default RMSWebView;
