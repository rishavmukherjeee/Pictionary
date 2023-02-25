import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ColorPicker } from 'react-native-color-picker';
import { Ionicons } from '@expo/vector-icons';

export default function PaintApp() {
  const [color, setColor] = useState('#000000');
  const [path, setPath] = useState('');
  const [savedPaths, setSavedPaths] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const svgRef = useRef(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [eraserMode, setEraserMode] = useState(false);

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
      setSavedPaths([...savedPaths, { path, color, eraserMode }]);
      setPath('');
    }
  };

  const handleClear = () => {
    setSavedPaths([]);
  };

  const handleUndo = () => {
    const newSavedPaths = [...savedPaths];
    newSavedPaths.pop();
    setSavedPaths(newSavedPaths);
  };

  const handleToggleEraserMode = () => {
    setEraserMode(!eraserMode);
    setColor(eraserMode ? '#000000' : '#ffffff');
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
            <Path
              key={i}
              d={p.path}
              stroke={p.eraserMode ? '#ffffff' : p.color}
              strokeWidth="5"
              fill="none"
            />
          ))}
          <Path d={path} stroke={eraserMode ? '#ffffff' : color} strokeWidth="5" fill="none" />
        </Svg>
      </View>
      <View style={styles.buttonContainer}>
        {!showColorPicker && (
          <>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: color }]}
              onPress={toggleColorPicker}
            >
              <Text style={styles.buttonText}>Pick a color</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'red' }]}
              onPress={handleClear}
            >
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#333' }]}
              onPress={handleUndo}
            >
              <Ionicons name="arrow-undo" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: eraserMode ? '#ccc' : '#000' },
        ]}
        onPress={handleToggleEraserMode}
      >
        <Text style={styles.buttonText}>
          {eraserMode ? 'Pen' : 'Eraser'}
        </Text>
      </TouchableOpacity>
    </>
  )}
</View>

{showColorPicker && (
<ColorPicker
style={styles.colorPicker}
defaultColor={color}
onColorChange={(newColor) => setColor(newColor)}
/>
)}
</View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  canvasWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  button: {
    width: 80,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  colorPicker: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 220,
  },
});
