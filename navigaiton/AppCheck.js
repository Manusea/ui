import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';

import HomeTeacher from '../screens/homeScreenTeacher';
import MakeQuestion from '../screens/makeQuestionScreen';
import HomeStudent from '../screens/homeScreenStudent';
import MakeSubject from '../screens/makeSubjectScreen';
import studentScore from '../screens/studentScore';
import NameExame from '../screens/nameExam';
import ExamTest from '../screens/examTest';
import Subject from '../screens/nameSubject';


import subject_Code from '../SubjectStudentChoose/Code';




import LinkToMath from '../NavToExame/LinkToMath';
import LinkToCode from '../NavToExame/LinkToCode';
import LinkToEng from '../NavToExame/LinkToEng';
import LinkToScience from '../NavToExame/LinkToScience';
import LinkToSoftware from '../NavToExame/LinkToSoftware';

import Math from '../Subject/Math';
import Code from '../Subject/Code'; 
import Science from '../Subject/Science';
import Eng from '../Subject/English';
import Software from '../Subject/SoftwareProcess'

const Stack = createStackNavigator();
var teacher = null;
const list = [];
const loopdata = (user) => {
  list.map((each) => {
    if (each.Email == user.email && each.Teacher) {
      teacher = true;
    } else if (each.Email == user.email && !each.Teacher) {
      teacher = false;
    }
  });
};

export default function checkRoleScreen() {
  const {user} = useContext(AuthContext);
  const [Email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await firestore()
          .collection('Users')
          .get()
          .then((querySnapshot) => {
            // console.log('Total Users: ',querySnapshot.size)
            querySnapshot.forEach((doc) => {
              const {Email, Teacher} = doc.data();
              list.push({
                id: doc.id,
                Email,
                Teacher,
              });
            });
          });

        setEmail(list);
        if (loading) {
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  loopdata(user);

  return teacher ? (
    <>
      <Stack.Navigator initialRouteName="HomeTeacher">
        <Stack.Screen name="HomeTeacher" component={HomeTeacher} />
        <Stack.Screen name="MakeSubject" component={MakeSubject} />
        <Stack.Screen name="MakeQuestion" component={MakeQuestion}/>
        <Stack.Screen name="studentScore" component={studentScore}/>


        <Stack.Screen name="Make Name Exame" component={LinkToMath}/>
        <Stack.Screen name="LinkToCode" component={LinkToCode}/>
        <Stack.Screen name="LinkToEng" component={LinkToEng}/>
        <Stack.Screen name="LinkToScience" component={LinkToScience}/>
        <Stack.Screen name="LinkToSoftwareProcess" component={LinkToSoftware}/>

        <Stack.Screen name="Math" component={Math}/>
        <Stack.Screen name="Code" component={Code}/>
        <Stack.Screen name="Science" component={Science}/>
        <Stack.Screen name="Eng" component={Eng}/>
        <Stack.Screen name="Software" component={Software}/>

      </Stack.Navigator>
    </>
  ) : (
    <>
      <Stack.Navigator initialRouteName="HomeStudent">
        <Stack.Screen name="HomeStudent" component={HomeStudent} />
        <Stack.Screen name="Name Subject" component={Subject} />
        <Stack.Screen name="Name Exame" component={NameExame} />
        <Stack.Screen name="ExamTest" component={ExamTest} />
        <Stack.Screen name="subject_Code" component={subject_Code}/>
        
      </Stack.Navigator>
    </>
   );
}
