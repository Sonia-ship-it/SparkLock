import { TopLayer } from "@/components/TopLayer";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Btn, styles } from "./index";

export function InputText({ text, keyboardType }: { text: string, keyboardType?: any }) {
    const [focused, setFocused] = useState(false)
    return (
        <TextInput
            style={styles.borgray}
            placeholder={text}
            keyboardType={keyboardType}
            className={`rounded-lg border p-3 px-4 ${focused ? "border-[#D66A1F]" : "border-[#9F9F9F]"} `}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        />
    )
}
export default function Reset() {
    const route = useRouter();
    return (
        <View className="flex-1 bg-white">
            <TopLayer title="Reset Password" big />
            <View className="m-6 gap-4">
                <Text style={styles.subtitle} className="text-[#464646FF] text-center text-lg">Enter your valid phone number so as to reset your password</Text>
                <View className="flex flex-col gap-6 py-4">
                    <InputText text="Phone number" keyboardType="phone-pad" />
                </View>
                <View className="flex justify-center items-center my-3">
                    <Btn title="Continue" onPress={() => route.push("/otp")} />
                </View>
            </View>
        </View>
    )
}