import LineChartGraph from "@/components/charts/LineChart";
import PieChartGraph from "@/components/charts/PieChart";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Card } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en-GB", enGB);

export default function HomeScreen() {
  return (
    <View style={styles.main}>
      <Card style={styles.veiwStyle}>
        <Card.Content>
          <Text style={styles.textStyle}>Oylik savdo grafikasi</Text>
          <PieChartGraph />
        </Card.Content>
      </Card>
      <Card style={styles.veiwStyle}>
        <Card.Content>
          <Text style={styles.textStyle}>Oylik savdo grafikasi</Text>
          <LineChartGraph />
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
