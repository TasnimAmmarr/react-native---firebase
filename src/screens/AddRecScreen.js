import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { createForm } from '../utils/database';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const AddRecScreen = ({navigation, route}) => {

const [currentRecId, setCurrentRecId] = useState(
    route.params.currentRecId,
  );
  const [currentRecTitle, setCurrentRecTitle] = useState(
    route.params.currentRecTitle,
  );

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [cin, setCin] = useState('');
  const [adresse, setAdresse] = useState('');
  const [sujet, setSujet] = useState('');
  const [imageUri, setImageUri] = useState('');

  const handleRecSave = async () => {
    if (
      nom == '' ||
      prenom == '' ||
      cin == '' ||
      adresse == '' ||
      sujet == ''
    ) {
      return;
    }

    let currentNomId = Math.floor(
        100000 + Math.random() * 9000,
      ).toString();


       // Upload Image
    let imageUrl = '';

    if (imageUri != '') {
      const reference = storage().ref(
        `/images/Form/${currentRecId}_${currentNomId}`,
      );
      await reference.putFile(imageUri).then(() => {
        console.log('Image Uploaded');
      });
      imageUrl = await reference.getDownloadURL();
    }



      // Add form to db
      await createForm(currentRecId, currentNomId, {
        nom: nom,
        prenom: prenom,
        cin: cin,
        adresse: adresse,
        sujet: sujet,
        imageUrl: imageUrl
      });
      ToastAndroid.show('From saved', ToastAndroid.SHORT);
  
      // Reset
      setQuestion('');
      setCorrectAnswer('');
      setOptionTwo('');
      setOptionThree('');
      setOptionFour('');
      setImageUri('');
    };

    const selectImage = () => {
        launchImageLibrary(
          {
            mediaType: 'photo',
          },
          ({assets}) => {
            if (assets && assets.length > 0) {
              setImageUri(assets[0].uri);
            }
          },
        );
      };
    return (
        <KeyboardAvoidingView
        style={{
          flex: 1,
        }}>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <View style={{padding: 20}}>
            <Text
              style={{fontSize: 20, textAlign: 'center', color: 'black'}}>
              Details
            </Text>
            <Text style={{textAlign: 'center', marginBottom: 20}}>
              Pour {currentRecTitle}
            </Text>
  
            <FormInput
              labelText="Adresse"
              placeholderText="enter Nom"
              onChangeText={val => setNom(val)}
              value={nom}
            />
  
    
  
            {/* Prenom */}
            <View style={{marginTop: 30}}>
              <FormInput
                labelText="Nom et Prenom"
                onChangeText={val => setPrenom(val)}
                value={prenom}
              />
              <FormInput
                labelText="CIN"
                onChangeText={val => setCin(val)}
                value={cin}
              />
              <FormInput
                labelText="Num Tel"
                onChangeText={val => setAdresse(val)}
                value={adresse}
              />
              <FormInput
                labelText="Sujet"
                onChangeText={val => setSujet(val)}
                value={sujet}
              />
            </View>


 {/* Image upload */}

 {imageUri == '' ? (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 28,
                backgroundColor: '#4630EB' + '20',
              }}
              onPress={selectImage}>
              <Text style={{opacity: 0.5, color: '#4630EB'}}>
                + ajouter image
              </Text>
            </TouchableOpacity>
          ) : (
            <Image
              source={{
                uri: imageUri,
              }}
              resizeMode={'cover'}
              style={{
                width: '100%',
                height: 200,
                borderRadius: 5,
              }}
            />
          )}



            <FormButton
              labelText="Enregistrer Reclamation"
              handleOnPress={handleRecSave}
            />
            <FormButton
              labelText="Enregistrer <=="
              isPrimary={false}
              handleOnPress={() => {
                setCurrentRecId('');
                navigation.navigate('HomeScreen');
              }}
              style={{
                marginVertical: 20,
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
}
export default AddRecScreen
