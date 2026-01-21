import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Button, ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { formatDate } from "@/libs/utils/format-date";
import { hrPostedJobs } from "@/libs/utils/get-datas";
import { getJobLevelMN } from "@/libs/utils/get-job-level-mn";
import { getJobTypeMN } from "@/libs/utils/get-job-type-mn";

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">{selectedJob?.jobTitle}</ThemedText>
          <ThemedText
            type="subtitle"
            style={{ color: "#005295", fontSize: 19 }}
          >
            {selectedJob?.salaryMin?.toLocaleString()}
            <ThemedText> - </ThemedText>
            {selectedJob?.salaryMin?.toLocaleString()}
          </ThemedText>
          <ThemedView style={styles.subContainer}>
            <ThemedText>Хэлтэс: {selectedJob?.jobDepartment} хэлтэс</ThemedText>
            <ThemedText>Төрөл: {getJobTypeMN(selectedJob?.jobType)}</ThemedText>
            <ThemedText>
              Түвшин: {getJobLevelMN(selectedJob?.jobLevel)}
            </ThemedText>
          </ThemedView>
          <ThemedText style={{ fontSize: 14 }}>
            Нийтэлсэн: {formatDate(selectedJob?.createdAt)}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedView style={styles.subContainer}>
            <ThemedText type="subtitle" style={{ fontSize: 18 }}>
              Гүйцэтгэх үндсэн үүрэг
            </ThemedText>
            <ThemedView style={styles.subContainer}>
              {selectedJob?.keyDuties.map((duty) => (
                <ThemedText key={duty}>• {duty}</ThemedText>
              ))}
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.subContainer}>
            <ThemedText type="subtitle" style={{ fontSize: 18 }}>
              Ажлын байранд тавигдах шаардлага
            </ThemedText>
            <ThemedView style={styles.subContainer}>
              {selectedJob?.requirements.map((requirement) => (
                <ThemedText key={requirement}>• {requirement}</ThemedText>
              ))}
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.subContainer}>
            <ThemedText type="subtitle" style={{ fontSize: 18 }}>
              Нэмэлт мэдээлэл
            </ThemedText>
            <ThemedText>• {selectedJob?.additionalNotes}</ThemedText>
          </ThemedView>

          <ThemedView style={styles.subContainer}>
            <ThemedText type="subtitle" style={{ fontSize: 18 }}>
              Шаардлагатай ур чадварууд
            </ThemedText>
            <ThemedView style={styles.subContainer}>
              {selectedJob?.requiredSkills.map((skill) => (
                <ThemedText key={skill}>• {skill}</ThemedText>
              ))}
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.subContainer}>
            <ThemedText type="subtitle" style={{ fontSize: 18 }}>
              Хангамж урамшуулал
            </ThemedText>
            <ThemedView style={styles.subContainer}>
              {selectedJob?.benefits.map((benefit) => (
                <ThemedText key={benefit}>• {benefit}</ThemedText>
              ))}
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedView style={styles.subContainer}>
            <ThemedText type="subtitle" style={{ fontSize: 18 }}>
              Холбоо барих
            </ThemedText>
            <ThemedText>{selectedJob?.contactInfo}</ThemedText>
          </ThemedView>

          <ThemedView style={styles.subContainer}>
            <ThemedText type="subtitle" style={{ fontSize: 18 }}>
              Байршил
            </ThemedText>
            <ThemedText>{selectedJob?.location}</ThemedText>
          </ThemedView>
        </ThemedView>

        <Link href="/" dismissTo style={{ marginTop: 15, paddingVertical: 15 }}>
          <ThemedText type="link">Go to home screen</ThemedText>
        </Link>

        <ThemedView>
          <Button title="Буцах" onPress={() => router.back()} />
          <Button
            title="Санал болгох"
            onPress={() =>
              router.navigate({
                pathname: "/refer-person/[id]",
                params: { id: selectedJob._id },
              })
            }
          />
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
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7E8",
    borderRadius: 18,
    padding: 18,
    backgroundColor: "#fff",
  },
  subContainer: {
    backgroundColor: "#fff",
    flexDirection: "column",
  },
});
