import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  FlatList,
  Animated,
  Dimensions,
  StyleSheet,
  ViewToken,
} from 'react-native';
import { Colors } from '../theme/Colors';

type CarouselProps<T> = {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => JSX.Element;
  itemWidth?: number; // width of each card. defaults to screen width
  height?: number; // carousel height
  gap?: number; // spacing between items
  autoplay?: boolean;
  autoplayInterval?: number; // ms
  loop?: boolean;
  showPagination?: boolean;
  onIndexChange?: (index: number) => void;

};

export type CarouselRef = {
  scrollToIndex: (index: number) => void;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function InnerCustomCarousel<T>(
  {
    data,
    renderItem,
    itemWidth = Math.round(SCREEN_WIDTH),
    height = 220,
    gap = 12,
    autoplay = false,
    autoplayInterval = 4000,
    loop = false,
    showPagination = true,
    onIndexChange
  }: CarouselProps<T>,
  ref: React.Ref<CarouselRef>
) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatRef = useRef<FlatList<T> | null>(null);
  const indexRef = useRef(0);
  const itemPlusGap = itemWidth + gap;

  // expose methods to parent
  useImperativeHandle(ref, () => ({
    scrollToIndex: (index: number) => {
      flatRef.current?.scrollToOffset({
        offset: index * itemPlusGap,
        animated: true,
      });
      indexRef.current = index;
    },
  }));

  // autoplay loop
  useEffect(() => {
    if (!autoplay || data.length <= 1) return;
    const id = setInterval(() => {
      let next = indexRef.current + 1;
      if (next >= data.length) {
        if (!loop) {
          clearInterval(id);
          return;
        }
        next = 0;
      }
      indexRef.current = next;
      flatRef.current?.scrollToOffset({
        offset: next * itemPlusGap,
        animated: true,
      });
    }, autoplayInterval);
    return () => clearInterval(id);
  }, [autoplay, autoplayInterval, data.length, loop, itemPlusGap]);

  // track current index
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems.length > 0) {
        const idx = viewableItems[0].index ?? 0;
        indexRef.current = idx;
         onIndexChange?.(idx);
      }
    }
  ).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  // animation event
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  );

  // snapping
  const snapToOffsets = Array.from({ length: data.length }).map(
    (_, i) => i * itemPlusGap
  );

  return (
    <View style={{ height }}>
      <Animated.FlatList
        ref={flatRef}
        data={data}
        keyExtractor={(_, i) => String(i)}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToOffsets={snapToOffsets}
        decelerationRate="fast"
        snapToAlignment="start"
        contentContainerStyle={{
          paddingHorizontal: (SCREEN_WIDTH - itemWidth) / 2,
        }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item, index }) => (
          <View style={{ width: itemWidth, marginRight: gap }}>
            {renderItem({ item, index })}
          </View>
        )}
      />

      {showPagination && (
        <View style={styles.paginationContainer} pointerEvents="none">
          {data.map((_, i) => {
            const inputRange = [
              (i - 1) * itemPlusGap,
              i * itemPlusGap,
              (i + 1) * itemPlusGap,
            ];

            const dotScale = scrollX.interpolate({
              inputRange,
              outputRange: [0.7, 1.2, 0.7],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={`dot-${i}`}
                style={[
                  styles.dot,
                  { transform: [{ scale: dotScale }], opacity },
                ]}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

const CustomCarousel = forwardRef(InnerCustomCarousel) as <T>(
  p: CarouselProps<T> & { ref?: React.Ref<CarouselRef> }
) => React.ReactElement;

const styles = StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.Black,
    marginHorizontal: 6,
  },
});

export default CustomCarousel;
