import Entypo from "@expo/vector-icons/Entypo";
import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { ThemedView } from "./themed-view";

export function JobListIconAnime() {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(withTiming(25, { duration: 300 }), 4, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
  return (
    <Animated.View style={animatedStyle}>
      <ThemedView
        style={{
          width: 56,
          height: 56,
          borderRadius: 18,
          backgroundColor: "#0052951A",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Entypo name="list" size={34} color="#005295" />
      </ThemedView>
    </Animated.View>
  );
}
