import { TopLayer } from "@/components/TopLayer";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LineUp from "../assets/icons/line.png";
import { userStore } from "../utils/userStore";
import { Btn, styles } from "./index";

export function AnotherBtn({ text, onPress }: { text: string, onPress?: () => void }) {
    return (
        <TouchableOpacity onPress={onPress} style={{ borderColor: "#464646FF" }} className="flex flex-row items-center justify-center gap-4 border rounded-lg px-8 py-[14px]">
            <Text className="text-lg text-[#464646FF]" style={styles.subtitle}>{text}</Text>
        </TouchableOpacity>
    )
}

export function InputText({ text, value, onChangeText, keyboardType, onSubmitEditing, returnKeyType, inputRef }: { text: string, value?: string, onChangeText?: (t: string) => void, keyboardType?: any, onSubmitEditing?: () => void, returnKeyType?: any, inputRef?: any }) {
    const [focused, setFocused] = useState(false)
    return (
        <TextInput
            ref={inputRef}
            style={styles.borgray}
            placeholder={text}
            placeholderTextColor="#9F9F9F"
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            className={`rounded-lg border p-[14px] px-5 ${focused ? "border-[#D66A1F]" : "border-[#e0e0e0]"} bg-white`}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        />
    )
}

export default function Complete() {
    const route = useRouter();
    const [loc, setLoc] = useState("");
    const [contact, setContact] = useState("");
    const contactRef = useRef<TextInput>(null);

    const handleContinue = () => {
        userStore.setUser({ location: loc, emergencyContact: contact });
        route.push("/complete2");
    };

    return (
        <View className="flex-1 bg-white">
            <TopLayer complete title="Complete Profile" another={LineUp} />
            <KeyboardAwareScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                extraHeight={70}
                extraScrollHeight={20}
            >
                <Text className="text-center text-3xl mt-4 mb-4" style={styles.title}>Building Details</Text>

                <View className="gap-6 mb-12 pt-4">
                    <InputText
                        text="Building location"
                        value={loc}
                        onChangeText={setLoc}
                        returnKeyType="next"
                        onSubmitEditing={() => contactRef.current?.focus()}
                    />
                    <InputText
                        text="Emergency Contact"
                        inputRef={contactRef}
                        value={contact}
                        onChangeText={setContact}
                        keyboardType="phone-pad"
                        returnKeyType="done"
                        onSubmitEditing={handleContinue}
                    />
                </View>
            </KeyboardAwareScrollView>

            <View className="px-6 pb-12 flex flex-row justify-between items-center bg-white pt-4">
                <AnotherBtn text="Back" onPress={() => route.back()} />
                <Btn title="Continue" reduced onPress={handleContinue} />
            </View>
        </View>
    )
}
