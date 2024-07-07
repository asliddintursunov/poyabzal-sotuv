import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";

export default function SettingsScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const access_token = "SOME_RANDOM_TOKEN_VALUE";
  const saveToken = async (token: string) => {
    try {
      await AsyncStorage.setItem("access_token", token);
      console.log("Token saved");
    } catch (error) {
      console.log("Failed to save the token to storage", error);
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      console.log("Token got");
      console.log(token);
    } catch (error) {
      console.log("Failed to fetch the token from storage", error);
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      console.log("Token removed");
    } catch (error) {
      console.log("Failed to remove the token from storage", error);
    }
  };

  return (
    <View style={styles.main}>
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
        right={<TextInput.Affix text={`${username.length}/20`} />}
      />
      <TextInput
        mode="outlined"
        textColor="#333"
        style={{
          ...styles.textInput,
          width: Dimensions.get("screen").width - 12,
        }}
        label="Eski parol"
        value={password}
        onChangeText={(text) => setPassword(text)}
        right={<TextInput.Affix text={`${password.length}/20`} />}
      />
      <TextInput
        mode="outlined"
        textColor="#333"
        style={{
          ...styles.textInput,
          width: Dimensions.get("screen").width - 12,
        }}
        label="Yangi parol"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        right={<TextInput.Affix text={`${confirmPassword.length}/20`} />}
      />
      <Button mode="contained-tonal" style={styles.buttonStyle}>
        O'zgarishlarni saqlash
      </Button>

      <Button mode="outlined" onPress={() => saveToken(access_token)}>
        Save
      </Button>
      <Button mode="outlined" onPress={getToken}>
        Get
      </Button>
      <Button mode="outlined" onPress={removeToken}>
        Remove
      </Button>
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
    width: Dimensions.get("screen").width - 12,
  },
});
