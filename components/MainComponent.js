import React, {Component} from 'react';
import Directory from './DirectoryComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import Order from './OrderComponent';
import {
    View,
    Platform,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    Alert,
    ToastAndroid,
  } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {Icon} from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import NetInfo from '@react-native-community/netinfo';
import {connect} from 'react-redux';
import {
    fetchProducts,
    fetchCarousels,
  } from '../redux/ActionCreators';

  const mapDispatchToProps = {
    fetchProducts,
    fetchCarousels,
  };

  const DirectoryNavigator = createStackNavigator (
    {
      Directory: { screen: Directory},
    },
  {
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: '#5637DD',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
          headerLeft: (
            <Icon
              name="list"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer ()}
            />
            ),
          }),
        }
      );
      
    const HomeNavigator = createStackNavigator (
        {
          Home: {screen: Home},
        },
        {
          defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
              backgroundColor: '#5637DD',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: '#fff',
            },
            headerLeft: (
              <Icon
                name="home"
                type="font-awesome"
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer ()}
              />
            ),
          }),
        }
      );
      const OrderNavigator = createStackNavigator (
        {
          Order: {screen: Order},
        },
        {
          defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
              backgroundColor: '#5637DD',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: '#fff',
            },
            headerLeft: (
              <Icon
                name="tree"
                type="font-awesome"
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer ()}
              />
            ),
          }),
        }
      );

      const ContactNavigator = createStackNavigator (
        { 
    Contact: {screen: Contact},
    },
    {
      defaultNavigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: '#5637DD',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
        headerLeft: (
          <Icon
            name="address-card"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer ()}
          />
        ),
      }),
    }
  );
  const CustomDrawerContentComponent = props => (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{top: 'always', horizontal: 'never'}}
      >
        <View style={styles.drawerHeader}>
          <View style={{flex: 1}}>
            <Image
              source={require ('./images/tea-logo.jpg')}
              style={styles.drawerImage}
            />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Tea Shop Cafe</Text>
          </View>
        </View>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );
  const MainNavigator = createDrawerNavigator (
    {  
      Home: {
        screen: HomeNavigator,
        navigationOptions: {
          drawerIcon: ({tintColor}) => (
            <Icon name="home" type="font-awesome" size={24} color={tintColor} />
          ),
        },
      },
      Directory: {
        screen: DirectoryNavigator,
        navigationOptions: {
          drawerIcon: ({tintColor}) => (
            <Icon name="list" type="font-awesome" size={24} color={tintColor} />
          ),
        },
      },
      Order: {
        screen: OrderNavigator,
        navigationOptions: {
          drawerLabel: 'Create an Order',
          drawerIcon: ({tintColor}) => (
            <Icon name="tree" type="font-awesome" size={24} color={tintColor} />
          ),
        },
      },
      Contact: {
        screen: ContactNavigator,
        navigationOptions: {
          drawerLabel: 'Contact Us',
          drawerIcon: ({tintColor}) => (
            <Icon
              name="address-card"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        },
      },
    },
    {
      initialRouteName: 'Home',
      drawerBackgroundColor: '#CEC8FF',
      contentComponent: CustomDrawerContentComponent,
    }
  );
  const AppNavigator = createAppContainer (MainNavigator);
  
  class Main extends Component {
    componentDidMount () {
      this.props.fetchProducts ();
      this.props.fetchCarousels ();
      this.showNetInfo();
      this.unsubscribeNetInfo = NetInfo.addEventListener (connectionInfo => {
      this.handleConnectivityChange (connectionInfo);
      });

  }
  showNetInfo = async() => {
    const connectionInfo = await NetInfo.fetch()
            Platform.OS === 'ios'
              ? Alert.alert (
                  'Initial Network Connectivity Type:',
                  connectionInfo.type
                )
              : ToastAndroid.show (
                  'Initial Network Connectivity Type: ' + connectionInfo.type,
                  ToastAndroid.LONG
                );
          };
          
        componentWillUnmount() {
          this.unsubscribeNetInfo();
      }
    
      handleConnectivityChange = connectionInfo => {
          let connectionMsg = 'You are now connected to an active network.';
          switch (connectionInfo.type) {
              case 'none':
                  connectionMsg = 'No network connection is active.';
                  break;
              case 'unknown':
                  connectionMsg = 'The network connection state is now unknown.';
                  break;
              case 'cellular':
                  connectionMsg = 'You are now connected to a cellular network.';
                  break;
              case 'wifi':
                  connectionMsg = 'You are now connected to a WiFi network.';
                  break;
          }
          (Platform.OS === 'ios')
              ? Alert.alert('Connection change:', connectionMsg)
              : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
      }

  render () {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'ios'
            ? 0
            : Expo.Constants.statusBarHeight,
        }}
      >
        <AppNavigator />
      </View>
    );
  }
    }


  const styles = StyleSheet.create ({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#5637DD',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
    },
    drawerHeaderText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },
    drawerImage: {
      margin: 10,
      height: 60,
      width: 60,
    },
    stackIcon: {
      marginLeft: 10,
      color: '#fff',
      fontSize: 24,
    },
  });
  
  export default connect (null, mapDispatchToProps) (Main);