import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import {AppDropdown} from "@/components/ui/AppDropdown";
import { AppText } from "@/components/ui/AppText";
import afina from "@assets/images/afina.png";

const OPTIONS = [
  { label: "Greek", value: "Greek" },
  { label: "Norse", value: "Norse" },
  { label: "Egyptian", value: "Egyptian" },
];

const TYPE = [
  { label: "God", value: "God" },
  { label: "Hero", value: "Hero" },
  { label: "Beast", value: "Beast" },
];

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState("");
  const [selectedMythology, setSelectedMythology] = useState<string | undefined>();
    const [selectedType, setSelectedType] = useState<string | undefined>();

  const handlePress = () => console.log("Button pressed!");
  const handleSearch = () => {
    console.log("Поиск:", searchText);
    setResults(`Результаты поиска: ${searchText}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Input value={searchText} onChangeText={setSearchText} onSearch={handleSearch} />

        <AppText variant="title" align="center">
          Welcome to Mythica
        </AppText>

        <AppDropdown
          label="Mythology"
          placeholder="Select mythology"
          options={OPTIONS}
          value={selectedMythology}
          onChange={setSelectedMythology}
        />
          <AppDropdown
            label="TYPE"
            placeholder="Select type"
            options={TYPE}
            value={selectedType}
            onChange={setSelectedType}
          />

        <Button title="Button" onPress={handlePress} />

        <Card>
          <AppText variant="body" align="center">
            текст в карточке
          </AppText>
        </Card>

        <Card overlayImage={afina}>
          <AppText variant="body" align="center">
           Афина
          </AppText>
        </Card>

        <Button title="Secondary Button" variant="secondary" onPress={() => console.log("Secondary pressed")} />

        {results && (
          <AppText variant="small" align="center">
            {results}
          </AppText>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { alignItems: "center", paddingHorizontal: 20, paddingVertical: 20, gap: 10 },
});
