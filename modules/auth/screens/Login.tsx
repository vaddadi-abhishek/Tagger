import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  // Animated values for each social icon
  const icon1 = useRef(new Animated.Value(0)).current;
  const icon2 = useRef(new Animated.Value(0)).current;
  const icon3 = useRef(new Animated.Value(0)).current;
  const icon4 = useRef(new Animated.Value(0)).current;

  // Floating animation function
  const floatingAnimation = (animatedValue, delay = 0) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 3000,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    floatingAnimation(icon1, 0);
    floatingAnimation(icon2, 500);
    floatingAnimation(icon3, 1000);
    floatingAnimation(icon4, 1500);
  }, []);

  // Helper to interpolate vertical floating motion
  const float = (anim) =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -10], // moves up and down slightly
    });

  return (
    <LinearGradient
      colors={["#d9ddff", "#ebe6ff", "#b2daffff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* ABSTRACT BLUR SHAPES */}
      <View style={styles.blobContainer}>
        <View style={styles.orangeBlob} />
        <BlurView intensity={65} tint="light" />

        <View style={styles.purpleBlob} />
        <BlurView intensity={55} tint="light" />
      </View>

      {/* Center Section */}
      <View style={styles.centerContent}>
        <Text style={styles.headline}>Organize your bookmarks.</Text>
        <Text style={styles.subheadline}>
          Collect, categorize, and rediscover your saved links effortlessly.
        </Text>

        <View style={styles.dollContainer}>
          <Image
            source={require("@/assets/images/3d-doll.png")}
            style={styles.dollImage}
          />

          {/* Animated Floating Social Icons */}
          <Animated.Image
            source={{
              uri: "https://img.icons8.com/?size=100&id=gxDo9YXCsacn&format=png&color=000000",
            }}
            style={[
              styles.socialIcon,
              styles.icon1,
              { transform: [{ translateY: float(icon1) }] },
            ]}
          />
          <Animated.Image
            source={{
              uri: "https://img.icons8.com/?size=100&id=oaaSr6h7kwm6&format=png&color=000000",
            }}
            style={[
              styles.socialIcon,
              styles.icon2,
              { transform: [{ translateY: float(icon2) }] },
            ]}
          />
          <Animated.Image
            source={{
              uri: "https://img.icons8.com/?size=100&id=nj0Uj45LGUYh&format=png&color=000000",
            }}
            style={[
              styles.socialIcon,
              styles.icon3,
              { transform: [{ translateY: float(icon3) }] },
            ]}
          />
          <Animated.Image
            source={{
              uri: "https://img.icons8.com/?size=100&id=wNk5l8VVfBQF&format=png&color=000000",
            }}
            style={[
              styles.socialIcon,
              styles.icon4,
              { transform: [{ translateY: float(icon4) }] },
            ]}
          />
        </View>
      </View>

      {/* Bottom Panel */}
      <BlurView intensity={55} tint="prominent" style={styles.bottomPanel}>
        <Text style={styles.subtext}>Sign in to continue your journey</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.authButton}>
            <FontAwesome name="google" size={18} color="#fff" />
            <Text style={styles.authButtonText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authButton}>
            <FontAwesome name="apple" size={18} color="#fff" />
            <Text style={styles.authButtonText}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </LinearGradient>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-end" },

  /* BLUR SHAPES */
  blobContainer: {
    position: "absolute",
    width: width,
    height: 400,
    top: 300,
  },
  orangeBlob: {
    position: "absolute",
    width: 360,
    height: 200,
    backgroundColor: "#ff8f3f",
    opacity: 0.45,
    borderRadius: 220,
    top: 30,
    left: -60,
    transform: [{ rotate: "-18deg" }],
  },
  purpleBlob: {
    position: "absolute",
    width: 300,
    height: 160,
    backgroundColor: "#9e7aff",
    opacity: 0.35,
    borderRadius: 200,
    top: 120,
    right: -40,
    transform: [{ rotate: "14deg" }],
  },

  /* UI CONTENT */
  centerContent: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    bottom: 160,
  },
  headline: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
    lineHeight: 40,
    marginBottom: 10,
  },
  subheadline: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "400",
    maxWidth: 320,
  },
  dollContainer: {
    width: 320,
    height: 320,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  dollImage: {
    width: 320,
    height: 320,
    resizeMode: "contain",
  },
  socialIcon: {
    position: "absolute",
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  icon1: {
    top: 0,
    left: 40,
    transform: [{ rotate: "-15deg" }],
  },
  icon2: {
    top: 40,
    right: 10,
    transform: [{ rotate: "15deg" }],
  },
  icon3: {
    bottom: 50,
    left: 30,
    transform: [{ rotate: "10deg" }],
  },
  icon4: {
    bottom: 10,
    right: 30,
    transform: [{ rotate: "-10deg" }],
  },

  /* BOTTOM PANEL */
  bottomPanel: {
    width,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 60,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
  },
  subtext: { fontSize: 15, color: "#555", marginBottom: 28 },
  buttonContainer: {
    gap: 16,
  },
  authButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
    paddingVertical: 14,
    paddingHorizontal: 34,
    borderRadius: 32,
    width: width * 0.7,
  },
  authButtonText: {
    marginLeft: 14,
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
});
