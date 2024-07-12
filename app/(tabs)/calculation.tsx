import { baseUrl } from "@/utils";
import { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Card, Button } from "react-native-paper";
import {
  DatePickerInput,
  registerTranslation,
  en,
} from "react-native-paper-dates";
registerTranslation("en", en);

type ProductType = {
  id: number;
  name: string;
  size: number;
  color: string;
  soldPrice: number;
  initialPrice: number;
};

const last20Products: ProductType[] = [
  {
    id: 1,
    name: "Nike Air Max",
    size: 42,
    color: "Black",
    soldPrice: 160000,
    initialPrice: 90000,
  },
  {
    id: 2,
    name: "Adidas Ultra Boost",
    size: 40,
    color: "White",
    soldPrice: 150000,
    initialPrice: 85000,
  },
  {
    id: 3,
    name: "Puma Suede Classic",
    size: 44,
    color: "Red",
    soldPrice: 130000,
    initialPrice: 80000,
  },
  {
    id: 4,
    name: "Reebok Classic",
    size: 41,
    color: "Blue",
    soldPrice: 110000,
    initialPrice: 70000,
  },
  {
    id: 5,
    name: "Under Armour HOVR",
    size: 43,
    color: "Gray",
    soldPrice: 140000,
    initialPrice: 88000,
  },
  {
    id: 6,
    name: "New Balance 990v5",
    size: 42,
    color: "Green",
    soldPrice: 170000,
    initialPrice: 95000,
  },
  {
    id: 7,
    name: "ASICS Gel-Kayano",
    size: 45,
    color: "Yellow",
    soldPrice: 125000,
    initialPrice: 85000,
  },
  {
    id: 8,
    name: "Saucony Jazz Original",
    size: 41,
    color: "Purple",
    soldPrice: 115000,
    initialPrice: 75000,
  },
  {
    id: 9,
    name: "Converse Chuck Taylor",
    size: 39,
    color: "Black",
    soldPrice: 90000,
    initialPrice: 60000,
  },
  {
    id: 10,
    name: "Vans Old Skool",
    size: 40,
    color: "Blue",
    soldPrice: 95000,
    initialPrice: 65000,
  },
  {
    id: 11,
    name: "Fila Disruptor",
    size: 44,
    color: "White",
    soldPrice: 120000,
    initialPrice: 80000,
  },
  {
    id: 12,
    name: "Timberland Classic Boot",
    size: 46,
    color: "Brown",
    soldPrice: 180000,
    initialPrice: 100000,
  },
  {
    id: 13,
    name: "Jordan Retro",
    size: 42,
    color: "Black/Red",
    soldPrice: 200000,
    initialPrice: 110000,
  },
  {
    id: 14,
    name: "Skechers Go Walk",
    size: 43,
    color: "Gray",
    soldPrice: 105000,
    initialPrice: 70000,
  },
  {
    id: 15,
    name: "Mizuno Wave Rider",
    size: 45,
    color: "Orange",
    soldPrice: 135000,
    initialPrice: 85000,
  },
  {
    id: 16,
    name: "Brooks Ghost",
    size: 41,
    color: "Black/Blue",
    soldPrice: 125000,
    initialPrice: 90000,
  },
  {
    id: 17,
    name: "Hoka One One",
    size: 44,
    color: "Green",
    soldPrice: 145000,
    initialPrice: 92000,
  },
  {
    id: 18,
    name: "Merrell Moab",
    size: 42,
    color: "Brown",
    soldPrice: 110000,
    initialPrice: 75000,
  },
  {
    id: 19,
    name: "Columbia Sportswear",
    size: 43,
    color: "Blue",
    soldPrice: 130000,
    initialPrice: 80000,
  },
  {
    id: 20,
    name: "Salomon Speedcross",
    size: 42,
    color: "Red",
    soldPrice: 150000,
    initialPrice: 95000,
  },
];

export default function CalculationScreen() {
  const [date, setDate] = useState(new Date());

  const handleChange = async (date: any) => {
    try {
      const formatted_date = date.toLocaleDateString("en-US")
      const request = await fetch(
        `${baseUrl}/get-products?date=${formatted_date}`,
        {
          method: "GET",
        }
      );      

      if(request.status !== 200){
        console.error("Error status code on fetching date", request.status);
      }

      const response = await request.json()
      console.log("response:::", response);
      

    } catch (error) {
      console.error("Error fetching date:", error);
    }
    console.log("date:::", date);
    console.log("formatted date:::", date.toLocaleDateString("en-US"));
    
    setDate(date);
  };

  return (
    <View style={styles.main}>
      <DatePickerInput
        locale="en"
        label="Sana"
        value={date}
        onChange={(e: any) => handleChange(e)}
        inputMode="start"
        style={{ backgroundColor: "#009fff", marginTop: 85 }}
      />
      <View style={{ marginTop: 70, width: "96%", marginHorizontal: "auto" }}>
        <Text style={{ fontSize: 26 }}>Oxirgi 20 ta sotuv</Text>
        <ScrollView>
          {last20Products.length &&
            last20Products.map((el: ProductType) => {
              return (
                <View key={el.id} id={String(el.id)} style={styles.cardStyle}>
                  <View style={styles.cardHeading}>
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>
                      {el.color} | {el.name} | {el.size}
                    </Text>
                  </View>
                  <View style={styles.cardActions}>
                    <View style={styles.cardContent}>
                      <Text style={{ fontSize: 18 }}>
                        Chiqqan: {el.initialPrice}
                      </Text>
                      <Text style={{ fontSize: 18 }}>
                        Sotilgan: {el.soldPrice}
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
            })}
        </ScrollView>
      </View>
    </View>
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
    flexDirection: "column",
    alignItems: "flex-start",
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
});
