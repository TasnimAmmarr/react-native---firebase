import React, {useState} from 'react'
import {View, Text, SafeAreaView, ToastAndroid} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {createRec} from '../utils/database';

const CreateRecScreen = ({navigation}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleRecSave = async () => {
      const currentRecId = Math.floor(100000 + Math.random() * 9000).toString();
      // Save to firestore
      await createRec(currentRecId, title, description);

        // Navigate to Add Rec string
        navigation.navigate('AddRecScreen', {
          currentRecId: currentRecId,
          currentRecTitle: title,
        });
    
        // Reset
        setTitle('');
        setDescription('');
        ToastAndroid.show('Reclamation Saved', ToastAndroid.SHORT);
      };
    
      return (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 20,
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginVertical: 20,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Create Reclamation
          </Text>
    
          <FormInput
            labelText="Title"
            placeholderText="enter reclamation title"
            onChangeText={val => setTitle(val)}
            value={title}
          />
          <FormInput
            labelText="Description"
            placeholderText="enter reclamation description"
            onChangeText={val => setDescription(val)}
            value={description}
          />
    
          <FormButton labelText="Enregistrer" handleOnPress={handleRecSave} />

        </SafeAreaView>
      );
    };

export default CreateRecScreen
