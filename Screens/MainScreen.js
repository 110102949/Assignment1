import React, {useContext} from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import UserContext from '../Context/UserContext';

const EmptyContainer = ({navigation}) => {
  const navigateToProfile = () => {
    navigation.navigate('ProfileScreen');
  };
  return (
    <View style={styles.emptycontainer}>
      <TouchableOpacity
        style={styles.chipContainer}
        onPress={navigateToProfile}>
        <Text style={styles.textcolor}>Add User Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const Item = props => {
  const navigateToProfileDetails = () => {
    props.navigation.navigate('ProfileScreen', {
      id: props.id,
      username: props.username,
      mobilenumber: props.mobilenumber,
      address: props.address,
      profileimage: props.profileimage,
    });
  };

  return (
    <TouchableOpacity style={styles.item} onPress={navigateToProfileDetails}>
      <Image style={styles.image} source={{uri: props.profileimage}} />

      <View style={styles.detailsContainer}>
        <Text style={styles.detailItem}>{props.username}</Text>
        <Text style={styles.detailItem}>{props.mobilenumber}</Text>
        <Text style={styles.detailItem}>{props.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const UserDetailsContainer = ({data, navigation}) => {
  const navigateToProfileDetails = () => {
    navigation.navigate('ProfileScreen');
  };

  const renderDetailsData = ({item}) => (
    <Item navigation={navigation} {...item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderDetailsData}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        style={[styles.chipContainer, styles.btn_absolute]}
        onPress={navigateToProfileDetails}>
        <Text style={styles.textcolor}>Add User</Text>
      </TouchableOpacity>
    </View>
  );
};

const MainScreen = ({navigation}) => {
  const {data} = useContext(UserContext);

  if (data.length === 0) {
    return <EmptyContainer navigation={navigation} />;
  } else {
    return <UserDetailsContainer data={data} navigation={navigation} />;
  }
};

const styles = StyleSheet.create({
  emptycontainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chipContainer: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: 'green',
  },
  textcolor: {
    color: 'white',
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
  },
  title: {
    fontSize: 32,
  },
  btn_absolute: {
    position: 'absolute',
    bottom: 10,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: 'pink',
    borderRadius: 25,
    alignItems: 'center',
  },
  detailsContainer: {
    marginLeft: 16,
    flex: 1,
    paddingLeft: 8,
  },
  detailItem: {
    marginTop: 4,
  },
});

export default MainScreen;
