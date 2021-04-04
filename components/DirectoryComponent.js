import React, {Component} from 'react';
import { View, FlatList, Text } from 'react-native';
import {Tile} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

class Directory extends Component {
  

  static navigationOptions = {
    title: 'Directory'
  };

  render () {

    const renderDirectoryItem = ({item}) => {
      return (
        <Animatable.View animation='fadeInRightBig' duration={2000}>
        <Tile
          title={item.name}
          caption={item.price}
          featured
         
          imageSrc={{uri: baseUrl + item.image}}
        />
        </Animatable.View>
      );
    };
    if (this.props.products.isLoading) {
        return <Loading />;
    }
    if (this.props.products.errMess) {
        return (
            <View>
                <Text>{this.props.products.errMess}</Text>
            </View>
        );
    }
    return (
      <FlatList
        data={this.props.products.products}
        renderItem={renderDirectoryItem}
        keyExtractor={item => item.id.toString ()}
      />
    );
  }
}

export default connect (mapStateToProps) (Directory);
