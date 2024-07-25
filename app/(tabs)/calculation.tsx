import { baseUrl } from "@/utils";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Button, Appbar } from "react-native-paper";
import Toast from "react-native-toast-message";
import { getToken } from "@/helpers/tokenHelper";
import CalculationSkeleton from "@/components/skeletons/CalculationSkeleton";
import EditCardDialog from "@/components/dialog/EditCardDialog";
import SeeDetailsDialog from "@/components/dialog/SeeDetailsDialog";
import {
  DatePickerInput,
  registerTranslation,
  en,
} from "react-native-paper-dates";
import { usePathname, useRouter } from "expo-router";
registerTranslation("en", en);

type ProductType = {
  product_id: number;
  product_name: string;
  product_size: number;
  product_color: string;
  product_sold_price: number;
  product_get_price: number;
  product_sold_time: string;
  is_product_changed?: Boolean;
};

export default function CalculationScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const [date, setDate] = useState(new Date());
  const [products, setProducts] = useState<ProductType[]>([]);
  const [oldPorducts, setOldPorducts] = useState<ProductType[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [targetDate, setTargetDate] = useState<string>("");
  const [editableProduct, setEditableProduct] = useState<
    ProductType | undefined
  >(undefined);
  const [oneOldProductInfo, setOneOldProductInfo] = useState<
    ProductType | undefined
  >(undefined);

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [infoDialogVisible, setInfoDialogVisible] = useState<boolean>(false);

  const months: any = {
    "1": "yanvar",
    "2": "fevral",
    "3": "mart",
    "4": "aprel",
    "5": "may",
    "6": "iyun",
    "7": "iyul",
    "8": "avgust",
    "9": "sentabr",
    "10": "oktabr",
    "11": "noyabr",
    "12": "dekabr",
  };

  useEffect(() => {
    setIsPending(true)
    if (pathname != "/calculation") return;
    (async (): Promise<ProductType[] | null | undefined> => {
      const access_token = await getToken();
      if (!access_token) {
        router.push("/login");
      }
      const formatted_date = date.toLocaleDateString("en-US");
      setTargetDate(
        `${formatted_date.split("/")[2]}-yil ${formatted_date.split("/")[1]}-${
          months[String(formatted_date.split("/")[0])]
        } dagi sotuvlar`
      );

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
        setProducts(response.curr_products);
        setOldPorducts(response.old_products);
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
  }, [date, pathname]);

  const handleEdit = async (
    id: number | undefined,
    editableProduct: ProductType | undefined
  ): Promise<ProductType[] | null | undefined | void> => {
    const access_token = await getToken();
    if (!access_token) {
      router.push("/login");
    }

    const product_data: any = {
      product_id: id,
      product_name: editableProduct?.product_name,
      product_color: editableProduct?.product_color,
      product_size: editableProduct?.product_size,
      product_sold_price: editableProduct?.product_sold_price,
      product_get_price: editableProduct?.product_get_price,
    };

    try {
      const request = await fetch(`${baseUrl}/update-product`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product_data),
      });

      if (!request.ok) {
        setIsPending(false);
        Toast.show({
          type: "error",
          text1: "Poyabzalni almashtirish va yangilashda xatolik",
          text2: "Qaytadan urunib ko'ring",
          position: "top",
          topOffset: 10,
          visibilityTime: 3000,
          autoHide: true,
        });
        return;
      }

      const response = await request.json();
      Toast.show({
        type: "success",
        text1: response.message,
        position: "top",
        topOffset: 10,
        visibilityTime: 3000,
        autoHide: true,
      });
      setProducts((prev) =>
        prev.map((p) => (p.product_id === id ? product_data : p))
      );
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
      Toast.show({
        type: "error",
        text1: "Poyabzalni almashtirish va yangilashda xatolik",
        text2: "Qaytadan urunib ko'ring",
        position: "top",
        topOffset: 10,
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  const handleDelete = async (id: number) => {
    const access_token = await getToken();
    if (!access_token) {
      router.push("/login");
    }
    try {
      setIsPending(true);
      const request = await fetch(`${baseUrl}/delete-product/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!request.ok) {
        setIsPending(false);
        Toast.show({
          type: "error",
          text1: "Poyabzalni o'chirishda xatolik",
          text2: "Qaytadan urunib ko'ring",
          position: "top",
          topOffset: 10,
          visibilityTime: 3000,
          autoHide: true,
        });
        return;
      }

      const response = await request.json();

      Toast.show({
        type: "success",
        text1: response.message,
        position: "top",
        topOffset: 10,
        visibilityTime: 3000,
        autoHide: true,
      });
      setProducts((prev) => prev.filter((e) => e.product_id !== id));
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
      Toast.show({
        type: "error",
        text1: "Poyabzalni o'chirishda xatolik",
        text2: "Qaytadan urunib ko'ring",
        position: "top",
        topOffset: 10,
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  const handleOnePorductInfo = (product: ProductType) => {
    const old_product = oldPorducts.find(
      (p) => p.product_id === product.product_id
    );
    setOneOldProductInfo(old_product ?? undefined);
  };

  return (
    <>
      {infoDialogVisible && (
        <SeeDetailsDialog
          infoDialogVisible={infoDialogVisible}
          setInfoDialogVisible={setInfoDialogVisible}
          productInfo={oneOldProductInfo}
        />
      )}
      {dialogVisible && (
        <EditCardDialog
          dialogVisible={dialogVisible}
          setDialogVisible={setDialogVisible}
          editableProduct={editableProduct}
          handleEdit={handleEdit}
        />
      )}
      <View style={styles.toastStyle}>
        <Toast />
      </View>
      {isPending && <CalculationSkeleton />}
      {!isPending && (
        <View style={styles.main}>
          <DatePickerInput
            locale="en"
            label="Sana"
            value={date}
            onChange={(e: any) => setDate(e)}
            inputMode="start"
            style={{ backgroundColor: "#81b2eb", marginTop: 85 }}
          />
          <View
            style={{ marginTop: 70, width: "96%", marginHorizontal: "auto" }}
          >
            <Text style={{ fontSize: 26 }}>{targetDate}</Text>
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
                        <View style={styles.iconContainer}>
                          <Appbar.Action
                            icon="square-edit-outline"
                            iconColor="#4a79f0"
                            style={{ backgroundColor: "#e6f0f5" }}
                            onPress={() => {
                              setDialogVisible(true);
                              setEditableProduct(el);
                              console.log(el);
                            }}
                          />
                          {el.is_product_changed && (
                            <Appbar.Action
                              icon="information-outline"
                              iconColor="#4a79f0"
                              style={{ backgroundColor: "#e6f0f5" }}
                              onPress={() => {
                                setInfoDialogVisible(true);
                                handleOnePorductInfo(el);
                              }}
                            />
                          )}
                        </View>
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
                          onPress={() => handleDelete(el.product_id)}
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
      )}
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
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 4,
  },
});
