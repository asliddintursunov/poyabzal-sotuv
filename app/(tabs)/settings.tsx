import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";

export default function SettingsScreen() {
  const route = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("access_token");

      route.push("/login");
    } catch (error) {
      console.error("Failed to remove the token from storage", error);
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
      <Button
        mode="contained-tonal"
        buttonColor="#cf3c5a"
        textColor="#fff"
        style={styles.buttonStyle}
        onPress={() => logout()}
      >
        Xisobdan chiqish
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
