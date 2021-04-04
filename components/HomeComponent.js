import React, {Component} from 'react';
import { View, ScrollView, Text, FlatList} from 'react-native';
import {Card, Tile} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        carousels: state.carousels
    };
};


class Home extends Component {
    

    static navigationOptions = {
        title: 'Home'
    };
  render () {
      const renderHome = ({item}) => {
        return (
            <ListItem
                title={item.name}
                subtitle={item.tagline}
                leftAvatar={{source: {uri: baseUrl + item.image}}}
            />
        );
    };
    if (this.props.carousels.isLoading) {
        return (
            <ScrollView>
               <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                        <Mission />
                        <Card
                            title="Community Partners">
                            <Text>{this.props.carousels.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Mission />
                    <Card
                        title="Community Partners">
                        <FlatList
                            data={this.props.carousels.carousels}
                            renderItem={renderHome}
                            keyExtractor={item=>item.id.toString()}
                        />
                    </Card>
                </Animatable.View>
    </ScrollView >
    );
  }
}
 function Mission() {
   
    return (
        <Card title= "Our Mission">
          <Text style = {{margin:10}}>
          We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. 
          We increase access to adventure for the public while promoting safe and respectful use of resources. 
          The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. 
          We also present a platform for campers to share reviews on campsites they have visited with each other.
          </Text>
          </Card>
    );
}


 
export default connect(mapStateToProps)(Home);

















