import { useRef, useEffect, useState } from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Animated, TouchableOpacity } from "react-native";

export default function App() {
  const moonAnimation = useRef(new Animated.Value(0)).current;
  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(moonAnimation, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }),
      Animated.timing(moonAnimation, {
        toValue: 2,
        duration: 5000,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      if (finished) {
        setButtonEnabled(true);
      }
    });;
  }, [moonAnimation]);

  const restartAnimation = () => {
    moonAnimation.setValue(0);
    setButtonEnabled(false);
    Animated.sequence([
      Animated.timing(moonAnimation, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }),
      Animated.timing(moonAnimation, {
        toValue: 2,
        duration: 5000,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      if (finished) {
        setButtonEnabled(true);
      }
    });
  };

  const moonLeft = moonAnimation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [-400, 0, 400]
  });
  const skyColor = moonAnimation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['#00A9FF', '#0F2475', '#00A9FF']
  });

  const sunColor = moonAnimation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['#FFCC00', '#F09630', '#FFCC00']
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'default'}/>
      <Animated.View style={[styles.sky, {backgroundColor: skyColor}]}>
        <Text style={styles.tittle}>Eclipse 2024 🌒</Text>
        <View style={styles.animationContainer}>
          <Animated.View style={[styles.sun, {backgroundColor: sunColor}]}></Animated.View>
          <Animated.View style={[styles.moon, {translateX: moonLeft}]}></Animated.View>
        </View>
      {buttonEnabled && 
      <>
        <TouchableOpacity onPress={restartAnimation} style={styles.button}>
          <Text style={styles.buttonText}>Restart Animation</Text>
        </TouchableOpacity>
      </>
      }
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sky: {
    flex: 1,
  },
  animationContainer: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    position: 'relative',
  },
  sun: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  tittle: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 50,
    color: 'white',
  },
  moon: {
    width: 280,
    height: 280,
    backgroundColor: 'grey',
    borderRadius: 140,
    position: 'absolute',
    top: 160,
  },
  button: {
    width: 250,
    height: 80,
    backgroundColor: '#FFCC00',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  }
});