import { View, ScrollView, StyleSheet } from "react-native";

export default function CalculationSkeleton() {
  return (
    <View style={{ marginTop: 70, width: "96%", marginHorizontal: "auto" }}>
      <ScrollView>
        {[1, 2, 3, 4, 5, 6].map((e) => {
          return (
            <View key={e} style={styles.cardStyle}>
              <View style={styles.cardHeading}>
                <View
                  style={{
                    width: "70%",
                    backgroundColor: "lightgray",
                    height: 18,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "lightgray",
                    borderRadius: 100,
                  }}
                />
              </View>
              <View style={styles.cardActions}>
                <View style={styles.cardContent}>
                  <View
                    style={{
                      width: "40%",
                      height: 16,
                      backgroundColor: "lightgray",
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View
                  style={{
                    width: 100,
                    height: 40,
                    backgroundColor: "lightgray",
                    borderRadius: 100,
                  }}
                />
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
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
    marginTop: 10,
  },
});
