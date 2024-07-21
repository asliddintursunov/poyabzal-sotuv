import { baseUrl } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Button, Appbar } from "react-native-paper";
import Toast from "react-native-toast-message";
import Loader from "@/components/loader/Loader";
import { getToken } from "@/helpers/tokenHelper";
import {
  DatePickerInput,
  registerTranslation,
  en,
} from "react-native-paper-dates";
registerTranslation("en", en);

type ProductType = {
  product_id: number;
  product_name: string;
  product_size: number;
  product_color: string;
  product_sold_price: number;
  product_get_price: number;
  product_sold_time: string;
};

export default function CalculationScreen() {
  const [date, setDate] = useState(new Date());
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    (async () => {
      const access_token = await getToken();
      const formatted_date = date.toLocaleDateString("en-US");
      if (!access_token) return;

      try {
        setIsPending(true);
        const request = await fetch(
          `${baseUrl}/get-products?date=${formatted_date}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access_token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!request.ok) {
          setIsPending(false);
          Toast.show({
            type: "error",
            text1: "Ma'lumotlarni olishda xatolik",
            text2: "Qaytadan urunib ko'ring",
            position: "top",
            topOffset: 10,
            visibilityTime: 3000,
            autoHide: true,
          });
          return;
        }
        const response = await request.json();
        setProducts(response.products);
        setIsPending(false);
      } catch (error) {
        setIsPending(false);
        Toast.show({
          type: "error",
          text1: "Ma'lumotlarni olishda xatolik",
          text2: "Qaytadan urunib ko'ring",
          position: "top",
          topOffset: 10,
          visibilityTime: 3000,
          autoHide: true,
        });
      }
    })();
  }, [date]);

  return (
    <>
      {isPending && <Loader />}
      <View style={styles.toastStyle}>
        <Toast />
      </View>
      <View style={styles.main}>
        <DatePickerInput
          locale="en"
          label="Sana"
          value={date}
          onChange={(e: any) => setDate(e)}
          inputMode="start"
          style={{ backgroundColor: "#81b2eb", marginTop: 85 }}
        />
        <View style={{ marginTop: 70, width: "96%", marginHorizontal: "auto" }}>
          <Text style={{ fontSize: 26 }}>
            {date.toLocaleDateString("en-US")} kundagi savdolar
          </Text>
          <ScrollView>
            {products.length ? (
              products.map((el: ProductType) => {
                return (
                  <View
                    key={el.product_id}
                    id={String(el.product_id)}
                    style={styles.cardStyle}
                  >
                    <View style={styles.cardHeading}>
                      <Text style={{ fontSize: 18, fontWeight: "500" }}>
                        {el.product_color} | {el.product_name} |{" "}
                        {el.product_size}
                      </Text>
                      <Appbar.Action
                        icon="square-edit-outline"
                        iconColor="#4a79f0"
                        style={{ backgroundColor: "#e6f0f5" }}
                      />
                    </View>
                    <View style={styles.cardActions}>
                      <View style={styles.cardContent}>
                        <Text style={{ fontSize: 18 }}>
                          Chiqqan: {el.product_get_price}
                        </Text>
                        <Text style={{ fontSize: 18 }}>
                          Sotilgan: {el.product_sold_price}
                        </Text>
                      </View>
                      <Button
                        mode="contained"
                        buttonColor="#cf3c5a"
                        textColor="#fff"
                      >
                        O'chirish
                      </Button>
                    </View>
                  </View>
                );
              })
            ) : (
              <View style={styles.noProductContainer}>
                <Text style={{ fontSize: 26 }}>
                  Siz bu kunda savdo qilmagansiz
                </Text>
              </View>
            )}
          </ScrollView>
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
  },
  cardStyle: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    color: "#333",
    width: "100%",
    marginTop: 10,
    borderRadius: 8,
    padding: 10,
    elevation: 3,
    shadowRadius: 8,
  },
  cardHeading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
  },
  cardActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 70,
  },
  cardContent: {
    height: 70,
    gap: 8,
    width: 200,
  },
  noProductContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  toastStyle: {
    zIndex: 1,
  },
  cardButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
