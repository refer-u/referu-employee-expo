import { Linking } from "react-native";

export const openMap = async (address: string) => {
  const encodedAddress = encodeURIComponent(address);

  const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    Linking.openURL(url);
  } else {
    alert("Газрын зураг нээж чадсангүй!");
  }
};
