import React, { Component } from 'react';
import { View } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { PageNowPlaying, PageComingSoon, PageTheaters } from './components/Pages';

const App = TabNavigator({
  NowPlaying: { screen: PageNowPlaying }, 
  ComingSoon: { screen: PageComingSoon },
  Theaters: { screen: PageTheaters },
}, {
  initialRouteName: 'NowPlaying',
});

export default class Main extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <App/>
      </View>
    );
  }
}
