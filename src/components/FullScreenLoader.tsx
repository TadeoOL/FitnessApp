import { View, ActivityIndicator, StyleSheet } from 'react-native';

const FullScreenLoader = ({ isVisible = false, color = '#007bff', backgroundColor = 'rgba(0,0,0,0.5)' }) => {
  if (!isVisible) return null;

  return (
    <View style={[styles.overlay, { backgroundColor }]}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={color} testID="loader" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  loaderContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default FullScreenLoader;
