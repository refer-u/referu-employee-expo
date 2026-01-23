import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { formatDate } from "@/libs/utils/format-date";
import { hrPostedJobs } from "@/libs/utils/get-datas";
import { getJobLevelMN } from "@/libs/utils/get-job-level-mn";
import { getJobTypeMN } from "@/libs/utils/get-job-type-mn";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function ModalScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const selectedJob = hrPostedJobs.find((job) => job._id === jobId);
  const router = useRouter();

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
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">{selectedJob?.jobTitle}</ThemedText>
          <ThemedText
            type="subtitle"
            style={{ color: "#005295", fontSize: 19 }}
          >
            ₮{selectedJob?.salaryMin?.toLocaleString()}
            <ThemedText> - </ThemedText>₮
            {selectedJob?.salaryMin?.toLocaleString()}
          </ThemedText>
          <ThemedView style={styles.subContainer}>
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

        <ThemedView style={styles.stepContainer}>
          <ThemedView style={styles.subContainer}>
            <ThemedText type="subtitle" style={{ fontSize: 18 }}>
              Гүйцэтгэх үндсэн үүрэг
            </ThemedText>
            <ThemedView style={styles.subContainer}>
              {selectedJob?.keyDuties.map((duty) => (
                <ThemedText style={{ color: "#687076" }} key={duty}>
                  <ThemedText style={{ color: "#0a7ea4" }}>• </ThemedText>
                  {duty}
                </ThemedText>
              ))}
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.subContainer}>
            <ThemedText type="subtitle" style={{ fontSize: 18 }}>
              Ажлын байранд тавигдах шаардлага
            </ThemedText>
            <ThemedView style={styles.subContainer}>
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

          <ThemedView style={styles.subContainer}>
            <ThemedText type="subtitle" style={{ fontSize: 18 }}>
              Нэмэлт мэдээлэл
            </ThemedText>
            <ThemedText style={{ color: "#687076" }}>
              <ThemedText style={{ color: "#0a7ea4" }}>• </ThemedText>
              {selectedJob?.additionalNotes}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.subContainer}>
            <ThemedText type="subtitle" style={{ fontSize: 18 }}>
              Шаардлагатай ур чадварууд
            </ThemedText>
            <ThemedView style={styles.subContainer}>
              {selectedJob?.requiredSkills.map((skill) => (
                <ThemedText key={skill} style={{ color: "#687076" }}>
                  <ThemedText style={{ color: "#0a7ea4" }}>• </ThemedText>
                  {skill}
                </ThemedText>
              ))}
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.subContainer}>
            <ThemedText type="subtitle" style={{ fontSize: 18 }}>
              Хангамж урамшуулал
            </ThemedText>
            <ThemedView style={styles.subContainer}>
              {selectedJob?.benefits.map((benefit) => (
                <ThemedText key={benefit} style={{ color: "#687076" }}>
                  <ThemedText style={{ color: "#0a7ea4" }}>• </ThemedText>
                  {benefit}
                </ThemedText>
              ))}
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedView
            style={{
              backgroundColor: "#fff",
              flexDirection: "column",
              gap: 4,
              alignItems: "flex-start",
            }}
          >
            <ThemedText type="subtitle" style={{ fontSize: 18 }}>
              Холбоо барих
            </ThemedText>
            <ThemedView
              style={{
                backgroundColor: "#fff",
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
              }}
            >
              <Feather name="send" size={18} color="#0a7ea4" />
              <ThemedText style={{ color: "#687076" }}>
                {selectedJob?.contactInfo}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView
            style={{
              backgroundColor: "#fff",
              flexDirection: "column",
              gap: 4,
              alignItems: "flex-start",
            }}
          >
            <ThemedText type="subtitle" style={{ fontSize: 18 }}>
              Байршил
            </ThemedText>
            <ThemedView
              style={{
                backgroundColor: "#fff",
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
              }}
            >
              <FontAwesome6 name="location-dot" size={20} color="#0a7ea4" />
              <ThemedText style={{ color: "#687076", flexShrink: 1 }}>
                {selectedJob?.location}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <Link href="/" dismissTo style={{ marginTop: 15, paddingVertical: 15 }}>
          <ThemedText type="link">Go to home screen</ThemedText>
        </Link>

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
  },
  stepContainer: {
    gap: 10,
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
