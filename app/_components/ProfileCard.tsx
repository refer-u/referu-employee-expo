import { Briefcase, Mail, User } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Employee = {
  _id: string;
  employeeClerkId: string;
  employeeFirstName: string;
  employeeLastName: string;
  employeeDepartment: string;
  employeeJobTitle: string;
  employeeJobLevel: string;
  employeeEmail: string;
};

type ProfileCardProps = {
  employee: Employee;
};

export const ProfileCard = ({ employee }: ProfileCardProps) => {
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
              {employee.employeeLastName.charAt(0)}.{" "}
              {employee.employeeFirstName}
            </Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{employee.employeeJobLevel}</Text>
            </View>
          </View>

          <View style={styles.meta}>
            <View style={styles.metaRow}>
              <Briefcase size={14} color="#64748b" />
              <Text style={styles.metaText}>{employee.employeeJobTitle}</Text>
            </View>

            <View style={styles.metaRow}>
              <Mail size={14} color="#94a3b8" />
              <Text style={styles.email}>{employee.employeeEmail}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Department */}
      <View style={styles.department}>
        <Text style={styles.departmentText}>{employee.employeeDepartment}</Text>
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
