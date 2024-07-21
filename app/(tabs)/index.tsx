import LineChartGraph from "@/components/charts/LineChart";
import PieChartGraph from "@/components/charts/PieChart";
import Toast from "react-native-toast-message";
import { baseUrl } from "@/utils";
import { getToken } from "@/helpers/tokenHelper";
import { usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Card } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { useRouter } from "expo-router";
registerTranslation("en-GB", enGB);

function addOneMonth(date: any) {
  let newDate = new Date(date.getTime());
  newDate.setMonth(newDate.getMonth() + 1);
  return newDate;
}

export default function HomeScreen() {
  const pathname = usePathname();
  const router = useRouter();
  const [currMonthStats, setCurrMonthStats] = useState<{
    foyda: number;
    savdo: number;
  }>({ foyda: 0, savdo: 0 });

  const [last6monthsStats, setLast6minthsStats] = useState<
    {
      date: string;
      foyda: number;
      savdo: number;
    }[]
  >([{ date: "month", foyda: 0, savdo: 0 }]);

  useEffect(() => {
    if (pathname == "/") {
      (async () => {
        const currentDate = new Date();
        const nextMonthDate = addOneMonth(currentDate);

        const formattedCurrentMonth = `${
          currentDate.toLocaleDateString().split("/")[2]
        }-${currentDate.toLocaleDateString().split("/")[0]}`;
        const formattedNextMonth = `${
          nextMonthDate.toLocaleDateString().split("/")[2]
        }-${nextMonthDate.toLocaleDateString().split("/")[0]}`;
        const access_token = await getToken();
        if (!access_token) {
          router.push("/login");
          return;
        }

        try {
          const [request1, request2] = await Promise.all([
            fetch(`${baseUrl}/monthly-stats?date=${formattedCurrentMonth}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }),
            fetch(`${baseUrl}/stats-graph?date=${formattedNextMonth}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }),
          ]);

          if (!request1.ok && !request2.ok) {
            Toast.show({
              type: "error",
              text1: "Oylik savdo ma'lumotlarni olishda xatolik",
              text2: "Qaytadan urunib ko'ring",
              position: "top",
              topOffset: 10,
              visibilityTime: 3000,
              autoHide: true,
            });
            return;
          }
          const [response1, response2] = await Promise.all([
            request1.json(),
            request2.json(),
          ]);

          setCurrMonthStats(response1.stats);
          setLast6minthsStats(response2.sixMonthStats);
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Oylik savdo ma'lumotlarni olishda xatolik",
            text2: "Qaytadan urunib ko'ring",
            position: "top",
            topOffset: 10,
            visibilityTime: 3000,
            autoHide: true,
          });
        }
      })();
    }
  }, [pathname]);

  return (
    <View style={styles.main}>
      <Card style={styles.veiwStyle}>
        <Card.Content>
          <Text style={styles.textStyle}>Oylik savdo grafigi</Text>
          <PieChartGraph currMonthStats={currMonthStats} />
        </Card.Content>
      </Card>
      <Card style={styles.veiwStyle}>
        <Card.Content>
          <Text style={styles.textStyle}>Oxirgi 6 oy savdo grafigi</Text>
          <LineChartGraph last6monthsStats={last6monthsStats} />
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
  textStyle: {
    color: "#000",
    fontSize: 28,
    fontWeight: "bold",
  },
  veiwStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 8,
    width: Dimensions.get("window").width - 10,
    margin: 10,
    backgroundColor: "#eeeeee",
    borderRadius: 8,
  },
});
