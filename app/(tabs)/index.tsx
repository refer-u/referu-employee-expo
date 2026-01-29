import { JobListIconAnime } from "@/components/job-list-anime";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { formatDate } from "@/libs/utils/format-date";
import { hrPostedJobs } from "@/libs/utils/get-datas";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { ReferUHeader } from "../_components/ReferUHeader";
import { useAllReferrals } from "../hook/use-all-referrals";
import { useEmployeeData } from "../hook/use-employee-data";

export default function HomeScreen() {
  const { allReferrals, loading } = useAllReferrals();
  const { employeeData } = useEmployeeData();
  console.log({ allReferrals });
  console.log({ employeeData });
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#005295", dark: "#1D3D47" }}
      headerImage={<ReferUHeader />}
    >
      <ThemedView
        style={{
          backgroundColor: "#f0f6ff",
          paddingVertical: 30,
          paddingHorizontal: 26,
        }}
      >
        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingBottom: 32,
          }}
        >
          <JobListIconAnime />
          <ThemedView>
            <ThemedText type="title" style={{ fontSize: 26 }}>
              Ажлын зар
            </ThemedText>
            <ThemedText style={{ color: "#687076" }}>
              {hrPostedJobs.length} Нээлттэй ажлын байр
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {hrPostedJobs.map((job) => (
          <ThemedView key={job._id} style={styles.stepContainer}>
            <Link href={{ pathname: "/modal", params: { jobId: job._id } }}>
              <Link.Trigger>
                <ThemedView
                  style={{
                    flexDirection: "column",
                    gap: 8,
                    backgroundColor: "#fff",
                  }}
                >
                  <ThemedText type="subtitle">{job.jobTitle}</ThemedText>
                  <ThemedText
                    type="subtitle"
                    style={{ color: "#005295", fontSize: 18 }}
                  >
                    ₮{job.salaryMin.toLocaleString()}
                    <ThemedText> - </ThemedText>₮
                    {job.salaryMax.toLocaleString()}
                  </ThemedText>
                  <ThemedText style={{ color: "#687076" }}>
                    {job.jobDepartment} хэлтэс
                  </ThemedText>
                  <ThemedText style={{ fontSize: 14 }}>
                    {formatDate(job.createdAt)}
                  </ThemedText>
                </ThemedView>
              </Link.Trigger>

              <Link.Preview />

              <Link.Menu>
                <Link.MenuAction
                  title="View detail"
                  icon="eye"
                  onPress={() => console.log("view", job._id)}
                />
                <Link.MenuAction
                  title="Share"
                  icon="square.and.arrow.up"
                  onPress={() => console.log(console.log("share", job._id))}
                />

                <Link.Menu title="More" icon="ellipsis">
                  <Link.MenuAction
                    title="Delete"
                    icon="trash"
                    destructive
                    onPress={() => {
                      console.log("delete", job._id);
                    }}
                  />
                </Link.Menu>
              </Link.Menu>
            </Link>
          </ThemedView>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7E8",
    borderRadius: 18,
    padding: 18,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
});
