import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ColorPicker from './ColorPicker';

const PaintApp=()=> {
  const [color, setColor] = useState('#000000');
  const [path, setPath] = useState('');
  const [savedPaths, setSavedPaths] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const svgRef = useRef(null);
  const [eraserMode, setEraserMode] = useState(false);

  const colo = (color) => {
    setColor(color);
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
       
          <>
          <ColorPicker onSelectColor={colo} />

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
              <Text style={styles.buttonText}>Undo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: eraserMode ? '#ccc' : '#fff' },
        ]}
        onPress={handleToggleEraserMode}
      >
        <Text style={styles.ebuttonText}>
          {eraserMode ? 'Pen' : 'Eraser'}
        </Text>
      </TouchableOpacity>
    </>
    
</View>

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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 1,
    paddingBottom: 8,
    paddingTop: 8,
    paddingVertical: 'auto',
    marginEnd: 8,
    marginStart: 8,
    resizeMode: 'contain',
  },
  button: {
    width: 50,
    height: 40,
    paddingVertical:'auto',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    marginHorizontal: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ebuttonText: {
    color: '#000',
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
export default PaintApp;