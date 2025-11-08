import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 60;
const TAB_COLOR = '#ffffff';
const ACTIVE_COLOR = '#487eb0';
const INACTIVE_COLOR = '#8e8e93';

// A map to associate route names with their icons
const ICONS: Record<string, React.ComponentProps<typeof FontAwesome5>['name']> = {
  index: 'home',
  category: 'th-large',
  add: 'plus',
  collab: 'users',
  settings: 'cog',
};

/**
 * A custom animated tab bar component built with Reanimated.
 */
function CustomAnimatedTabBar({ state, descriptors, navigation }) {
  const { routes, index: activeIndex } = state;
  const tabWidth = SCREEN_WIDTH / routes.length;

  // Shared value to track the horizontal position of the indicator
  const translateX = useSharedValue(0);

  // Update the indicator's position with a spring animation when the active tab changes
  React.useEffect(() => {
    const newPosition = activeIndex * tabWidth + (tabWidth / 2);
    translateX.value = withSpring(newPosition, { damping: 15, stiffness: 120 });
  }, [activeIndex, tabWidth, translateX]);

  // Animated style for the sliding dot indicator
  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.tabBarContainer}>
      <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
      {routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = activeIndex === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={styles.tabItem}
          >
            <FontAwesome5
              name={ICONS[route.name] ?? 'circle'}
              size={22}
              color={isFocused ? ACTIVE_COLOR : INACTIVE_COLOR}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      // Use our custom component for the tab bar
      tabBar={props => <CustomAnimatedTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="category" options={{ title: 'Category' }} />
      <Tabs.Screen name="add" options={{ title: 'Create Bookmark' }} />
      <Tabs.Screen name="collab" options={{ title: 'Collab' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: TAB_BAR_HEIGHT,
    backgroundColor: TAB_COLOR,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Elevation for Android
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    bottom: 8,
    left: -4, // Start centered on the first tab
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ACTIVE_COLOR,
  },
});
