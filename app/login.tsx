import { TopLayer } from "@/components/TopLayer";
import { useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useRef, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Btn, styles } from "./index";

export function InputText({ text, secureTextEntry, value, onChangeText, keyboardType, inputRef, returnKeyType, onSubmitEditing }:
    { text: string, secureTextEntry?: boolean, value?: string, onChangeText?: (t: string) => void, keyboardType?: any, inputRef?: any, returnKeyType?: any, onSubmitEditing?: () => void }) {
    const [focused, setFocused] = useState(false);
    const [visible, setVisible] = useState(false);

    return (
        <View className="relative">
            <TextInput
                ref={inputRef}
                style={styles.borgray}
                placeholder={text}
                secureTextEntry={secureTextEntry && !visible}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                blurOnSubmit={returnKeyType !== "next"}
                className={`rounded-lg border p-[14px] px-5 ${focused ? "border-[#D66A1F]" : "border-[#9F9F9F]"}`}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            />
            {secureTextEntry && (
                <TouchableOpacity
                    onPress={() => setVisible(!visible)}
                    className="absolute right-4 top-3"
                >
                    {visible ? <EyeOff size={24} color="#D66A1F" /> : <Eye size={24} color="#9F9F9F" />}
                </TouchableOpacity>
            )}
        </View>
    )
}

export default function Login() {
    const route = useRouter();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const passwordRef = useRef<TextInput>(null);

    const handleLogin = () => {
        route.replace("/(tabs)");
    };

    return (
        <View className="flex-1 bg-white">
            <TopLayer title="Login" big more="Enter one time password that we have sent to your phone number." />
            <KeyboardAwareScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                extraHeight={50}
                extraScrollHeight={20}
            >
                <View className="flex flex-col gap-5 pt-4">
                    <InputText
                        text="Phone number"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current?.focus()}
                    />
                    <InputText
                        text="Password"
                        inputRef={passwordRef}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        returnKeyType="done"
                        onSubmitEditing={handleLogin}
                    />
                </View>
                <Text style={styles.text} className="text-right py-4" onPress={() => route.push("/reset-password")}>Forgot password ?</Text>
                <View className="flex justify-center items-center my-2">
                    <Btn title="Login" onPress={handleLogin} />
                </View>
            
                <Text style={styles.text} className="text-lg text-center mt-3 pb-10" onPress={() => route.push("/register")}>Don't have an account ? &nbsp;&nbsp;<Text style={styles.subtitle} className="text-[#D66A1F] underline">Sign Up</Text> </Text>
            </KeyboardAwareScrollView>
        </View>
    )
}
