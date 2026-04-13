import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
} from "react-native";
import { AppText } from '@/components/ui/AppText';

interface DropdownOption {
  label: string;
  value: string;
}

interface MyDropdownProps {
  label: string;
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
}

const ACCENT = "#DFD4C2";
const TEXT = "#212529";

const DROPDOWN_ANIMATION = {
  OPEN: 180,
  CLOSE: 140,
};

export default function AppDropdown({
  label,
  placeholder = "Select",
  options,
  value,
  onChange,
}: MyDropdownProps) {
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState<any>(null);
  const ref = useRef<View>(null);
  const anim = useRef(new Animated.Value(0)).current;

  const selected = options.find(o => o.value === value)?.label;

  useEffect(() => {
    const sub = Dimensions.addEventListener("change", () => setOpen(false));
    return () => sub.remove();
  }, []);

  const toggle = () => {
    ref.current?.measureInWindow((x, y, width, height) => {
      setLayout({ x, y, width, height });

      const toValue = open ? 0 : 1;
      if (!open) anim.setValue(0);

      setOpen(true);
      Animated.timing(anim, {
        toValue,
        duration: open ? DROPDOWN_ANIMATION.CLOSE : DROPDOWN_ANIMATION.OPEN,
        useNativeDriver: true,
      }).start(() => {
        if (toValue === 0) setOpen(false);
      });
    });
  };

  return (
    <View ref={ref} style={styles.container}>
          <AppText variant="body" color={TEXT} style={styles.text}>
        {label}
      </AppText>

      <TouchableOpacity style={styles.dropdownButton} onPress={toggle}>
        <AppText>
          {selected || placeholder}
        </AppText>

        <AppText variant="body">
          {open ? "▴" : "▾"}
        </AppText>
      </TouchableOpacity>

      {open && layout && (
        <Modal transparent>
          <TouchableWithoutFeedback onPress={toggle}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.dropdown,
              {
                top: layout.y + layout.height + 4,
                left: layout.x,
                width: layout.width,
                opacity: anim,
                transform: [{
                  translateY: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-8, 0],
                  }),
                }],
              },
            ]}
          >
            <FlatList
              data={options}
              keyExtractor={i => i.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.item,
                    item.value === value && styles.selected
                  ]}
                  onPress={() => {
                    onChange(item.value);
                    toggle();
                  }}
                >
                  <AppText variant="body">
                    {item.label}
                  </AppText>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },

    dropdownButton: {
    backgroundColor: ACCENT,
    padding: 12,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.08)",
  },
    text: {
        marginBottom: 10,
    },

  dropdown: {
    position: "absolute",
    backgroundColor: ACCENT,
    borderRadius: 12,
    borderColor: "#000",
    maxHeight: 250,
    overflow: "hidden",
  },

  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#d8cab3",
  },

  selected: {
    backgroundColor: "#eadfcf",
  },
});
