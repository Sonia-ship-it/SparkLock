import { useRouter } from "expo-router";
import { Check, Flame, X } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../utils/themeContext";
import { styles } from "./index";

export default function FireDetected() {
    const route = useRouter();
    const { isDarkMode } = useTheme();

    return (
        <View className="flex-1 pt-6 px-6 items-center" style={{ backgroundColor: isDarkMode ? "#000000" : "#FFFFFF" }}>
            {/* Top Icon */}
            <View className="w-28 h-28 bg-[#D66A1F] rounded-full items-center justify-center mt-4 mb-4 shadow-lg" style={{ elevation: 5 }}>
                <Flame size={54} color="white" />
            </View>

            {/* Title */}
            <Text className="text-[#D66A1F] text-[32px] mb-4 text-center" style={styles.title}>Fire Detected!</Text>

            {/* Fire Image Placeholder Setup */}
            <View className={`w-full h-56 rounded-3xl mb-6 items-center justify-center overflow-hidden border shadow-sm ${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-gray-200 border-gray-100"}`}>
                <Text className={isDarkMode ? "text-gray-600" : "text-gray-400"} style={{ fontSize: 18, fontFamily: "Outfit_400Regular" }}>Fire Image Here</Text>
            </View>

            {/* Question Text */}
            <Text className={`text-4xl mb-2 text-center ${isDarkMode ? "text-white" : "text-black"}`} style={styles.title}>Is this fire safe?</Text>
            <Text className={`text-[15px] mb-4 text-center leading-6 px-4 ${isDarkMode ? "text-gray-500" : "text-[#999]"}`} style={styles.text}>
                Confirm if this is cooking fire or a dangerous emergency
            </Text>

            {/* Action Buttons */}
            <View className="flex-row justify-between w-full gap-4 mb-2">
                <TouchableOpacity
                    onPress={() => route.back()}
                    className="flex-1 bg-[#008A1E] py-6 rounded-2xl items-center shadow-md justify-center"
                    style={{ elevation: 4 }}
                >
                    <View className="w-6 h-6 bg-white rounded-full items-center justify-center mb-2">
                        <Check size={16} color="#008A1E" strokeWidth={3} />
                    </View>
                    <Text className="text-white text-xl font-bold mb-1" style={styles.subtitle}>Safe</Text>
                    <Text className="text-white text-xs opacity-90" style={styles.text}>(Cooking)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => route.push("/emergency")}
                    className="flex-1 bg-[#F03E3E] py-6 rounded-2xl items-center shadow-md justify-center"
                    style={{ elevation: 4 }}
                >
                    <View className="w-6 h-6 bg-white rounded-full items-center justify-center mb-2">
                        <X size={16} color="#F03E3E" strokeWidth={3} />
                    </View>
                    <Text className="text-white text-xl font-bold mb-1" style={styles.subtitle}>Dangerous</Text>
                    <Text className="text-white text-xs opacity-90" style={styles.text}>(Emergency)</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Warning Banner */}
            <View className={`w-full py-4 px-5 rounded-2xl mb-10 border ${isDarkMode ? "bg-[#421d1d] border-[#6b2a2a]" : "bg-[#FFDADB] border-[#FFA1A5]"}`}>
                <Text className={`text-[13px] leading-5 text-center ${isDarkMode ? "text-[#f08080]" : "text-[#D32F2F]"}`} style={styles.text}>
                    If dangerous, alarms will activate and fire brigade will be notified immediately
                </Text>
            </View>
        </View>
    );
}

