// src/component/BrandCarousel.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
} from "react-native";
import { Colors } from "../theme/Colors";

interface BrandCarouselProps {
  data: any[];
  interval?: number; // autoplay interval
}

const BrandCarousel: React.FC<BrandCarouselProps> = ({ data, interval = 2500 }) => {
  const brandListRef = useRef<FlatList>(null);
  const [brandIndex, setBrandIndex] = useState(0);

  useEffect(() => {
    if (!data?.length) return;

    const timer = setInterval(() => {
      let nextIndex = brandIndex + 1;

      if (nextIndex >= data.length) {
        nextIndex = 0; // loop back
      }

      setBrandIndex(nextIndex);

      brandListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, interval);

    return () => clearInterval(timer);
  }, [brandIndex, data]);

  // Prevent "out of range" crash
  const getItemLayout = (_: any, index: number) => ({
    length: 114,
    offset: 114 * index,
    index,
  });

  return (
    <View style={{ marginHorizontal: 14, marginTop: 10, marginBottom: 20 }}>
      <FlatList
        ref={brandListRef}
        data={data}
        horizontal
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
        renderItem={({ item }) => (
          <View
            style={styles.brandItem}
          >
            <Image
              source={{ uri: item.logo }}
              style={styles.brandImage}
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
};

export default BrandCarousel;

const styles = StyleSheet.create({
  brandItem: {
    width: 100,
    height: 100,
    borderColor: Colors.White,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  brandImage: {
    width: "80%",
    height: "80%",
  },
});
