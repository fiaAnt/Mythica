import { AppText } from '@/components/ui/AppText';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface DropdownOption {
  label: string;
  value: string;
}

interface Layout {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface AppDropdownProps {
  label: string;
  placeholder?: string;
  options: Record<string, string> | readonly DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
}

const ACCENT = '#DFD4C2';
const TEXT = '#212529';

export default function AppDropdown({
  label,
  placeholder = 'Select',
  options,
  value,
  onChange,
}: AppDropdownProps) {
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState<Layout | null>(null);
  const ref = useRef<View>(null);
  const anim = useRef(new Animated.Value(0)).current;
  const optionsArray = Array.isArray(options)
    ? options
    : Object.entries(options).map(([label, value]) => ({ label, value }));
  const selected = optionsArray.find((o) => o.value === value);
  const topDistance = 4;
  useEffect(() => {
    const sub = Dimensions.addEventListener('change', () => setOpen(false));
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
        duration: open ? 140 : 180,
        useNativeDriver: true,
      }).start(() => {
        if (toValue === 0) setOpen(false);
      });
    });
  };

  return (
    <View ref={ref} style={styles.container}>
      <AppText variant="body" color={TEXT}>
        {label}
      </AppText>

      <TouchableOpacity style={styles.input} onPress={toggle}>
        <AppText>{selected?.label || placeholder}</AppText>

        <AppText variant="body">{open ? '▴' : '▾'}</AppText>
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
                top: layout.y + layout.height + topDistance,
                left: layout.x,
                width: layout.width,
                opacity: anim,
                transform: [
                  {
                    translateY: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-8, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <FlatList
              data={optionsArray}
              keyExtractor={(i) => i.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.item, item.value === value && styles.selected]}
                  onPress={() => {
                    onChange(item.value);
                    toggle();
                  }}
                >
                  <AppText variant="body">{item.label}</AppText>
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
  container: { width: '100%', gap: 6 },
  input: {
    backgroundColor: ACCENT,
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.08)' },
  dropdown: {
    position: 'absolute',
    backgroundColor: ACCENT,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d2c4ae',
    elevation: 4,
    maxHeight: 250,
    overflow: 'hidden',
    zIndex: 1000,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#d8cab3',
  },
  selected: { backgroundColor: '#eadfcf' },
});
