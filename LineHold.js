import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export default function PaintApp() {
  const [path, setPath] = useState([]);
 
  const handleTouch = (event) => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const newPath = [...path, { x: locationX, y: locationY }];
   
    setPath(newPath);
  };

  const handleClear = () => {
    setPath([]);
  };

  const canvas = useRef(null);
  const renderPath = () => {
    if (!path || path.length === 0) {
      return null;
    }
  
    const pathData = path.map((point, index) => {
      if (index === 0 ) {
        return `M ${point.x} ${point.y}`;
      } else {
        return `L ${point.x} ${point.y}`;
      }
    }).join(' ');
    
    return (
      <View style={styles.canvasWrapper}>
        <Svg width="100%" height="100%">
          <Path key={Date.now()} d={pathData} stroke="black" strokeWidth="3" fill="none" />
        </Svg>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvasWrapper} ref={canvas}>
        {renderPath()}
      </View>
      <View style={styles.buttonContainer}>
        
      </View>
      <View style={styles.invisibleLayer} onTouchStart={handleTouch} onTouchMove={handleTouch} />
      <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
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
  },
  invisibleLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
