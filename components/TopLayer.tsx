import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "../app/index";
import Layout from "../assets/icons/Layout.png";
import { useTheme } from "../utils/themeContext";

interface Props {
    title: string,
    big?: boolean,
    complete?: boolean,
    more?: string,
    another?: any
}

export function TopLayer({ title, big = false, more, another, complete }: Props) {
    const insets = useSafeAreaInsets();
    const { isDarkMode } = useTheme();
    const isCustomGraphic = !!another;

    return (
        <View className="relative w-full mb-28" style={{ paddingTop: insets.top }}>
            {/* Background Image Container */}
            <View className={`absolute top-0 left-0 right-0 h-[280px] overflow-hidden items-center justify-center ${isDarkMode ? "bg-black" : ""}`}>
                <Image
                    source={another ? another : Layout}
                    resizeMode={another ? "contain" : "cover"}
                    style={{
                        width: "100%",
                        height: "100%",
                        opacity: isDarkMode ? (another ? 0.7 : 0.6) : (another ? 1 : 0.95),
                        backgroundColor: isDarkMode ? '#000' : 'transparent'
                    }}
                />
                {isDarkMode && <View className="absolute inset-0 bg-black/20" />}
            </View>

            {/* Content Container */}
            <View className="items-center justify-center  pb-6 min-h-[140px] z-10 px-6">
                {more ? (
                    <Text className="text-white text-center text-[40px] leading-tight" style={styles.title}>{title}</Text>
                ) : (
                    <Text className={
                        big ? "text-white text-center text-[55px] leading-none" :
                            complete ? "text-white w-full text-center text-4xl pb-2" :
                                "text-white text-7xl text-center pb-4"
                    }
                        style={styles.title}>{title}</Text>
                )}

                {!!more && (
                    <Text className={`text-center mt-2 text-lg px-6 leading-tight ${isDarkMode ? "text-white/80" : "text-white"}`} style={styles.text}>
                        {more}
                    </Text>
                )}
            </View>
        </View>
    )
}
