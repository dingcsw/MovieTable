import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

export default class PageTheaters extends Component {
  static navigationOptions = {
    tabBarLabel: '影城搜尋',
  };

  render() {
    return (
      <ScrollView>
        <Text>Just like tt</Text>
      </ScrollView>
    );
  }
}
