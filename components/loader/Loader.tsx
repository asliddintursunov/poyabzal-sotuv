import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export default function Loader() {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator
        style={styles.loader}
        animating={true}
        color={MD2Colors.blue500}
        size="large"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    height: "100%",
    backgroundColor: "black",
    opacity: 0.7,
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    zIndex: 2,
  },
});
