import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';


const FormButton = ({
  labelText = '',
  handleOnPress = null,
  style,
  isPrimary = true,
  ...more
}) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 8,
        backgroundColor: '#1a759f',
        borderWidth: 1,
        borderColor: '#1a759f',
        borderRadius: 10,
        ...style,
      }}
      activeOpacity={0.9}
      onPress={handleOnPress}
      {...more}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          color:'#FFFFFF'
        }}>
        {labelText}
      </Text>
    </TouchableOpacity>
  );
};

export default FormButton;