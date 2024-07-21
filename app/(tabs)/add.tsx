import Loader from "@/components/loader/Loader";
import { getToken } from "@/helpers/tokenHelper";
import { baseUrl } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function AddScreen() {
  const [shoeName, setShoeName] = useState("");
  const [shoeSize, setShoeSize] = useState("");
  const [shoeColor, setShoeColor] = useState("");
  const [shoeSoldPrice, setShoeSoldPrice] = useState("");
  const [shoeGetPrice, setShoeGetPrice] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSell = async () => {
    if (!(shoeName && shoeColor && shoeSize && shoeSoldPrice && shoeGetPrice)) {
      Toast.show({
        type: "error",
        text1: "Qiymat xatoligi",
        text2: "Barcha qiymatlar to'dirilmagunicha poyabzal sota olmaysiz!",
        position: "top",
        topOffset: 10,
        visibilityTime: 5000,
        autoHide: true,
      });
      return;
    }
    setIsPending(true);
    try {
      const access_token = await getToken();
      const request = await fetch(`${baseUrl}/add-product`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: shoeName,
          size: shoeSize,
          color: shoeColor,
          sold_price: shoeSoldPrice,
          get_price: shoeGetPrice,
        }),
      });

      if (!request.ok) {
        setIsPending(false);
        Toast.show({
          type: "error",
          text1: "Yangi poyabzal qo'shishda xatolik",
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
    } catch (error) {
      setIsPending(false);
      Toast.show({
        type: "success",
        text1: "Poyabzal qo'shishda xatolik",
        text2: "Qaytadan urunib ko'ring",
        position: "top",
        topOffset: 10,
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  const cancleSell = () => {
    setShoeName("");
    setShoeSize("");
    setShoeColor("");
    setShoeSoldPrice("");
    setShoeGetPrice("");
  };

  return (
    <>
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
          label="Poyabzal nomi"
          value={shoeName}
          onChangeText={(text) => setShoeName(text)}
          right={
            <TextInput.Affix
              text={`${shoeName.length}/20`}
              textStyle={{
                color: shoeName.length > 20 ? "red" : "gray",
              }}
            />
          }
        />
        <View style={styles.viewStyle}>
          <TextInput
            keyboardType="numeric"
            mode="outlined"
            textColor="#333"
            style={styles.textInput}
            label="O'lcham"
            value={shoeSize}
            onChangeText={(text) => setShoeSize(text)}
            right={
              <TextInput.Affix
                text={`${shoeSize.length}/2`}
                textStyle={{
                  color: shoeSize.length > 2 ? "red" : "gray",
                }}
              />
            }
          />
          <TextInput
            mode="outlined"
            textColor="#333"
            style={styles.textInput}
            label="Rang"
            value={shoeColor}
            onChangeText={(text) => setShoeColor(text)}
            right={
              <TextInput.Affix
                text={`${shoeColor.length}/20`}
                textStyle={{
                  color: shoeColor.length > 20 ? "red" : "gray",
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
            style={styles.textInput}
            label="Sotilish narxi"
            value={shoeSoldPrice.trim()}
            onChangeText={(text) => setShoeSoldPrice(text)}
            right={
              <TextInput.Affix textStyle={{ color: "#333" }} text="so'm" />
            }
          />
          <TextInput
            keyboardType="numeric"
            mode="outlined"
            textColor="#333"
            style={styles.textInput}
            label="Chiqish narxi"
            value={shoeGetPrice.trim()}
            onChangeText={(text) => setShoeGetPrice(text)}
            right={
              <TextInput.Affix textStyle={{ color: "#333" }} text="so'm" />
            }
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.buttonStyle}
            mode="contained"
            disabled={
              shoeName.length > 20 ||
              shoeSize.length > 2 ||
              shoeColor.length > 20
            }
            onPress={() => handleSell()}
          >
            Poyabzal sotish
          </Button>
          <Button
            style={styles.buttonStyle}
            mode="contained-tonal"
            onPress={() => cancleSell()}
          >
            Bekor qilish
          </Button>
        </View>
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
    marginTop: 10,
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
  toastStyle: {
    zIndex: 1,
  },
});
