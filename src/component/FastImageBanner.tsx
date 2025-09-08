import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { scale, verticalScale } from '../theme/dimensions';
import { Colors } from '../theme/Colors';

interface FastImageBannerProps {
  uri: string;
  height?: number;
  border?: boolean;
  resizeMode?: keyof typeof FastImage.resizeMode;
}

const FastImageBanner: React.FC<FastImageBannerProps> = ({
  uri,
  height = verticalScale(250),
  border = true,
  resizeMode = FastImage.resizeMode.stretch,
}) => {
  return (
    <FastImage
      style={[styles.image, { height }]}
      source={{
        uri,
        priority: FastImage.priority.normal,
      }}
      resizeMode={resizeMode}
    />
  );
};

export default FastImageBanner;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    borderWidth: scale(1),
    borderColor: Colors.LightGray,
    overflow: 'hidden',
  },
});
