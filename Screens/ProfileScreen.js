import React, {useContext} from 'react';
import UserContext from '../Context/UserContext';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

const {width, height} = Dimensions.get('window');

function ProfileScreen({navigation, route}) {
  const [username, setUsername] = React.useState(
    (route.params && route.params.username) || '',
  );
  const [mobilenumber, setMobilenumber] = React.useState(
    (route.params && route.params.mobilenumber) || '',
  );
  const [address, setAddress] = React.useState(
    (route.params && route.params.address) || '',
  );
  const [profileimage, setprofileimage] = React.useState(
    (route.params && route.params.profileimage) || null,
  );

  const id = route.params && route.params.id;

  const {addUser, editUser} = useContext(UserContext);

  const selectImage = () => {
    let options = {
      title: 'You can choose one image',
      noData: true,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (!response.didCancel && !response.error) {
        setprofileimage(response.uri);
      }
    });
  };

  const ImageThumbNail = () => {
    return (
      <TouchableOpacity onPress={selectImage}>
        {profileimage === null ? (
          <Image
            style={styles.imageThumbnailContainer}
            source={require('../Assests/dummyimage.png')}
          />
        ) : (
          <Image
            style={styles.imageThumbnailContainer}
            source={{uri: profileimage}}
          />
        )}
      </TouchableOpacity>
    );
  };

  const addUserData = () => {
    if (id) {
      if (username && mobilenumber && address && profileimage) {
        editUser({id, username, mobilenumber, address, profileimage});
        navigation.goBack();
      }
    } else {
      if (username && mobilenumber && address && profileimage) {
        addUser({username, mobilenumber, address, profileimage});
        navigation.goBack();
      } else {
        Toast.showWithGravity(
          'Please Enter All fields',
          Toast.LONG,
          Toast.BOTTOM,
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageThumbNail />

        <TextInput
          placeholder="UserName"
          onChangeText={setUsername}
          placeholderTextColor={'gray'}
          underlineColorAndroid={'transparent'}
          value={username}
          style={styles.input}
        />

        <TextInput
          placeholder="Mobilenumber"
          placeholderTextColor={'gray'}
          onChangeText={setMobilenumber}
          underlineColorAndroid={'transparent'}
          style={styles.input}
          maxLength={10}
          value={mobilenumber}
          keyboardType={'numeric'}
        />

        <TextInput
          placeholder="Address"
          onChangeText={setAddress}
          multiline
          placeholderTextColor={'gray'}
          underlineColorAndroid={'transparent'}
          style={styles.input}
          value={address}
        />
        <TouchableOpacity style={styles.button} onPress={addUserData}>
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageThumbnailContainer: {
    width: 150,
    height: 150,
    backgroundColor: 'green',
    borderRadius: 75,
    marginTop: 50,
    marginBottom: 50,
    alignSelf: 'center',
  },
  input: {
    width: width * 0.8,
    borderWidth: 1,
    borderColor: 'silver',
    marginTop: 16,
    borderRadius: 5,
    alignSelf: 'center',
    color: 'gray',
    paddingLeft: 8,
  },
  button: {
    width: width * 0.8,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
    paddingVertical: 16,
    borderRadius: 5,
  },
  text: {
    color: 'white',
  },
});

export default ProfileScreen;
