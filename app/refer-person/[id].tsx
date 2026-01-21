import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ReferPerson() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>job id {id}</Text>
    </View>
  );
}
