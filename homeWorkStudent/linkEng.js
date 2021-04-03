import * as React from 'react';
import {useContext, Component} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {StudentChooseButton} from '../components/StudentChooseButton';
import firestore from '@react-native-firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';

import {AuthContext} from '../navigaiton/AuthProvider';
import {Input, ListItem, Button} from 'react-native-elements';

class exam extends Component {
  constructor() {
    super();

    this.fireStoreData = firestore()
      .collection('subject_Eng')
      .doc('Name')
      .collection('hw');
    this.state = {
      userArr: [],
      buttonName: '',
    };
  }
  componentDidMount() {
    this.unsubscribe = this.fireStoreData.onSnapshot(this.getCollection);
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const {name, time} = res.data();
      userArr.push({
        key: res.id,
        res,
        name,
        time,
      });
    });
    this.setState({
      userArr,
    });
  };

  render() {
    return (
      <ScrollView style={styles.bg}>
        <View style={styles.container}>
          {this.state.userArr.map((item, i) => {
            return (
              <StudentChooseButton
                title={item.name}
                onPress={() => {
                  this.props.navigation.navigate('hwEng', {text: item.name});
                  this.props.navigation.navigate('hwEng', {
                    timer: item.time,
                  });
                }}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginVertical: 10,
    marginBottom: 15,
  },
  loginButton: {
    marginVertical: 32,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 100,
  },
  bg: {
    backgroundColor: '#E2FCFA',
  },
});

export default exam;
