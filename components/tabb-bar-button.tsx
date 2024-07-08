import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { icons } from "@/assets/icons";

type IconsType = {
  [key: string]: (props: { color: string }) => JSX.Element;
};
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  isFocused: boolean | number;
  label: string;
  routeName: string;
  color: string;
  onPress: () => void;
};

const TabBarButton = ({
  isFocused,
  label,
  routeName,
  color,
  onPress,
}: Props) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4]);
    const top = interpolate(scale.value, [0, 1], [0, 8]);
    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return {
      opacity,
    };
  });

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Animated.View style={animatedIconStyle}>
        {(icons as IconsType)[routeName]({ color })}
      </Animated.View>
      <Animated.Text
        style={[
          {
            color,
            fontSize: 11,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
