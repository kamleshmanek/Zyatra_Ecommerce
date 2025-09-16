import React from "react";
import { Modal, View, ActivityIndicator, StyleSheet } from "react-native";
import { useAppColors } from "../helper/useAppColors";

interface LoaderProps {
  visible: boolean;
  color?: string; // spinner color (defaults to theme primary)
}

const Loader: React.FC<LoaderProps> = ({ visible, color }) => {
  const Colors = useAppColors();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={[styles.overlay, { backgroundColor:Colors.White }]}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color={Colors.Black} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loaderBox: {
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
