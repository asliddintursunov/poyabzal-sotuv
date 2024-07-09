import { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Inputs from "@/components/inputs/authInput";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function RegisterScreen() {
  const route = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    route.push("(auth)/");
  };

  return (
    <View style={styles.main}>
      <LinearGradient
        style={{ ...styles.main, height: Dimensions.get("screen").height }}
        colors={["lightblue", "#3b5998", "#192f6a"]}
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
          onPress={() => register()}
        >
          Yangi xisob yaratish
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
