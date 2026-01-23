import { mockEmployeeData } from "@/libs/utils/get-datas";
import { getJobLevelMN } from "@/libs/utils/get-job-level-mn";
import { getJobTypeMN } from "@/libs/utils/get-job-type-mn";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

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
  const router = useRouter();

  const handleSendReferral = () => {
    alert("working");
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View style={styles.container}>
        <View style={styles.stepContainer}>
          <Text style={{ fontSize: 17, fontWeight: "700", color: "#687076" }}>
            Санал болгогч ажилтны мэдээлэл
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Нэр: </Text>
            <Text>
              {mockEmployeeData.employeeLastName.split("")[0]}.
              <Text>{mockEmployeeData.employeeFirstName}</Text>
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Хэлтэс: </Text>
            <Text>{mockEmployeeData.employeeDepartment}</Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Түвшин: </Text>
            <Text>{getJobLevelMN(mockEmployeeData.employeeJobLevel)}</Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Төрөл: </Text>
            <Text>{getJobTypeMN(mockEmployeeData.employeeJobType)}</Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Утас: </Text>
            <Text>{mockEmployeeData.employeeTelNumber}</Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>И-мэйл хаяг: </Text>
            <Text>{mockEmployeeData.employeeEmail}</Text>
          </View>
        </View>

        <View style={[styles.stepContainer, styles.stepPlusContainer]}>
          <Text style={{ fontSize: 17, fontWeight: "700" }}>
            Санал болгож буй хүний мэдээлэл
          </Text>

          <View>
            <Text>
              Овог<Text style={{ color: "#EF4444" }}> *</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={candidateLastName}
              onChangeText={setCandidateLastName}
            />
          </View>

          <View>
            <Text>
              Нэр<Text style={{ color: "#EF4444" }}> *</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={candidateFirstName}
              onChangeText={setCandidateFirstName}
            />
          </View>

          <View>
            <Text>
              Утасны дугаар<Text style={{ color: "#EF4444" }}> *</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={candidateTelNumber}
              onChangeText={setCandidateTelNumber}
            />
          </View>

          <View>
            <Text>
              И-мэйл хаяг<Text style={{ color: "#EF4444" }}> *</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={candidateEmail}
              onChangeText={setCandidateEmail}
            />
          </View>

          <View>
            <Text>Linkedin хаяг</Text>
            <TextInput
              style={styles.input}
              value={candidateLinkedinUrl}
              onChangeText={setCandidateLinkedinUrl}
            />
          </View>

          <View>
            <Text>
              Сонирхож буй ажлын чиглэл
              <Text style={{ color: "#EF4444" }}> *</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={candidateFieldOfInterest}
              onChangeText={setCandidateFieldOfInterest}
            />
          </View>

          <View>
            <Text>Одоогийн ажил эрхлэлтийн байдал</Text>
            <TextInput
              style={styles.input}
              value={candidateCurrentStatus}
              onChangeText={setCandidateCurrentStatus}
            />
          </View>

          <View>
            <Text>
              Анкет (PDF) хавсаргах<Text style={{ color: "#EF4444" }}> *</Text>
            </Text>
            <TextInput style={styles.input} />
          </View>
        </View>

        <View style={[styles.stepContainer, styles.stepPlusContainer]}>
          <Text style={{ fontSize: 17, fontWeight: "700" }}>
            Баталгаажуулах хэсэг
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
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

        <View style={[styles.stepContainer, styles.stepPlusContainer]}>
          <Text style={{ fontSize: 17, fontWeight: "700" }}>
            Холбогдох асуумж
          </Text>
          <View>
            <Text>
              Та санал болгож буй хүнтэй ямар хамааралтай вэ?
              <Text style={{ color: "#EF4444" }}> *</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={relationWithCandidate}
              onChangeText={setRelationWithCandidate}
            />
          </View>

          <View>
            <Text>
              Дээрх ажлын байранд тухайн хүнийг санал болгож буй шалтгаанаа
              бичнэ үү.<Text style={{ color: "#EF4444" }}> *</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={refferalReason}
              onChangeText={setRefferalReason}
            />
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
  stepContainer: {
    gap: 6,
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
  stepPlusContainer: {
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#d8d8d8",
    backgroundColor: "#fff",
    padding: 8,
    marginTop: 16,
  },
  subContainer: {
    backgroundColor: "#fff",
    flexDirection: "column",
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
    height: 76,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7E8",
  },
});
