import { getJobLevelMN } from "@/libs/utils/get-job-level-mn";
import { Briefcase, Mail, User } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useEmployeeData } from "../hook/use-employee-data";

export const ProfileCard = () => {
  const { employeeData } = useEmployeeData();

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <User size={32} color="#fff" />
          </View>
          <View style={styles.statusDot} />
        </View>

        {/* Info */}
        <View style={styles.info}>
          <View style={styles.headerRow}>
            <Text style={styles.name}>
              {employeeData?.employeeLastName.charAt(0)}.{" "}
              {employeeData?.employeeFirstName}
            </Text>
            <View style={styles.levelBadge}>
              {employeeData?.employeeJobLevel && (
                <Text style={styles.levelText}>
                  {getJobLevelMN(employeeData.employeeJobLevel)}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.meta}>
            <View style={styles.metaRow}>
              <Briefcase size={14} color="#64748b" />
              <Text style={styles.metaText}>
                {employeeData?.employeeJobTitle}
              </Text>
            </View>

            <View style={styles.metaRow}>
              <Mail size={14} color="#94a3b8" />
              <Text style={styles.email}>{employeeData?.employeeEmail}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Department */}
      <View style={styles.department}>
        <Text style={styles.departmentText}>
          {employeeData?.employeeDepartment}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    paddingBottom: 20,
  },
  content: {
    flexDirection: "row",
    padding: 20,
  },
  avatarWrapper: {
    position: "relative",
    marginRight: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },
  statusDot: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#22c55e",
    borderWidth: 2,
    borderColor: "#fff",
  },
  info: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },
  levelBadge: {
    backgroundColor: "#eff6ff",
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 10,
  },
  levelText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2563eb",
  },
  meta: {
    marginTop: 6,
    gap: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: "#64748b",
  },
  email: {
    fontSize: 12,
    color: "#94a3b8",
  },
  department: {
    marginHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#e3e6e8ff",
    paddingTop: 8,
    borderStyle: "dotted",
    paddingHorizontal: 8,
  },
  departmentText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#5e6d81ff",
    textTransform: "uppercase",
    paddingTop: 8,
  },
});
