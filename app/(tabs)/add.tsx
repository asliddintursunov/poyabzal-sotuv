import { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";

export default function AddScreen() {
  const [shoeName, setShoeName] = useState("");
  const [shoeSize, setShoeSize] = useState("");
  const [shoeColor, setShoeColor] = useState("");
  const [shoeSoldPrice, setShoeSoldPrice] = useState("");
  const [shoeGetPrice, setShoeGetPrice] = useState("");

  return (
    <View style={styles.main}>
      <TextInput
        mode="outlined"
        textColor="#333"
        style={{ ...styles.textInput, width: Dimensions.get("screen").width - 12}}
        label="Poyabzal nomi"
        value={shoeName}
        onChangeText={(text) => setShoeName(text)}
        right={<TextInput.Affix text={`${shoeName.length}/20`} />}
      />
      <View style={styles.viewStyle}>
        <TextInput
          mode="outlined"
          textColor="#333"
          style={styles.textInput}
          label="O'lcham"
          value={shoeSize}
          onChangeText={(text) => setShoeSize(text)}
          right={<TextInput.Affix />}
        />
        <TextInput
          mode="outlined"
          textColor="#333"
          style={styles.textInput}
          label="Rang"
          value={shoeColor}
          onChangeText={(text) => setShoeColor(text)}
          right={<TextInput.Affix text={`${shoeColor.length}/20`} />}
        />
      </View>
      <View style={styles.viewStyle}>
        <TextInput
          keyboardType="numeric"
          mode="outlined"
          textColor="#333"
          style={styles.textInput}
          label="Sotilish narxi"
          value={shoeSoldPrice.trim()}
          onChangeText={(text) => setShoeSoldPrice(text)}
          right={<TextInput.Affix textStyle={{ color: "#333" }} text="so'm" />}
        />
        <TextInput
          keyboardType="numeric"
          mode="outlined"
          textColor="#333"
          style={styles.textInput}
          label="Chiqish narxi"
          value={shoeGetPrice.trim()}
          onChangeText={(text) => setShoeGetPrice(text)}
          right={<TextInput.Affix textStyle={{ color: "#333" }} text="so'm" />}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.buttonStyle} mode="contained">
          Poyabzal sotish
        </Button>
        <Button style={styles.buttonStyle} mode="contained-tonal">
          Bekor qilish
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  textInput: {
    width: Dimensions.get("screen").width / 2 - 12,
    backgroundColor: "#fff",
    color: "#000",
  },
  viewStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: Dimensions.get("screen").width - 12,
  },
  buttonStyle: {
    paddingVertical: 5,
    borderRadius: 4,
  },
});
