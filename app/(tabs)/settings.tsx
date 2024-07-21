import Loader from "@/components/loader/Loader";
import { getToken } from "@/helpers/tokenHelper";
import { baseUrl } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function SettingsScreen() {
  const route = useRouter();
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [initialData, setInitialData] = useState<{
    username?: string;
    password?: BinaryType;
  }>({});

  useEffect(() => {
    (async () => {
      try {
        setIsPending(true);
        const access_token = await getToken();
        if (!access_token) {
          route.push("/login");
          return;
        }
        const request = await fetch(`${baseUrl}/get-data`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!request.ok) {
          setIsPending(false);
          route.push("/login");
          return;
        }
        const response = await request.json();
        setInitialData({
          username: response.user_name,
          password: undefined,
        });
        setIsPending(false);
      } catch (error) {
        setIsPending(false);
        route.push("/login");
      }
    })();
  }, []);

  const logout = async () => {
    setIsPending(true);
    try {
      await AsyncStorage.removeItem("access_token");
      setIsPending(false);
      route.push("/login");
    } catch (error) {
      console.error("Failed to remove the token from storage", error);
      setIsPending(false);
    }
  };

  const updateProfile = async () => {
    if (!(username && oldPassword && newPassword)) {
      Toast.show({
        type: "error",
        text1: "Qiymat xatoligi",
        text2: "Barcha qiymatlar to'dirilmagunicha profilni yangilay olmaysiz!",
        position: "top",
        topOffset: 0,
        visibilityTime: 5000,
        autoHide: true,
      });
      return;
    }
    try {
      setIsPending(true);
      const access_token = await getToken();
      if (!access_token) {
        route.push("/login");
        return;
      }
      const request = await fetch(`${baseUrl}/update-profile`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username:
            username == initialData.username || username == ""
              ? undefined
              : username,
          new_password: newPassword,
          old_password: oldPassword,
        }),
      });
      if (!request.ok) {
        const error = await request.json();
        setIsPending(false);
        Toast.show({
          type: "error",
          text1: error.message,
          text2: "Qaytadan urunib ko'ring",
          position: "top",
          topOffset: 10,
          visibilityTime: 3000,
          autoHide: true,
        });
        return;
      }

      const response = await request.json();
      setIsPending(false);
      Toast.show({
        type: "success",
        text1: response.message,
        position: "top",
        topOffset: 10,
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => {
        setUsername("");
        setOldPassword("");
        setNewPassword("");
        route.push("/");
      }, 3000);
    } catch (error) {
      setIsPending(false);
      Toast.show({
        type: "error",
        text1: "Xisobni yangilashda xatolik.",
        text2: "Qaytadan urunib ko'ring.",
        position: "top",
        topOffset: 10,
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  return (
    <>
      {/* <Text style={styles.usernameStyle}>{initialData.username}</Text> */}
      <Text style={styles.usernameStyle}>Foydalanuvchi ismi</Text>
      {isPending && <Loader />}
      <View style={styles.toastStyle}>
        <Toast />
      </View>
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
          right={
            <TextInput.Affix
              text={`${username.length}/20`}
              textStyle={{
                color: username.length > 20 ? "red" : "gray",
              }}
            />
          }
        />
        <TextInput
          mode="outlined"
          textColor="#333"
          style={{
            ...styles.textInput,
            width: Dimensions.get("screen").width - 12,
          }}
          label="Eski parol"
          value={oldPassword}
          onChangeText={(text) => setOldPassword(text)}
          right={
            <TextInput.Affix
              text={`${oldPassword.length}/20`}
              textStyle={{
                color: oldPassword.length > 20 ? "red" : "gray",
              }}
            />
          }
        />
        <TextInput
          mode="outlined"
          textColor="#333"
          style={{
            ...styles.textInput,
            width: Dimensions.get("screen").width - 12,
          }}
          label="Yangi parol"
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          right={
            <TextInput.Affix
              text={`${newPassword.length}/20`}
              textStyle={{
                color: newPassword.length > 20 ? "red" : "gray",
              }}
            />
          }
        />
        <Button
          mode="contained-tonal"
          style={styles.buttonStyle}
          disabled={
            username.length > 20 ||
            newPassword.length > 20 ||
            oldPassword.length > 20
          }
          onPress={() => updateProfile()}
        >
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
    </>
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
  toastStyle: {
    zIndex: 1,
  },
  usernameStyle: { fontSize: 22, textAlign: "center", marginVertical: 5 },
});
