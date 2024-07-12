import { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Inputs from "@/components/inputs/authInput";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

export default function AuthHomeScreen() {
  const route = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await AsyncStorage.setItem("access_token", "SOME_RANDOM_TOKEN_VALUE");
    } catch (error) {
      console.error("Error occured during token set", error);
    }
    route.push("(tabs)/");
  };

  return (
    <View style={styles.main}>
      <LinearGradient
        style={{ ...styles.main, height: Dimensions.get("screen").height }}
        colors={["lightblue", "#3b5998", "royalblue"]}
        end={{ x: 0.25, y: 0.25 }}
      >
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
});
