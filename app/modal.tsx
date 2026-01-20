import { Link, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { hrPostedJobs } from "./mock-data";

export default function ModalScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const selectedJob = hrPostedJobs.find((job) => job._id === jobId);
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={{ fontSize: 26 }}>
        Ажлын зар дэлгэрэнгүй
      </ThemedText>

      <ThemedView style={styles.stepContainer}>
        <ThemedText>{selectedJob?.jobTitle}</ThemedText>
        <ThemedText>{selectedJob?.jobDepartment}</ThemedText>
        <ThemedText>{selectedJob?.jobType}</ThemedText>
        <ThemedText>{selectedJob?.jobLevel}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          {selectedJob?.keyDuties.map((duty) => (
            <ThemedText>{duty}</ThemedText>
          ))}
        </ThemedText>
        <ThemedText>
          {selectedJob?.requirements.map((requirement) => (
            <ThemedText>{requirement}</ThemedText>
          ))}
        </ThemedText>
        <ThemedText>{selectedJob?.additionalNotes}</ThemedText>{" "}
        <ThemedText>
          {selectedJob?.requiredSkills.map((skill) => (
            <ThemedText>{skill}</ThemedText>
          ))}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText>{selectedJob?.contactInfo}</ThemedText>
        <ThemedText>{selectedJob?.location}</ThemedText>
      </ThemedView>

      <Link href="/" dismissTo style={{ marginTop: 15, paddingVertical: 15 }}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7E8",
    borderRadius: 14,
    padding: 18,
  },
});
