import firestore from '@react-native-firebase/firestore';

export const createRec = (currentRecId, title, description) => {
    return firestore().collection('Reclamations').doc(currentRecId).set({
      title,
      description,
    });
  };

  // Create new question for current quiz
export const createForm = (currentRecId, currentNomId, Nom) => {
  return firestore()
    .collection('Reclamations')
    .doc(currentRecId)
    .collection('Form')
    .doc(currentNomId)
    .set(Nom);
};

// Get All Reclamation
export const getReclamations = () => {
  return firestore().collection('Reclamation').get();
};
