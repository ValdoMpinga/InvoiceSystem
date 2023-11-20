// Import necessary components from 'react-native'
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// Define a simple functional component for "Hello World"
function HelloWorld() {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Hello, World!</Text>
    </View>
  );
}

// Main App component
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        >
        {/* Replace the original content with the HelloWorld component */}
        <HelloWorld />
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles from the original code
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
