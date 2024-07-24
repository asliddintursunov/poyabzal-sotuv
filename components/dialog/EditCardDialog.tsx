import { useState, Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import ProductInputs from "../inputs/ProductInputs";

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
  dialogVisible: boolean;
  setDialogVisible: Dispatch<SetStateAction<boolean>>;
  editableProduct: ProductType | undefined;
  handleEdit: (
    id: number | undefined,
    editableProduct: ProductType | undefined
  ) => Promise<ProductType[] | null | undefined | void>;
};

const MyComponent = ({
  dialogVisible,
  setDialogVisible,
  editableProduct,
  handleEdit,
}: Props) => {
  const shoeId = editableProduct?.product_id ?? 0;
  const shoeSoldTime = editableProduct?.product_sold_time ?? "";
  const [shoeName, setShoeName] = useState<string>(
    editableProduct?.product_name ?? ""
  );
  const [shoeSize, setShoeSize] = useState<string>(
    String(editableProduct?.product_size) ?? ""
  );
  const [shoeColor, setShoeColor] = useState<string>(
    editableProduct?.product_color ?? ""
  );
  const [shoeSoldPrice, setShoeSoldPrice] = useState<string>(
    String(editableProduct?.product_sold_price) ?? ""
  );
  const [shoeGetPrice, setShoeGetPrice] = useState<string>(
    String(editableProduct?.product_get_price) ?? ""
  );
  const hideDialog = () => setDialogVisible(false);
  const emptyInputs = () => {
    setShoeName("");
    setShoeSize("");
    setShoeColor("");
    setShoeSoldPrice("");
  };

  return (
    <Portal>
      <Dialog
        visible={dialogVisible}
        onDismiss={hideDialog}
        style={{ borderRadius: 10 }}
      >
        <View style={{ paddingTop: 10, paddingBottom: 20 }}>
          <ProductInputs
            from="edit"
            shoeName={shoeName}
            shoeColor={shoeColor}
            shoeSize={shoeSize}
            shoeSoldPrice={shoeSoldPrice}
            shoeGetPrice={shoeGetPrice}
            setShoeName={setShoeName}
            setShoeColor={setShoeColor}
            setShoeSize={setShoeSize}
            setShoeSoldPrice={setShoeSoldPrice}
            setShoeGetPrice={setShoeGetPrice}
          />
        </View>
        <Dialog.Actions>
          <Button
            onPress={() => {
              console.log("Cancel");
              emptyInputs();
              hideDialog();
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={
              shoeName.length > 20 ||
              shoeSize.length > 2 ||
              shoeColor.length > 20
            }
            onPress={() => {
              const editableProduct: ProductType = {
                product_id: shoeId,
                product_sold_time: shoeSoldTime,
                product_name: shoeName,
                product_size: ~~shoeSize,
                product_color: shoeColor,
                product_sold_price: ~~shoeSoldPrice,
                product_get_price: ~~shoeGetPrice,
              };
              emptyInputs();
              hideDialog();
              handleEdit(shoeId, editableProduct);
            }}
          >
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default MyComponent;
