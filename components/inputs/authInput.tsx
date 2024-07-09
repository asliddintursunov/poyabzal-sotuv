import { Dispatch, SetStateAction, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
  username: string;
  password: string;
  setUsername: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
};

export default function Inputs({
  username,
  password,
  setUsername,
  setPassword,
}: Props) {
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <View style={styles.viewStyle}>
      <TextInput
        mode="outlined"
        textColor="#333"
        style={{
          ...styles.textInput,
          width: Dimensions.get("screen").width - 12,
        }}
        label="Foydalanuvchi ismi"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        mode="outlined"
        textColor="#333"
        style={{
          ...styles.textInput,
          width: Dimensions.get("screen").width - 12,
        }}
        label="Parol"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={hidePassword}
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: Dimensions.get("screen").width / 2 - 12,
    backgroundColor: "#fff",
    color: "#000",
  },
  viewStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
