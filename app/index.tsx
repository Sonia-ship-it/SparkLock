import {
  Outfit_100Thin,
  Outfit_200ExtraLight,
  Outfit_300Light,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_700Bold,
  useFonts,
} from "@expo-google-fonts/outfit";
import { useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, Easing, Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FireImage from "../assets/icons/Fire.png";
import Logo from "../assets/icons/LogoS.png";

interface Props {
  title: String,
  onPress?: () => void,
  reduced?: boolean
}

export function CustomButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity className="flex flex-row items-center justify-center gap-4  w-1/2  bg-white rounded-lg px-2 py-[14px] " onPress={onPress}>
      <Text className="text-[#D66A1F] text-xl" style={styles.subtitle}>{title}</Text>
      <ArrowRight size={20} color="#D66A1F" />
    </TouchableOpacity>
  );
}

export function Btn({ title, onPress, reduced }: Props) {
  return (
    <TouchableOpacity className={reduced ? "flex flex-row items-center justify-center gap-4  bg-[#D66A1F] rounded-lg px-8 py-[12px]" : "flex flex-row items-center justify-center gap-4  bg-[#D66A1F] rounded-lg px-10 py-[12px]"} onPress={onPress}>
      <Text className="text-white text-xl" style={styles.subtitle}>{title}</Text>
    </TouchableOpacity>
  );
}

function AlarmPulse({ onPress }: { onPress?: () => void }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.7)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.4,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View className="justify-center items-center mt-8">
        <Animated.View
          style={[
            styles.outerPulse,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
              shadowColor: "#D66A1F",
              shadowOpacity: 0.5,
              shadowRadius: 20,
              shadowOffset: { width: 0, height: 0 },
            },
          ]}
        />
        <View style={styles.outerCircle}>
          <View style={styles.middleCircle}>
            <View style={styles.innerCircle}>
              <View style={styles.centerDot} />
            </View>
          </View>
        </View>
        <Animated.View
          style={[
            styles.radarSweep,
            { transform: [{ rotate: rotateInterpolate }] },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const route = useRouter();
  const [fontsLoaded] = useFonts({
    Outfit_100Thin,
    Outfit_200ExtraLight,
    Outfit_300Light,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_700Bold,
  });

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = "SparkLock";
    }
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        source={FireImage}
        resizeMode="cover"
        className="flex-1"
        imageStyle={{ width: "100%", height: "100%" }}
      >
        <View className="flex-1 bg-black/40" style={{ paddingTop: insets.top }}>
          <View className="flex flex-row justify-center p-6 mb-8 items-center gap-4">
            <Image source={Logo} />
            <Text className="text-white text-4xl" style={styles.title}>SPARKLOCK</Text>
          </View>
          <Text className="text-white text-5xl text-center flex py-3" style={styles.title}>Detect, Alert</Text>
          <Text className="text-white text-5xl flex text-center px-12 mb-16" style={styles.title}>Prevent</Text>
          <Text className="text-white text-[17px] leading-6 px-4 text-center mb-8" style={styles.text}>
            SparkLock is a smart system that helps prevent fires before they happen. It detects danger early, shuts off power and gas automatically, and sends instant alerts to keep buildings and people safe.
          </Text>
          <AlarmPulse onPress={() => route.push("/emergency")} />
          <View className="flex justify-center items-center py-12 my-4">
            <CustomButton title="Get started" onPress={() => route.push("/register")} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#D66A1F"
  },
  texts: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontFamily: "Outfit_400Regular",
  },
  light: {
    fontFamily: "Outfit_300Light",
  },
  lighter: {
    fontFamily: " Outfit_200ExtraLight",
  },
  title: {
    fontFamily: "Outfit_700Bold",
  },
  subtitle: {
    fontFamily: "Outfit_500Medium",
  },
  borgray: {
    borderColor: "rgba(159, 159, 159, 1)",
    fontFamily: "Outfit_400Regular",
  },
  outerPulse: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "white",
  },
  outerCircle: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: "#D66A1F",
    justifyContent: "center",
    alignItems: "center",
  },
  middleCircle: {
    width: 55,
    height: 55,
    borderRadius: 55,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#D66A1F",
    justifyContent: "center",
    alignItems: "center",
  },
  centerDot: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: "#D66A1F",
  },
  radarSweep: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "rgb(214,106,31)",
  },
});
