import { StyleSheet, Text, View } from 'react-native';

export default function CollabScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collab Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' },
});

