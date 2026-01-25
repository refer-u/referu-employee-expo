import { Linking } from "react-native";

export const openEmail = async (email: string) => {
  const gmailUrl = `googlegmail://co?to=${email}`;
  const mailtoUrl = `mailto:${email}`;

  const canOpenGmail = await Linking.canOpenURL(gmailUrl);

  if (canOpenGmail) {
    Linking.openURL(gmailUrl);
  } else {
    Linking.openURL(mailtoUrl);
  }
};
