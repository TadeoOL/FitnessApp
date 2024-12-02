import { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Modal,
  Pressable,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "../store/useThemeStore";
import { useLanguages } from "../constants/languages";

export const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const { theme } = useThemeStore();
  const [isVisible, setIsVisible] = useState(false);
  const currentLanguage = i18n.language;

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: theme.customColors.background.paper },
        ]}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.text}>
          {useLanguages().find((lang) => lang.code === currentLanguage)?.flag}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsVisible(false)}
        >
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.customColors.background.paper },
            ]}
          >
            {useLanguages().map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageOption,
                  currentLanguage === language.code && {
                    backgroundColor: theme.customColors.primary.main,
                  },
                ]}
                onPress={() => changeLanguage(language.code)}
              >
                <Text
                  style={[
                    styles.languageText,
                    { color: theme.customColors.text.primary },
                  ]}
                >
                  {language.flag} {language.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  text: {
    fontSize: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 12,
    padding: 16,
    minWidth: 200,
  },
  languageOption: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  languageText: {
    fontSize: 16,
  },
});
