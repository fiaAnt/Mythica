import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Bar } from "@/components/ui/Bar";
import { Input } from "@/components/ui/Input";
import { CardList } from "@/components/ui/CardList";
import { AppDropdown } from "@/components/ui/AppDropdown";
import { AppText } from "@/components/ui/AppText";
import { Toggle } from "@/components/Toggle";
import afina from "@assets/images/afina.png";
import searchIcon from '@assets/images/search.png';
import user from "@assets/images/user.png";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

const CARDS = [
    { id: "1", title: "Афина", image: afina },
    { id: "2", title: "Зевс" },
    { id: "3", title: "Тор" },
    { id: "4", title: "Ра" },
];

export default function HomeScreen() {
    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState("");
    const [selectedMythology, setSelectedMythology] = useState<string | undefined>();
    const [selectedType, setSelectedType] = useState<string | undefined>();
    const insets = useSafeAreaInsets()
    
    
    const handleSearch = () => {
        console.log("Поиск:", searchText);
        setResults(`Результаты поиска: ${searchText}`);
    };
    
    return (
            <View style={[styles.container, { paddingTop: insets.top }]}>
            
            <CardList
                data={CARDS}
                header={
                    <View style={styles.scrollContent}>
                    <Bar path = '/profile' title= 'Mythica' icon = {user}/>
                        <Input
                            value={searchText}
                            onChangeText={setSearchText}
                            onSearch={handleSearch}
                    icon={searchIcon}
                        />
                        
                        <View style={styles.dropdownRow}>
                            <AppDropdown
                                label="Mythology"
                                placeholder="Select mythology"
                                options={OPTIONS}
                                value={selectedMythology}
                                onChange={setSelectedMythology}
                            />
                            <AppDropdown
                                label="Type"
                                placeholder="Select type"
                                options={TYPE}
                                value={selectedType}
                                onChange={setSelectedType}
                            />
                        </View>
                        
                        <Toggle />
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
    scrollContent: {
        gap: 10,
    },
    dropdownRow: {
        flexDirection: 'row',
        gap: 10,
    },
});
