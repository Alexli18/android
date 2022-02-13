import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

export default class Alert extends React.Component{
  constructor(props){
    super(props);
    console.log(props)
    this.state = {
      visible: this.props.visible,
      text: this.props.text
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextState !== this.state || nextProps !== this.props){
        return true
    }
    return false
}

  hideDialog = async () =>{
    await this.setState({visible: false});
    console.log(this.props)
    this.props.navigation.navigate('MyOrders');
      
  };


  render(){

    let { text, visible } = this.state
    return (
      <Provider>
        <View>
          <Portal>
            <Dialog visible={visible} onDismiss={this.hideDialog}>
              <Dialog.Title>תשימו לב</Dialog.Title>
              <Dialog.Content>
                <Paragraph>{text}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={()=>{
                      this.hideDialog()
                } }>המשך</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    );
  }
} 
  


 

