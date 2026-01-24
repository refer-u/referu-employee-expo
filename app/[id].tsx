"use client";
import { mockEmployeeData } from "@/libs/utils/get-datas";
import { getJobLevelMN } from "@/libs/utils/get-job-level-mn";
import { getJobTypeMN } from "@/libs/utils/get-job-type-mn";
import { relationOptions } from "@/libs/utils/relation-options";
import { statusOptions } from "@/libs/utils/status-options";
import * as DocumentPicker from "expo-document-picker";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import "react-native-gesture-handler";
import "react-native-reanimated";

export default function ReferPerson() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [candidateLastName, setCandidateLastName] = useState<string>("");
  const [candidateFirstName, setCandidateFirstName] = useState<string>("");
  const [candidateTelNumber, setCandidateTelNumber] = useState<string>("");
  const [candidateEmail, setCandidateEmail] = useState<string>("");
  const [candidateLinkedinUrl, setCandidateLinkedinUrl] = useState<string>("");
  const [candidateFieldOfInterest, setCandidateFieldOfInterest] =
    useState<string>("");
  const [candidateCurrentStatus, setCandidateCurrentStatus] =
    useState<string>("");
  const [candidateResume, setCandidateResume] = useState<{
    name: string;
    uri: string;
  } | null>(null);
  const [resumeFilePreview, setResumeFilePreview] = useState<string>("");
  const [hasCandidateConsent, setHasCandidateConsent] =
    useState<boolean>(false);
  const [isNotCurrentEmployee, setIsNotCurrentEmployee] =
    useState<boolean>(false);
  const [relationWithCandidate, setRelationWithCandidate] = useState("");
  const [refferalReason, setRefferalReason] = useState("");
  const [modalCurrentStatusVisible, setModalCurrentStatusVisible] =
    useState(false);
  const [modalRelationVisible, setModalRelationVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(500)).current;
  const router = useRouter();

  const openEmail = async (email: string) => {
    const gmailUrl = `googlegmail://co?to=${email}`;
    const mailtoUrl = `mailto:${email}`;

    const canOpenGmail = await Linking.canOpenURL(gmailUrl);

    if (canOpenGmail) {
      Linking.openURL(gmailUrl);
    } else {
      Linking.openURL(mailtoUrl);
    }
  };

  useEffect(() => {
    if (modalCurrentStatusVisible) {
      slideAnim.setValue(300);

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [modalCurrentStatusVisible]);

  useEffect(() => {
    if (modalRelationVisible) {
      slideAnim.setValue(300);

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [modalRelationVisible]);

  const pickResume = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      const file = result.assets[0];
      setCandidateResume({ name: file.name, uri: file.uri });
    }
  };

  const handleSendReferral = () => {
    alert("working");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f0f6ff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 138 : 0}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#fff" }}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={styles.container}>
          <View style={styles.containerSection}>
            <Text style={styles.sectionTitle}>
              Санал болгогч ажилтны мэдээлэл
            </Text>

            <View style={{ flexDirection: "column", gap: 2 }}>
              <View style={styles.workerLine}>
                <Text style={styles.workerLineLabel}>Нэр: </Text>
                <Text style={styles.workerLineValue}>
                  {mockEmployeeData.employeeLastName.split("")[0]}.
                  <Text>{mockEmployeeData.employeeFirstName}</Text>
                </Text>
              </View>

              <View style={styles.workerLine}>
                <Text style={styles.workerLineLabel}>Хэлтэс: </Text>
                <Text style={styles.workerLineValue}>
                  {mockEmployeeData.employeeDepartment}
                </Text>
              </View>

              <View style={styles.workerLine}>
                <Text style={styles.workerLineLabel}>Түвшин: </Text>
                <Text style={styles.workerLineValue}>
                  {getJobLevelMN(mockEmployeeData.employeeJobLevel)}
                </Text>
              </View>

              <View style={styles.workerLine}>
                <Text style={styles.workerLineLabel}>Төрөл: </Text>
                <Text style={styles.workerLineValue}>
                  {getJobTypeMN(mockEmployeeData.employeeJobType)}
                </Text>
              </View>

              <View style={styles.workerLine}>
                <Text style={styles.workerLineLabel}>Утас: </Text>
                <Pressable
                  onPress={() =>
                    Linking.openURL(`tel:${mockEmployeeData.employeeTelNumber}`)
                  }
                  style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
                >
                  <Text
                    style={[
                      styles.workerLineValue,
                      { textDecorationLine: "underline" },
                    ]}
                  >
                    {mockEmployeeData.employeeTelNumber}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.workerLine}>
                <Text style={styles.workerLineLabel}>И-мэйл хаяг: </Text>
                <Pressable
                  onPress={() => openEmail(mockEmployeeData.employeeEmail!)}
                  style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
                >
                  <Text
                    style={[
                      styles.workerLineValue,
                      { textDecorationLine: "underline" },
                    ]}
                  >
                    {mockEmployeeData.employeeEmail}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.containerSection}>
            <Text style={styles.sectionTitle}>
              Санал болгож буй хүний мэдээлэл
            </Text>

            <View style={styles.sectionSubtitleColGap}>
              <View style={styles.inputLabelGap}>
                <Text style={styles.sectionSubTitle}>
                  Овог<Text style={{ color: "#EF4444" }}> *</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={candidateLastName}
                  onChangeText={setCandidateLastName}
                />
              </View>

              <View style={styles.inputLabelGap}>
                <Text style={styles.sectionSubTitle}>
                  Нэр<Text style={{ color: "#EF4444" }}> *</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={candidateFirstName}
                  onChangeText={setCandidateFirstName}
                />
              </View>

              <View style={styles.inputLabelGap}>
                <Text style={styles.sectionSubTitle}>
                  Утасны дугаар<Text style={{ color: "#EF4444" }}> *</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={candidateTelNumber}
                  onChangeText={setCandidateTelNumber}
                />
              </View>

              <View style={styles.inputLabelGap}>
                <Text style={styles.sectionSubTitle}>
                  И-мэйл хаяг<Text style={{ color: "#EF4444" }}> *</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={candidateEmail}
                  onChangeText={setCandidateEmail}
                />
              </View>

              <View style={styles.inputLabelGap}>
                <Text style={styles.sectionSubTitle}>Linkedin хаяг</Text>
                <TextInput
                  style={styles.input}
                  value={candidateLinkedinUrl}
                  onChangeText={setCandidateLinkedinUrl}
                />
              </View>

              <View style={styles.inputLabelGap}>
                <Text style={styles.sectionSubTitle}>
                  Сонирхож буй ажлын чиглэл
                </Text>
                <TextInput
                  style={styles.input}
                  value={candidateFieldOfInterest}
                  onChangeText={setCandidateFieldOfInterest}
                />
              </View>

              <View style={styles.inputLabelGap}>
                <Text style={styles.sectionSubTitle}>
                  Одоогийн ажил эрхлэлтийн байдал
                  <Text style={{ color: "#EF4444" }}> *</Text>
                </Text>

                <Pressable
                  onPress={() => setModalCurrentStatusVisible(true)}
                  style={({ pressed }) => [
                    styles.input,
                    pressed && { opacity: 0.6 },
                  ]}
                >
                  <Text>
                    {candidateCurrentStatus
                      ? statusOptions.find(
                          (s) => s.value === candidateCurrentStatus,
                        )?.label
                      : "Сонгох / оруулах"}
                  </Text>
                </Pressable>

                <Modal
                  transparent
                  visible={modalCurrentStatusVisible}
                  animationType="slide"
                  onRequestClose={() => setModalCurrentStatusVisible(false)}
                >
                  <Pressable
                    style={styles.modalBackground}
                    onPress={() => setModalCurrentStatusVisible(false)}
                  >
                    <Animated.View
                      style={[
                        styles.dropdownContainer,
                        { transform: [{ translateY: slideAnim }] },
                      ]}
                    >
                      <ScrollView>
                        {statusOptions.map((status) => (
                          <Pressable
                            key={status.value}
                            style={styles.option}
                            onPress={() => {
                              setCandidateCurrentStatus(status.value);
                              setModalCurrentStatusVisible(false);
                            }}
                          >
                            <Text>{status.label}</Text>
                          </Pressable>
                        ))}
                      </ScrollView>
                    </Animated.View>
                  </Pressable>
                </Modal>
              </View>

              <View style={styles.inputLabelGap}>
                <Text style={styles.sectionSubTitle}>
                  Анкет (PDF) хавсаргах
                  <Text style={{ color: "#EF4444" }}> *</Text>
                </Text>

                <Pressable
                  onPress={pickResume}
                  style={({ pressed }) => [
                    styles.uploadBox,
                    pressed && { opacity: 0.7 },
                  ]}
                >
                  <Text>
                    {candidateResume ? candidateResume.name : "Файл сонгох"}
                  </Text>
                </Pressable>
                {candidateResume && (
                  <View style={styles.pdfPreviewBox}>
                    <View style={{ flexDirection: "row", gap: 5 }}>
                      <Text style={styles.pdfIcon}>📄</Text>
                      <Pressable
                        onPress={() => Linking.openURL(candidateResume.uri)}
                        style={({ pressed }) => ({
                          opacity: pressed ? 0.6 : 1,
                        })}
                      >
                        <Text style={styles.pdfOpenText}>Файл харах</Text>
                      </Pressable>
                    </View>

                    <Pressable
                      onPress={() => setCandidateResume(null)}
                      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
                    >
                      <Text style={{ color: "#EF4444", fontSize: 13 }}>
                        Файл устгах
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View style={styles.containerSection}>
            <Text style={styles.sectionTitle}>Баталгаажуулах хэсэг</Text>

            <View style={styles.sectionSubtitleColGap}>
              <View style={styles.withSwitch}>
                <Switch
                  value={hasCandidateConsent}
                  onValueChange={setHasCandidateConsent}
                  trackColor={{ false: "#ccc", true: "#0a7ea4" }}
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                />
                <Text
                  style={{
                    flexShrink: 1,
                    color: hasCandidateConsent ? "#000000" : "#687076",
                  }}
                >
                  Санал болгож буй хүний зөвшөөрлийг урьдчилан авсан.
                  <Text style={{ color: "#EF4444" }}> *</Text>
                </Text>
              </View>

              <View style={styles.withSwitch}>
                <Switch
                  value={isNotCurrentEmployee}
                  onValueChange={setIsNotCurrentEmployee}
                  trackColor={{ false: "#ccc", true: "#0a7ea4" }}
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                />
                <Text
                  style={{
                    flexShrink: 1,
                    color: isNotCurrentEmployee ? "#000000" : "#687076",
                  }}
                >
                  Санал болгож буй хүн одоо энэхүү компанид ажилладаггүй.
                  <Text style={{ color: "#EF4444" }}> *</Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.containerSection}>
            <Text style={styles.sectionTitle}>Холбогдох асуумж</Text>

            <View style={styles.sectionSubtitleColGap}>
              <View style={styles.inputLabelGap}>
                <Text style={styles.sectionSubTitle}>
                  Та санал болгож буй хүнтэй ямар хамааралтай вэ?
                  <Text style={{ color: "#EF4444" }}> *</Text>
                </Text>

                <Pressable
                  onPress={() => setModalRelationVisible(true)}
                  style={({ pressed }) => [
                    styles.input,
                    pressed && { opacity: 0.6 },
                  ]}
                >
                  <Text>
                    {relationWithCandidate
                      ? relationOptions.find(
                          (r) => r.value === relationWithCandidate,
                        )?.label
                      : "Сонгох / оруулах"}
                  </Text>
                </Pressable>

                <Modal
                  transparent
                  visible={modalRelationVisible}
                  animationType="slide"
                  onRequestClose={() => setModalRelationVisible(false)}
                >
                  <Pressable
                    style={styles.modalBackground}
                    onPress={() => setModalRelationVisible(false)}
                  >
                    <Animated.View
                      style={[
                        styles.dropdownContainer,
                        { transform: [{ translateY: slideAnim }] },
                      ]}
                    >
                      <ScrollView>
                        {relationOptions.map((relation) => (
                          <Pressable
                            key={relation.value}
                            style={styles.option}
                            onPress={() => {
                              setRelationWithCandidate(relation.value);
                              setModalRelationVisible(false);
                            }}
                          >
                            <Text>{relation.label}</Text>
                          </Pressable>
                        ))}
                      </ScrollView>
                    </Animated.View>
                  </Pressable>
                </Modal>
              </View>

              <View style={styles.inputLabelGap}>
                <Text style={styles.sectionSubTitle}>
                  Дээрх ажлын байранд тухайн хүнийг санал болгож буй шалтгаанаа
                  бичнэ үү.<Text style={{ color: "#EF4444" }}> *</Text>
                </Text>
                <TextInput
                  style={[styles.input, { height: 72 }]}
                  value={refferalReason}
                  onChangeText={setRefferalReason}
                />
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.btn,
                styles.btnOutline,
                pressed && { opacity: 0.6 },
              ]}
            >
              <Text style={styles.btnOutlineText}>Буцах</Text>
            </Pressable>

            <Pressable
              onPress={handleSendReferral}
              style={({ pressed }) => [
                styles.btn,
                styles.btnPrimary,
                pressed && { opacity: 0.6 },
              ]}
            >
              <Text style={styles.btnPrimaryText}>Илгээх</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f6ff",
    gap: 18,
    paddingBottom: 100,
  },
  containerSection: {
    gap: 14,
    borderWidth: 1,
    borderColor: "#E5E7E8",
    borderRadius: 18,
    padding: 18,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  workerLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  workerLineLabel: {
    color: "#687076",
    fontWeight: "500",
    fontSize: 15,
  },
  workerLineValue: {
    color: "#005295",
    fontWeight: "500",
    fontSize: 15,
  },
  inputLabelGap: {
    flexDirection: "column",
    gap: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d8d8d8",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff",
    height: 36,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    maxHeight: 250,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#00000026",
  },
  withSwitch: { flexDirection: "row", gap: 5, alignItems: "center" },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionSubtitleColGap: {
    flexDirection: "column",
    gap: 16,
  },
  sectionTitle: { fontSize: 17, fontWeight: "700" },
  sectionSubTitle: { fontSize: 15 },
  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#005295",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#00529510",
    justifyContent: "center",
  },
  pdfPreviewBox: {
    marginTop: 5,
    flexDirection: "row",
    gap: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f4f7fb",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pdfIcon: {
    fontSize: 22,
    paddingVertical: 4,
  },
  pdfName: {
    fontSize: 14,
    fontWeight: "500",
  },
  pdfOpenText: {
    color: "#005295",
    paddingVertical: 10,
    fontSize: 13,
  },
  btn: {
    flex: 1,
    height: 48,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimary: {
    backgroundColor: "#005295",
  },
  btnPrimaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: "#005295",
    backgroundColor: "#fff",
  },
  btnOutlineText: {
    color: "#005295",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7E8",
  },
});
