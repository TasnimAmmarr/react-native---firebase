import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import {signOut} from '../utils/auth';
import FormButton from '../components/FormButton';
import { getReclamations } from '../utils/database';

const HomeScreen = ({navigation}) => {
  
  const [allReclamations, setAllReclamation] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getAllReclamations = async () => {
    setRefreshing(true);
    const reclamations = await getReclamations();

    // Transform rec data
    let tempReclamations = [];
    await reclamations.docs.forEach(async reclam => {
      await tempReclamations.push({id: reclam.id, ...reclam.data()});
    });
    await setAllReclamation([...tempReclamations]);

    setRefreshing(false);
  };

  useEffect(() => {
    getAllReclamations();
  }, []);
 
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#f4f4f4',
      position: 'relative',
    }}>
    <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>


    <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          elevation: 4,
          paddingHorizontal: 20,
        }}>
        <Text style={{fontSize: 20, color: 'black'}}>Clean City</Text>
        <Text
          style={{
            fontSize: 20,
            padding: 10,
            color: '#ff4444',
          }}
          onPress={signOut}>
          Deconnexion
        </Text>
      </View>
   
      {/* <View style={{ justifyContent: 'center',
        alignItems: 'center',
        flex: 1,}}>
         <Image source={require('../assets/img.png')} 
         style={{ height: 300,
        width: 300,}}
         resizeMode='contain'
          />
         </View> */}


        {/*  list */}
    <FlatList
        data={allReclamations}
        onRefresh={getAllReclamations}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        style={{
          paddingVertical: 20,
        }}
        renderItem={({item: reclam}) => (
          <View
            style={{
              padding: 20,
              borderRadius: 5,
              marginVertical: 5,
              marginHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'white',
              elevation: 2,
            }}>


            <View style={{flex: 1, paddingRight: 10}}>
              <Text style={{fontSize: 18, color: 'black'}}>
                {reclam.title}
              </Text>
              {reclam.description != '' ? (
                <Text style={{opacity: 0.5}}>{reclam.description}</Text>
              ) : null}
            </View>

            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderRadius: 50,
                backgroundColor: '#4630EB' + '20',
              }}
              onPress={() => {
                navigation.navigate('', {
                  reclamId: reclam.id,
                });
              }}>
              <Text style={{color: '#4630EB'}}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      />


  {/* Button */}
  <FormButton
        labelText="Ajouter"
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          borderRadius: 50,
          paddingHorizontal: 30,
        }}
        handleOnPress={() => navigation.navigate('CreateRecScreen')}
      />
    </SafeAreaView>


  );
};

export default HomeScreen;