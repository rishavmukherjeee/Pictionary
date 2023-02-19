import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { ColorPicker } from 'react-native-color-picker';

export default function PaintApp() {
  const [color, setColor] = useState('#000000');
  const [savedPaths, setSavedPaths] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const svgRef = useRef(null);

  const handlePress = (event) => {
    setIsDrawing(true);
    const { locationX, locationY } = event.nativeEvent;
    svgRef.current && svgRef.current.setNativeProps({ d: `M${locationX},${locationY}` });
  };

  const handleMove = (event) => {
    if (isDrawing) {
      const { locationX, locationY } = event.nativeEvent;
      svgRef.current && svgRef.current.setNativeProps({ d: `${svgRef.current.props.d} L${locationX},${locationY}` });
    }
  };

  const handleRelease = () => {
    setIsDrawing(false);
    if (svgRef.current && svgRef.current.props.d) {
      setSavedPaths([...savedPaths, svgRef.current.props.d]);
      svgRef.current.setNativeProps({ d: '' });
    }
  };

  const handleClear = () => {
    setSavedPaths([]);
    svgRef.current.setNativeProps({ d: '' });
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
    svgRef.current.setNativeProps({ d: '' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvasWrapper}>
        <Svg
          ref={svgRef}
          width="100%"
          height="100%"
          stroke={color}
          strokeWidth="5"
          fill="none"
        />
        <ColorPicker
          onColorChange={handleColorChange}
          color={color}
          style={styles.colors}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
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
  colors: {
    height: 150,
    position: 'absolute',
    bottom: 0,
    left: 0,
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
  },
});