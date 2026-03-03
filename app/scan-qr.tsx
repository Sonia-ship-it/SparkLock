import { useRouter } from "expo-router";
import { Camera, ChevronLeft, QrCode, Save, X } from "lucide-react-native";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Btn, styles } from "./index";

export default function ScanQr() {
    const route = useRouter();
    const [showModal, setShowModal] = useState(false);

    return (
        <View className="flex-1 bg-white pt-16 px-6 relative">
            {/* Header Icons */}
            <View className="flex-row justify-between mb-8 z-10">
                <TouchableOpacity onPress={() => route.back()} className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-md border border-gray-100" style={{ elevation: 3 }}>
                    <ChevronLeft size={24} color="#D66A1F" />
                </TouchableOpacity>
                <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-md border border-gray-100" style={{ elevation: 3 }}>
                    <Camera size={24} color="#D66A1F" />
                </TouchableOpacity>
            </View>

            {/* Titles */}
            <Text className="text-[#D66A1F] text-4xl mb-2" style={styles.title}>Scan QR code</Text>
            <Text className="text-[#333] text-base mb-16" style={styles.text}>Position the QR code within the frame</Text>

            {/* Scanner Frame */}
            <View className="items-center justify-center mb-16">
                <TouchableOpacity onPress={() => setShowModal(true)} className="relative w-64 h-64 justify-center items-center">
                    {/* Corners */}
                    {/* Top Left */}
                    <View className="absolute top-0 left-0 w-12 h-12 border-[#D66A1F] border-t-8 border-l-8 rounded-tl-lg" />
                    {/* Top Right */}
                    <View className="absolute top-0 right-0 w-12 h-12 border-[#D66A1F] border-t-8 border-r-8 rounded-tr-lg" />
                    {/* Bottom Left */}
                    <View className="absolute bottom-0 left-0 w-12 h-12 border-[#D66A1F] border-b-8 border-l-8 rounded-bl-lg" />
                    {/* Bottom Right */}
                    <View className="absolute bottom-0 right-0 w-12 h-12 border-[#D66A1F] border-b-8 border-r-8 rounded-br-lg" />

                    {/* QR Code Icon / Placeholder */}
                    <QrCode size={180} color="#000" />

                    {/* Scanner line over the QR code */}
                    <View className="absolute w-full h-8 top-1/2 left-0 right-0 -translate-y-4 overflow-visible z-10">
                        {/* Horizontal solid line */}
                        <View className="w-full h-1 bg-[#D66A1F] shadow-lg mb-1" style={{ shadowColor: '#D66A1F', elevation: 5 }} />
                        {/* Gradient effect approximation using a semi-transparent view or solid color */}
                        <View className="w-full h-6 bg-[#D66A1F] opacity-30 shadow-lg" />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Resend Link */}
            <Text className="text-center text-[#666] text-base" style={styles.text}>
                can't get QR code? <Text className="underline text-[#333]">Resend Now</Text>
            </Text>

            {/* Bottom Button */}
            <View className="absolute bottom-12 left-6 right-6">
                <Btn title="Complete" onPress={() => setShowModal(true)} reduced={false} />
            </View>

            {/* The QR Code Result Modal */}
            <Modal visible={showModal} transparent animationType="fade">
                <View className="flex-1 bg-black/50 justify-center items-center px-4">
                    <View className="bg-white w-[90%] rounded-3xl p-6 pt-10 pb-8 items-center shadow-2xl" style={{ elevation: 10 }}>
                        <View className="relative w-48 h-48 justify-center items-center mb-6">
                            {/* Inner Corners for modal */}
                            <View className="absolute top-0 left-0 w-8 h-8 border-[#D66A1F] border-t-[6px] border-l-[6px]" />
                            <View className="absolute top-0 right-0 w-8 h-8 border-[#D66A1F] border-t-[6px] border-r-[6px]" />
                            <View className="absolute bottom-0 left-0 w-8 h-8 border-[#D66A1F] border-b-[6px] border-l-[6px]" />
                            <View className="absolute bottom-0 right-0 w-8 h-8 border-[#D66A1F] border-b-[6px] border-r-[6px]" />

                            <QrCode size={150} color="#000" />
                        </View>

                        <Text className="text-[#D66A1F] text-4xl mb-4 text-center mt-2" style={styles.title}>Here your code!!</Text>
                        <Text className="text-[#666] text-center text-[15px] mb-10 leading-6 px-4" style={styles.text}>
                            This is your unique QR code for another person to scan
                        </Text>

                        <View className="flex-row justify-center gap-12 w-full px-8">
                            {/* Save Button */}
                            <TouchableOpacity className="items-center" onPress={() => route.replace("/login")}>
                                <View className="w-14 h-14 bg-white rounded-2xl items-center justify-center border border-orange-100 shadow-sm mb-2" style={{ elevation: 2 }}>
                                    <Save size={24} color="#D66A1F" />
                                </View>
                                <Text className="text-black text-[15px] font-medium" style={styles.subtitle}>Save</Text>
                            </TouchableOpacity>

                            {/* Cancel Button */}
                            <TouchableOpacity className="items-center" onPress={() => route.replace("/login")}>
                                <View className="w-14 h-14 bg-white rounded-2xl items-center justify-center border border-orange-100 shadow-sm mb-2" style={{ elevation: 2 }}>
                                    <X size={24} color="#D66A1F" />
                                </View>
                                <Text className="text-black text-[15px] font-medium" style={styles.subtitle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
