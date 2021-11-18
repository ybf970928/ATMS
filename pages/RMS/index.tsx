import React from 'react';
import {WebView} from 'react-native-webview';

const RMSWebView: React.FC = () => {
  return <WebView source={{uri: 'http://10.100.101.86:8080/'}} />;
};

export default RMSWebView;
