import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors } from '../theme/Colors';
import { scale, verticalScale } from '../theme/dimensions';

interface Product {
  id: string | number;
  thumbnail: string;
  [key: string]: any; // flexible for extra fields
}

interface ProductRowProps {
  products: Product[];
  onPress?: (product: Product) => void;
  itemWidth?: string | number;
  itemHeight?: number;
  borderRadius?: number;
  resizeMode?: keyof typeof FastImage.resizeMode;
}

const ProductRow: React.FC<ProductRowProps> = ({
  products,
  onPress,
  itemWidth = '48%',
  itemHeight = verticalScale(200),
  borderRadius = scale(8),
  resizeMode = FastImage.resizeMode.cover,
}) => {
  return (
    <View
      style={[
        styles.row,
        { justifyContent: products.length === 1 ? 'center' : 'space-between' },
      ]}
    >
      {products.map(product => (
        <TouchableOpacity
          key={product.id}
          style={[
            styles.flatListItem,
            { width: itemWidth, borderRadius: borderRadius },
          ]}
          activeOpacity={0.8}
          onPress={() => onPress?.(product)}
        >
          <FastImage
            style={[styles.flatListImage, { height: itemHeight }]}
            source={{
              uri: product.thumbnail,
              priority: FastImage.priority.normal,
            }}
            resizeMode={resizeMode}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProductRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: verticalScale(10),
  },
  flatListItem: {
    borderWidth: scale(1),
    borderColor: Colors.LightGray,
    overflow: 'hidden',
  },
  flatListImage: {
    width: '100%',
  },
});
