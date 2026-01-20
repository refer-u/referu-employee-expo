import { Platform, StyleSheet } from "react-native";

import { JobListIconAnime } from "@/components/job-list-anime";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { hrPostedJobs } from "../mock-data";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#005295", dark: "#1D3D47" }}
      headerImage={
        <ThemedText
          type="title"
          style={{
            color: "#fff",
            bottom: 0,
            height: 70,
            position: "absolute",
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          Refer
          <ThemedText
            type="title"
            style={{
              color: "#94A3B8",
            }}
          >
            U
          </ThemedText>
        </ThemedText>
      }
    >
      <ThemedView
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginHorizontal: -32,
          paddingHorizontal: 32,
          paddingBottom: 32,

          borderBottomWidth: 1,
        }}
      >
        <JobListIconAnime />
        <ThemedView>
          <ThemedText type="title" style={{ fontSize: 26 }}>
            Ажлын зар
          </ThemedText>
          <ThemedText style={{ color: "#71717A" }}>
            {hrPostedJobs.length} Нээлттэй ажлын байр
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          see/
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>
        </ThemedText>
      </ThemedView>

      {hrPostedJobs.map((job) => (
        <ThemedView key={job._id} style={styles.stepContainer}>
          <Link href="/modal">
            <Link.Trigger>
              <ThemedView
                style={{
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <ThemedText type="subtitle">{job.jobTitle}</ThemedText>
                <ThemedText style={{ color: "#71717A" }}>
                  {job.jobDepartment} хэлтэс
                </ThemedText>
                <ThemedText type="defaultSemiBold" style={{ color: "#005295" }}>
                  ₮{job.salaryMin.toLocaleString()}
                  <ThemedText> - </ThemedText>₮{job.salaryMax.toLocaleString()}
                </ThemedText>
                <ThemedText>{job.createdAt}</ThemedText>
              </ThemedView>
            </Link.Trigger>
          </Link>
        </ThemedView>
      ))}

      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction
              title="Action"
              icon="cube"
              onPress={() => alert("Action pressed")}
            />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert("Share pressed")}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert("Delete pressed")}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7E8",
    borderRadius: 14,
    padding: 18,
  },
});
