import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { ColorPicker } from 'react-native-color-picker';

export default function PaintApp() {
  const [color, setColor] = useState('#000000');
  const [path, setPath] = useState('');
  const [savedPaths, setSavedPaths] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const svgRef = useRef(null);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handlePress = (event) => {
    setIsDrawing(true);
    setPath(`M${event.nativeEvent.locationX},${event.nativeEvent.locationY}`);
  };

  const handleMove = (event) => {
    if (isDrawing) {
      setPath(`${path} L${event.nativeEvent.locationX},${event.nativeEvent.locationY}`);
    }
  };

  const handleRelease = () => {
    setIsDrawing(false);
    if (path) {
      setSavedPaths([...savedPaths, path]);
      setPath('');
    }
  };
  const handleClear = () => {
    setSavedPaths([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvasWrapper}>
        <Svg
          ref={svgRef}
          width="100%"
          height="100%"
          onTouchStart={handlePress}
          onTouchMove={handleMove}
          onTouchEnd={handleRelease}
        >
          {savedPaths.map((p, i) => (
            <Path key={i} d={p} stroke={color} strokeWidth="5" fill="none" />
          ))}
          <Path d={path} stroke={color} strokeWidth="5" fill="none" />
        </Svg>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={toggleColorPicker}>
          <Text style={styles.buttonText}>Pick a color</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      {showColorPicker && (
        <ColorPicker
          onColorSelected={(color) => setColor(color)}
          style={{ height: 200, width: 200 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvasWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});
