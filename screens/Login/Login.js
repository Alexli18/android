import React from 'react';
import { View, Text, AppRegistry, Button, StyleSheet, Image ,Alert} from 'react-native';
import InputCustom from '../../shared/Input/Input';
import { login, getBarbers } from '../../Api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BarberLogo from '../../assets/BarberLogo';

import InputField from '../../shared/Input/InputField';

import {
    Container,
    FormArea,
    CustomButton,
    CustomButtonText,
    SignMessage,
    SignMessageText,
    SignMessageTextBold,
  } from './styles';






const styles = StyleSheet.create({
    container: {
        backgroundColor: "#dce8e1",
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {

    }
})


export default class LoginComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            phoneNum: "",
            isValid: false 
        }
    }   

    



    async componentDidMount(){
        // let token = await AsyncStorage.getItem('token');
        // if(token == undefined){
        //     AsyncStorage.removeItem('token');
        //     return
        // }
        // if(token !== null){
        //     this.props.navigation.navigate('Home');
        // }else{
        //     return
        // }
    }

    getName = (data) => {
        this.setState({
            name: data
        });
        
    }
    
    getPhone = async (data) => {
        try{
            if(data){

                let isValid = data.length==10 ? true : false;
                await this.setState({isValid});
            }
            // alert(JSON.stringify(data))
            await this.setState({
                phoneNum: data
            })
        }catch(err){
            console.log(err)
        }
    }

    sendUserData = async () => {
       let { isValid } = this.state;
        try{
            if(isValid){
                await login(this.state);
                // alert(this.state.phoneNum)
                this.props.navigation.navigate('Home') 
            }else{
            //    todo add alert component
              //  alert("only numbers");
                await this.setState({
                    phoneNum: ''
                })
            }
        }catch(err){
            console.log(err)
        }
    }

//    export default function bphonenumber(inputtxt)
// {
//   var phoneno = /^\d{10}$/;
//   if((inputtxt.value.match(phoneno))
//         {
//       return true;
//         }
//       else
//         {
//         alert("message");
//         return false;
//         }
// }


    render(){
        return(
            <View style={styles.container}>
                <Image
                        style={{
                          resizeMode: "contain",
                          height: 400,
                          width: 350,
                          justifyContent: 'center',
                          alignItems: 'center',
                        
                       }}
                        source={require('../../assets/newlogo.png')}/>

                 <InputCustom
                    
                    text = {"שם מלא"}
                    func = {this.getName.bind(this)}
                ></InputCustom>
                <InputCustom
                     
                    text = {"מספר טלפון נייד"}
                    func = {this.getPhone.bind(this)}
                ></InputCustom>
                <Button
                    style={styles.button}
                    color="#268596"
                    title = {"המשך"}
                    onPress = {()=>{
                      
                        this.sendUserData()
                    }}
                >
                </Button> 
     
            </View>
        )
    }
}

AppRegistry.registerComponent('LoginComponent', () => LoginComponent)