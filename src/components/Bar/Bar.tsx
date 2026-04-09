import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AppText } from "@/components/ui/AppText";
import user from "@assets/images/user.png";
import sun from "@assets/images/sun.png";
import moon from "@assets/images/moon.png";

export const Bar = () => {
  const [isDay, setIsDay] = useState(false);

  const handleUserPress = () => {
    console.log("User pressed");
  };

  const handleToggleDayNight = () => {
    setIsDay(!isDay);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <TouchableOpacity onPress={handleUserPress}>
          <Image source={user} style={styles.avatar} />
        </TouchableOpacity>

        <AppText variant="title">
          Mythica
        </AppText>
      </View>

      <TouchableOpacity onPress={handleToggleDayNight}>
        <Image source={isDay ? sun : moon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  containerLeft: {
    flexDirection: "row",
    alignItems: "center",
      gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
