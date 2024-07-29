import { Dispatch, SetStateAction } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
  from: "edit" | "add";
  shoeName: string;
  shoeSize: string;
  shoeColor: string;
  shoeSoldPrice: string;
  shoeGetPrice: string;
  setShoeName: Dispatch<SetStateAction<string>>;
  setShoeSize: Dispatch<SetStateAction<string>>;
  setShoeColor: Dispatch<SetStateAction<string>>;
  setShoeSoldPrice: Dispatch<SetStateAction<string>>;
  setShoeGetPrice: Dispatch<SetStateAction<string>>;
};

export default function ProductInputs(props: Props) {
  return (
    <>
      <TextInput
        mode="outlined"
        textColor="#333"
        style={{
          ...styles.textInput,
          width:
            props.from == "edit" ? 302 : Dimensions.get("screen").width - 12,
          marginHorizontal: "auto",
        }}
        label="Poyabzal nomi"
        value={props.shoeName}
        onChangeText={(text) => props.setShoeName(text)}
        right={
          <TextInput.Affix
            text={`${props.shoeName.length}/20`}
            textStyle={{
              color: props.shoeName.length > 20 ? "red" : "gray",
            }}
          />
        }
      />
      <View style={styles.viewStyle}>
        <TextInput
          keyboardType="numeric"
          mode="outlined"
          textColor="#333"
          style={{
            ...styles.textInput,
            width:
              props.from == "edit"
                ? 148
                : Dimensions.get("screen").width / 2 - 12,
            marginLeft: props.from == "edit" ? 18 : 0,
          }}
          label="O'lcham"
          value={props.shoeSize}
          onChangeText={(text) => props.setShoeSize(text)}
          right={
            <TextInput.Affix
              text={`${props.shoeSize.length}/2`}
              textStyle={{
                color: props.shoeSize.length > 2 ? "red" : "gray",
              }}
            />
          }
        />
        <TextInput
          mode="outlined"
          textColor="#333"
          style={{
            ...styles.textInput,
            width:
              props.from == "edit"
                ? 148
                : Dimensions.get("screen").width / 2 - 12,
          }}
          label="Rang"
          value={props.shoeColor}
          onChangeText={(text) => props.setShoeColor(text)}
          right={
            <TextInput.Affix
              text={`${props.shoeColor.length}/20`}
              textStyle={{
                color: props.shoeColor.length > 20 ? "red" : "gray",
              }}
            />
          }
        />
      </View>
      <View style={styles.viewStyle}>
        <TextInput
          keyboardType="numeric"
          mode="outlined"
          textColor="#333"
          style={{
            ...styles.textInput,
            width:
              props.from == "edit"
                ? 148
                : Dimensions.get("screen").width / 2 - 12,
            marginLeft: props.from == "edit" ? 18 : 0,
          }}
          label="Sotilish narxi"
          value={props.shoeSoldPrice.trim()}
          onChangeText={(text) => props.setShoeSoldPrice(text)}
          right={<TextInput.Affix textStyle={{ color: "#333" }} text="so'm" />}
        />
        <TextInput
          keyboardType="numeric"
          mode="outlined"
          textColor="#333"
          style={{
            ...styles.textInput,
            width:
              props.from == "edit"
                ? 148
                : Dimensions.get("screen").width / 2 - 12,
          }}
          label="Chiqish narxi"
          value={props.shoeGetPrice.trim()}
          onChangeText={(text) => props.setShoeGetPrice(text)}
          right={<TextInput.Affix textStyle={{ color: "#333" }} text="so'm" />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#fff",
    color: "#000",
  },
  viewStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
