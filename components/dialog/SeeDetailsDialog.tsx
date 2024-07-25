import { Dispatch, SetStateAction } from "react";
import { Button, Dialog, Portal, Card } from "react-native-paper";
import { Text, StyleSheet } from "react-native";

type ProductType = {
  product_id: number;
  product_name: string;
  product_size: number;
  product_color: string;
  product_sold_price: number;
  product_get_price: number;
  product_sold_time: string;
};
type Props = {
  infoDialogVisible: boolean;
  setInfoDialogVisible: Dispatch<SetStateAction<boolean>>;
  productInfo: ProductType | undefined;
};

export default function SeeDetailsDialog(params: Props) {
  const hideDialog = () => params.setInfoDialogVisible(false);

  const date = new Date(params.productInfo?.product_sold_time ?? "");

  return (
    <Portal>
      <Dialog
        visible={params.infoDialogVisible}
        onDismiss={hideDialog}
        style={{ borderRadius: 10 }}
      >
        <Card.Content>
          <Text
            style={{
              textDecorationLine: "underline",
              marginBottom: 10,
              fontSize: 20,
            }}
          >
            Alishtirilgan poyabzal ma'lumotlari
          </Text>
          <Text style={{ ...styles.textStyle, fontWeight: "500" }}>
            {params.productInfo?.product_color} |
            {params.productInfo?.product_name} |
            {params.productInfo?.product_size}
          </Text>
          <Text style={styles.textStyle}>
            Chiqqan: {params.productInfo?.product_get_price}
          </Text>
          <Text style={styles.textStyle}>
            Sotilgan: {params.productInfo?.product_sold_price}
          </Text>
          <Text style={styles.textStyle}>
            Sotilgan sana: {date.toLocaleDateString()}
          </Text>
        </Card.Content>
        <Dialog.Actions>
          <Button onPress={() => params.setInfoDialogVisible(false)}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    marginTop: 5
  },
});
