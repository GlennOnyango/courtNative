import { StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Month from "./components/months";
import Items from "./components/items";
import {
  Button,
  useTheme,
  Portal,
  Modal,
  ActivityIndicator,
  Text,
  TextInput,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { usePost } from "../../customHooks/usePost";
import AuthContext from "../../context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function MakePayment() {
  const theme = useTheme();
  const ctx = useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = { backgroundColor: "white", padding: 20, margin: 20 };
  const { data, callApi, reset, isLoading, postError, postsuccess } = usePost(
    ctx.user.token
  );
  const {
    data: dataPayment,
    callApi: callApiPayment,
    reset: resetPayment,
    isLoading: isLoadingPayement,
    postError: postErrorPayment,
    postsuccess: postsuccessPayment,
  } = usePost(ctx.user.token);
  const [payment, setPayment] = useState({
    billItem: "",
    month: "",
    year: "",
    amount: 0,
    paymentId: "",
    transactionCode: "",
  });

  const checkBillPrice = () => {
    if (payment.billItem !== "") {
      callApi(payment, "payment");
      showModal();
    }
  };

  const completePayment = () => {
    callApiPayment(payment, "payment-complete");
  };

  const errorView = useMemo(() => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <MaterialIcons
          name="error"
          size={32}
          color="red"
          style={{ marginRight: 8 }}
        />
        <Text style={{ marginTop: 6 }}>An error occured during payment</Text>
      </View>
    );
  }, []);

  const successView = useMemo(() => {
    return (
      <View>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Payment Completion
        </Text>
        <Text style={{ fontSize: 18, marginVertical: 10 }}>
          Amount: {data.amount}
        </Text>
        <Text style={{ fontSize: 18, marginVertical: 10 }}>
          Till number: 234432{" "}
        </Text>

        <TextInput
          style={styles.input}
          label="Enter Mpesa code *"
          mode="outlined"
          value={payment.transactionCode}
          keyboardType={"default"}
          onChangeText={(text) => {
            setPayment((prev) => ({ ...prev, transactionCode: text }));
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Button
            mode="elevated"
            buttonColor={theme.colors.primary}
            textColor={"white"}
            style={{
              borderRadius: 1,
            }}
            onPress={hideModal}
          >
            Complete payment
          </Button>

          <Button
            mode="elevated"
            buttonColor={theme.colors.primary}
            textColor={"white"}
            style={{
              borderRadius: 1,
            }}
            onPress={hideModal}
          >
            Cancel payment
          </Button>
        </View>
      </View>
    );
  }, []);

  const paymentResponse = useMemo(() => {
    {
      postErrorPayment || postsuccessPayment || isLoadingPayement ? (
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            {isLoading ? (
              <ActivityIndicator
                animating={true}
                color={theme.colors.primary}
              />
            ) : postsuccess ? (
              errorView
            ) : (
              successView
            )}
            {isLoading ? <Button onPress={hideModal}>Close</Button> : null}
          </Modal>
        </Portal>
      ) : null;
    }
  }, [postErrorPayment, postsuccessPayment, isLoadingPayement]);

  useEffect(() => {
    if (postsuccess) {
      setPayment((prev) => ({
        ...prev,
        amount: data.amount,
        paymentId: data.paymentId,
      }));
      reset();
    }
  }, [data, postsuccess]);

  return (
    <View style={styles.container}>
      {postError || postsuccess || isLoading ? (
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            {isLoading ? (
              <ActivityIndicator
                animating={true}
                color={theme.colors.primary}
              />
            ) : postsuccess ? (
              errorView
            ) : (
              successView
            )}
            {isLoading ? <Button onPress={hideModal}>Close</Button> : null}
          </Modal>
        </Portal>
      ) : null}

      <Items payment={setPayment} />

      <Month payment={setPayment} />

      <View style={styles.containerBtn}>
        <Button
          mode="elevated"
          buttonColor={theme.colors.primary}
          textColor={"white"}
          style={{
            borderRadius: 1,
          }}
          onPress={checkBillPrice}
        >
          Pay
        </Button>
      </View>

      <StatusBar style="light" animated />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    paddingHorizontal: 20,
  },
  containerBtn: {
    marginVertical: 8,
    padding: 5,
    paddingVertical: 10,
    width: "100%",
  },
  input: {
    width: "100%",
    height: 40,
    marginVertical: 16,
  },
});
