import React from 'react';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { getBarberServicesByBarberId, getUserOrdersData } from '../../Api/api';
import { View,  ScrollView, StyleSheet, Image, SafeAreaView, TouchableOpacity  } from 'react-native';
import { BASE_URL } from '../../config/config';

import Alert from '../Alert/Alert' ;

import BottomBar from '../../components/BottomTabBar/BottomBar';

import ServiceItem from '../ServiceItem/ServiceItem';

import ServiceSwiper from '../ServiceSwiper/ServiceSwiper';

import ModalDateTimePicker from '../ModalDateTimePicker/ModalDateTimePicker';


export default class BarberService extends React.Component{
    constructor(props, {navigation}){
        super(props);
        this.state = {
            name: this.props.route.params.barber.name,
            avatar: this.props.route.params.barber.avatar,
            id: this.props.route.params.barber._id,
            services: [],
            showModal: false,
            selectedService: '',
            userOrders: [],
            showAlert: false
        }
    }

    async componentDidMount(){
        try{

            let barberId = this.state.id;
            let services = await getBarberServicesByBarberId(barberId);
            console.log(services)
            let userOrders = await getUserOrdersData();

            await this.setState({userOrders:userOrders.data})
            await this.setState({services});
        }catch(err){ console.log(err) }
    }


    toggleModal(){
        let showModal = this.state.showModal;
        showModal = !showModal;
        this.setState({showModal})
    }

    // clicOnCloseAlert(e){
    //     this.props.navigation.navigate('MyOrders');
    // }
    shouldComponentUpdate(nextProps, nextState){
        if(nextState !== this.state || nextProps !== this.props){
            return true
        }
        if(nextState.showAlert !== this.state.showAlert || nextProps !== this.props){
            return true
        }
        return false
    }


    async openAlert(){
        await this.setState({showAlert: true})
    }

    async navigateToOrder(service){
        let userOrdersCount = this.state.userOrders?.length;
        console.log(this.state)

        if(userOrdersCount>2){

            console.log("**************************************")
            console.log(this.state.userOrders)
            console.log("**************************************")

           await this.openAlert()
            // this.props.navigation.navigate('MyOrders');
        }else{
            this.setState({selectedService: service})
            this.toggleModal();
        }
        

    }
   
    renderServices(services){
        return services.map((service, idx)=>{
            return (
                    <TouchableOpacity 
                        key={idx}
                        onPress = {()=>this.navigateToOrder(service)}
                        style={{marginTop: 50}}
                    >
                        <ServiceItem service={service}/>
                    </TouchableOpacity>
                    )
        })
    }

    render(){
        let services = this.state.services;
        let avatar = this.state.avatar;
        let show = this.state.showModal;
        let service = this.state.selectedService;
        let barberId = this.state.id;
        let showAlert  = this.state.showAlert;
        console.log(this.state)
        let navigation = this.props.navigation;
        return(
            <SafeAreaView style={{backgroundColor: "#dce8e1", flex: 1, height: '100%'}}>
                <ScrollView > 
                <ServiceSwiper/>
                <View style={{
                    backgroundColor: '#fff', 
                    borderTopLeftRadius: 50, 
                    marginTop: -50, 
                    width: '100%',
                    position: 'fixed',
                    height: '75%',
                    bottom: 0
                    
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: -35
                    }}>
                        <Image source={{uri: BASE_URL+avatar}}
                            style={{
                                width: 150, 
                                height: 150, 
                                borderTopLeftRadius: 50, 
                                marginLeft: 20, 
                                marginRight: 20,
                                borderWidth: 4,
                                borderColor: 'green'
                            }}
                        />
                    </View>
                {
                    this.renderServices(services)
                }
                </View>
                <ModalDateTimePicker 
                    show = {show}
                    func = {this.toggleModal.bind(this)}
                    service = { service }
                    avatar = { avatar }
                    barberId = { barberId }    
                    navigation = { this.props.navigation }
                />
                 {
                    this.state.showAlert && <Alert 
                     visible={true}
                     navigation={navigation}
                     text={'יש לך 3 הזמנות כרגע'}
                     // func = { this.clicOnCloseAlert.bind(this) }
                 />
                 }
                </ScrollView>
                <BottomBar navigation = {this.props.navigation}/>
            </SafeAreaView>
        )
    }
} 