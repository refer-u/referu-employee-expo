import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { formatDate } from "@/libs/utils/format-date";
import { hrPostedJobs } from "@/libs/utils/get-datas";
import { getJobLevelMN } from "@/libs/utils/get-job-level-mn";
import { getJobTypeMN } from "@/libs/utils/get-job-type-mn";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Linking, Pressable, ScrollView, StyleSheet } from "react-native";

export default function ModalScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const selectedJob = hrPostedJobs.find((job) => job._id === jobId);
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

  if (!selectedJob) {
    return (
      <ThemedView style={{ flexDirection: "column" }}>
        <ThemedText>Ажлын зар олдсонгүй.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingBottom: 14 }}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.containerSection}>
          <ThemedText type="subtitle">{selectedJob?.jobTitle}</ThemedText>
          <ThemedText
            type="subtitle"
            style={{ color: "#005295", fontSize: 19 }}
          >
            ₮{selectedJob?.salaryMin?.toLocaleString()}
            <ThemedText> - </ThemedText>₮
            {selectedJob?.salaryMin?.toLocaleString()}
          </ThemedText>
          <ThemedView style={styles.subtitleListColor}>
            <ThemedText style={{ color: "#0a7ea4", fontWeight: "500" }}>
              <ThemedText style={{ color: "#687076" }}>Хэлтэс: </ThemedText>
              {selectedJob?.jobDepartment}
            </ThemedText>
            <ThemedText style={{ color: "#0a7ea4", fontWeight: "500" }}>
              <ThemedText style={{ color: "#687076" }}>Төрөл: </ThemedText>
              {getJobTypeMN(selectedJob?.jobType)}
            </ThemedText>
            <ThemedText style={{ color: "#0a7ea4", fontWeight: "500" }}>
              <ThemedText style={{ color: "#687076" }}>Түвшин: </ThemedText>
              {getJobLevelMN(selectedJob?.jobLevel)}
            </ThemedText>
          </ThemedView>
          <ThemedText
            style={{ fontSize: 14, color: "#005295", fontWeight: "500" }}
          >
            Нийтэлсэн огноо: {formatDate(selectedJob?.createdAt)}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.containerSection}>
          <ThemedView style={styles.subSection}>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Гүйцэтгэх үндсэн үүрэг
            </ThemedText>
            <ThemedView style={styles.subtitleListColor}>
              {selectedJob?.keyDuties.map((duty) => (
                <ThemedText style={{ color: "#687076" }} key={duty}>
                  <ThemedText style={{ color: "#0a7ea4" }}>• </ThemedText>
                  {duty}
                </ThemedText>
              ))}
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.subSection}>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Ажлын байранд тавигдах шаардлага
            </ThemedText>
            <ThemedView style={styles.subtitleListColor}>
              {selectedJob?.requirements.map((requirement) => (
                <ThemedText key={requirement} style={{ color: "#687076" }}>
                  <ThemedText style={{ color: "#005295" }}>
                    <ThemedText style={{ color: "#0a7ea4" }}>• </ThemedText>
                  </ThemedText>
                  {requirement}
                </ThemedText>
              ))}
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.subSection}>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Нэмэлт мэдээлэл
            </ThemedText>
            <ThemedView style={styles.subtitleListColor}>
              <ThemedText style={{ color: "#687076" }}>
                <ThemedText style={{ color: "#0a7ea4" }}>• </ThemedText>
                {selectedJob?.additionalNotes}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.subSection}>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Шаардлагатай ур чадварууд
            </ThemedText>
            <ThemedView style={styles.subtitleListColor}>
              {selectedJob?.requiredSkills.map((skill) => (
                <ThemedText key={skill} style={{ color: "#687076" }}>
                  <ThemedText style={{ color: "#0a7ea4" }}>• </ThemedText>
                  {skill}
                </ThemedText>
              ))}
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.subSection}>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Хангамж урамшуулал
            </ThemedText>
            <ThemedView style={styles.subtitleListColor}>
              {selectedJob?.benefits.map((benefit) => (
                <ThemedText key={benefit} style={{ color: "#687076" }}>
                  <ThemedText style={{ color: "#0a7ea4" }}>• </ThemedText>
                  {benefit}
                </ThemedText>
              ))}
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.containerSection}>
          <ThemedView style={styles.subSection}>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Холбоо барих
            </ThemedText>
            <ThemedView style={styles.withIcon}>
              <Feather name="send" size={18} color="#0a7ea4" />
              <Pressable
                onPress={() => openEmail(selectedJob?.contactInfo!)}
                style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
              >
                <ThemedText
                  style={{ color: "#687076", textDecorationLine: "underline" }}
                >
                  {selectedJob?.contactInfo}
                </ThemedText>
              </Pressable>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.subSection}>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Байршил
            </ThemedText>
            <ThemedView style={styles.withIcon}>
              <FontAwesome6 name="location-dot" size={20} color="#0a7ea4" />
              <ThemedText style={{ color: "#687076", flexShrink: 1 }}>
                {selectedJob?.location}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.footer}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.btn,
              styles.btnOutline,
              pressed && { opacity: 0.7 },
            ]}
          >
            <ThemedText style={styles.btnOutlineText}>Буцах</ThemedText>
          </Pressable>

          <Pressable
            onPress={() =>
              router.navigate({
                pathname: "/refer-person/[id]",
                params: { id: selectedJob._id },
              })
            }
            style={({ pressed }) => [
              styles.btn,
              styles.btnPrimary,
              pressed && { opacity: 0.85 },
            ]}
          >
            <ThemedText style={styles.btnPrimaryText}>Санал болгох</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f6ff",
    gap: 16,
    paddingBottom: 100,
  },
  containerSection: {
    gap: 12,
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
  subSection: { flexDirection: "column", gap: 3, backgroundColor: "#fff" },
  subtitleListColor: {
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  subtitle: {
    fontSize: 17,
    backgroundColor: "#fff",
  },
  text: { fontSize: 14 },
  withIcon: {
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
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
