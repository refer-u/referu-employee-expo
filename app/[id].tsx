"use client";
import { mockEmployeeData } from "@/libs/utils/get-datas";
import { getJobLevelMN } from "@/libs/utils/get-job-level-mn";
import { getJobTypeMN } from "@/libs/utils/get-job-type-mn";
import { relationOptions } from "@/libs/utils/relation-options";
import { statusOptions } from "@/libs/utils/status-options";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Linking,
  Modal,
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
  const [candidateResume, setCandidateResume] = useState<File | undefined>();
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

  const handleSendReferral = () => {
    alert("working");
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

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View style={styles.container}>
        <View style={styles.containerSection}>
          <Text style={{ fontSize: 17, fontWeight: "700" }}>
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
          <Text style={{ fontSize: 17, fontWeight: "700" }}>
            Санал болгож буй хүний мэдээлэл
          </Text>

          <View style={{ flexDirection: "column", gap: 16 }}>
            <View style={styles.inputLabelGap}>
              <Text>
                Овог<Text style={{ color: "#EF4444" }}> *</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={candidateLastName}
                onChangeText={setCandidateLastName}
              />
            </View>

            <View style={styles.inputLabelGap}>
              <Text>
                Нэр<Text style={{ color: "#EF4444" }}> *</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={candidateFirstName}
                onChangeText={setCandidateFirstName}
              />
            </View>

            <View style={styles.inputLabelGap}>
              <Text>
                Утасны дугаар<Text style={{ color: "#EF4444" }}> *</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={candidateTelNumber}
                onChangeText={setCandidateTelNumber}
              />
            </View>

            <View style={styles.inputLabelGap}>
              <Text>
                И-мэйл хаяг<Text style={{ color: "#EF4444" }}> *</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={candidateEmail}
                onChangeText={setCandidateEmail}
              />
            </View>

            <View style={styles.inputLabelGap}>
              <Text>Linkedin хаяг</Text>
              <TextInput
                style={styles.input}
                value={candidateLinkedinUrl}
                onChangeText={setCandidateLinkedinUrl}
              />
            </View>

            <View style={styles.inputLabelGap}>
              <Text>Сонирхож буй ажлын чиглэл</Text>
              <TextInput
                style={styles.input}
                value={candidateFieldOfInterest}
                onChangeText={setCandidateFieldOfInterest}
              />
            </View>

            <View style={styles.inputLabelGap}>
              <Text>
                Одоогийн ажил эрхлэлтийн байдал
                <Text style={{ color: "#EF4444" }}> *</Text>
              </Text>

              <Pressable
                style={styles.input}
                onPress={() => setModalCurrentStatusVisible(true)}
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
              <Text>
                Анкет (PDF) хавсаргах
                <Text style={{ color: "#EF4444" }}> *</Text>
              </Text>
              <TextInput style={styles.input} />
            </View>
          </View>
        </View>

        <View style={styles.containerSection}>
          <Text style={{ fontSize: 17, fontWeight: "700" }}>
            Баталгаажуулах хэсэг
          </Text>

          <View style={{ flexDirection: "column", gap: 16 }}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Switch
                value={hasCandidateConsent}
                onValueChange={setHasCandidateConsent}
              />
              <Text style={{ flexShrink: 1 }}>
                Санал болгож буй хүний зөвшөөрлийг урьдчилан авсан.
                <Text style={{ color: "#EF4444" }}> *</Text>
              </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <Switch
                value={isNotCurrentEmployee}
                onValueChange={setIsNotCurrentEmployee}
              />
              <Text style={{ flexShrink: 1 }}>
                Санал болгож буй хүн одоо энэхүү компанид ажилладаггүй.
                <Text style={{ color: "#EF4444" }}> *</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containerSection}>
          <Text style={{ fontSize: 17, fontWeight: "700" }}>
            Холбогдох асуумж
          </Text>

          <View style={{ flexDirection: "column", gap: 16 }}>
            <View style={styles.inputLabelGap}>
              <Text>
                Та санал болгож буй хүнтэй ямар хамааралтай вэ?
                <Text style={{ color: "#EF4444" }}> *</Text>
              </Text>

              <Pressable
                style={styles.input}
                onPress={() => setModalRelationVisible(true)}
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
              <Text>
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
              pressed && { opacity: 0.7 },
            ]}
          >
            <Text style={styles.btnOutlineText}>Буцах</Text>
          </Pressable>

          <Pressable
            onPress={handleSendReferral}
            style={({ pressed }) => [
              styles.btn,
              styles.btnPrimary,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Text style={styles.btnPrimaryText}>Илгээх</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
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
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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
    height: 84,
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
