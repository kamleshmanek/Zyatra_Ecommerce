import { Dimensions, Platform, PixelRatio } from 'react-native';

// Base guideline sizes are based on a standard ~375x812 device (iPhone 11/12/13)
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 900;

export const vw = (percentage: number) => (SCREEN_WIDTH * percentage) / 100;
export const vh = (percentage: number) => (SCREEN_HEIGHT * percentage) / 100;

export const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

// Font scaling helper that respects system font scaling
export const ms = (size: number, factor = 0.5) => {
  const newSize = moderateScale(size, factor);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const device = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
};
