import { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Inputs from "@/components/inputs/authInput";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { baseUrl } from "@/utils";
import Toast from "react-native-toast-message";

export default function AuthHomeScreen() {
  const route = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (username && password) {
      try {
        const request = await fetch(`${baseUrl}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const response = await request.json();
        await AsyncStorage.setItem("access_token", response.tokens.access_token);
        if (!response.success) {
          Toast.show({
            type: "error",
            text1: response.message,
            visibilityTime: 2000,
            autoHide: true,
          });
          return;
        } else {
          Toast.show({
            type: "success",
            text1: response.message,
            visibilityTime: 2000,
            autoHide: true,
          });
          setTimeout(() => {
            route.push("/");
          }, 2000);
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Xatolik",
          text2: "Qaytadan urunib ko'ring",
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    }
  };

  return (
    <View style={styles.main}>
      <LinearGradient
        style={{ ...styles.main, height: Dimensions.get("screen").height }}
        colors={["lightblue", "#3b5998", "royalblue"]}
        end={{ x: 0.25, y: 0.25 }}
      >
        <View style={styles.toastStyle}>
          <Toast />
        </View>
        <Inputs
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
        <Button
          mode="elevated"
          style={styles.buttonStyle}
          onPress={() => login()}
        >
          Xisobga kirish
        </Button>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: Dimensions.get("screen").height / 2,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonStyle: {
    paddingVertical: 5,
    borderRadius: 100,
    width: Dimensions.get("screen").width - 12,
  },
  toastStyle: {
    marginTop: -150,
    paddingBottom: 150,
  },
});
