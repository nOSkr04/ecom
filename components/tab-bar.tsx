import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import TabBarButton from "./tabb-bar-button";
import {
  ParamListBase,
  Descriptor,
  TabNavigationState,
} from "@react-navigation/native";

import { NavigationHelpers } from "@react-navigation/native";

type Props = {
  state: TabNavigationState<ParamListBase>;
  descriptors: Descriptor<ParamListBase, any, any>[];
  navigation: NavigationHelpers<ParamListBase, any>;
};

const TabBar = ({ state, descriptors, navigation }: Props) => {
  const primaryColor = "#0891b2";
  const greyColor = "#737373";
  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key as any];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) {
          return null;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          }) as { defaultPrevented?: boolean };

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? primaryColor : greyColor}
            label={label as string}
          />
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
});
