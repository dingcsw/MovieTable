import React, { Component } from 'react';
import { View } from 'react-native';

import { PageNowPlaying, PageComingSoon } from './containers';

export default class Main extends Component {
  render() {
    return (
      <View>
        <PageNowPlaying />
        <PageComingSoon />
      </View>
    );
  }
}
