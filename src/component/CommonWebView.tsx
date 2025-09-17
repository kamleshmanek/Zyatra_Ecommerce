import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { WebView, WebViewProps } from 'react-native-webview';

interface CommonWebViewProps extends WebViewProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const CommonWebView: React.FC<CommonWebViewProps> = ({
  containerStyle,
  source,
  ...restProps
}) => {
  return (
    <WebView
      source={source}
      style={[{ flex: 1 }, containerStyle]}
      {...restProps}
    />
  );
};

export default CommonWebView;
