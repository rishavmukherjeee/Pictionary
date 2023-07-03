import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ColorPicker = ({ onSelectColor }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000', '#FFFFFF'];

  const openColorPicker = () => {
    setModalVisible(true);
  };

  const selectColor = (color) => {
    onSelectColor(color);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#333777' }]}
        onPress={openColorPicker}
      >
        <Text style={styles.buttonText}>Pick a Color</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[styles.colorBox, { backgroundColor: color }]}
                onPress={() => selectColor(color)}
              />
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    bottom: '20%',
  },
  colorBox: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 50,
    borderWidth: 1,
  },
});

export default ColorPicker;
