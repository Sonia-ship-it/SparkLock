import { TopLayer } from "@/components/TopLayer";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import Tick from "../assets/icons/Tick.png";
import { Btn, styles } from "./index";

export function InputText({ text }: { text: string }) {
    const [focused, setFocused] = useState(false)
    return (
        <TextInput
            style={styles.borgray}
            placeholder={text}
            className={`rounded-lg border p-3 px-4 ${focused ? "border-[#9F9F9F]" : "border-[#9F9F9F]"} `}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        />
    )
}
export default function Success() {
    const route = useRouter();
    return (
        <View className="">
            <TopLayer title="Success" />
            <View className="m-6 gap-2">
                <Text style={styles.text} className="text-[#464646FF] text-center  text-nowrap text-lg">You have successfully reset your password {"\n"} back to login page</Text>
                <View className="flex items-center justify-center py-4">
                    <Image source={Tick} />
                </View>
                <View className="flex justify-center items-center">
                    <Btn title="Back To Login" onPress={() => route.replace("/login")} />
                </View>
            </View>
        </View>
    )
}