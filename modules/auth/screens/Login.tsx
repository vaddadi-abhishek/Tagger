import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  return (
    <LinearGradient
      colors={["#d9ddff", "#ebe6ff", "#b2daffff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Center Section */}
      <View style={styles.centerContent}>
        <Text style={styles.headline}>Organize your bookmarks.</Text>
        <Text style={styles.subheadline}>
          Collect, categorize, and rediscover your saved links effortlessly.
        </Text>

        <Image
          source={require("@/assets/images/3d-doll.png")}
          style={styles.dollImage}
        />
      </View>

      {/* Bottom Curved Panel */}
      <View style={styles.bottomPanel}>
        <Text style={styles.joinText}>Join Tagger</Text>
        <Text style={styles.subtext}>Sign in to continue your journey</Text>

        <TouchableOpacity style={styles.googleButton}>
          <FontAwesome name="google" size={18} color="#fff" />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
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
  dollImage: {
    width: 320,
    height: 320,
    resizeMode: "contain",
  },
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
    borderColor: "rgba(255, 255, 255, 0.9)",
  },
  joinText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111",
    marginBottom: 4,
  },
  subtext: {
    fontSize: 15,
    color: "#555",
    marginBottom: 28,
    fontWeight: "400",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    paddingVertical: 14,
    paddingHorizontal: 34,
    borderRadius: 32,
  },
  googleButtonText: {
    marginLeft: 14,
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
});
