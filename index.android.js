/**
 * [EE 7018] Intelligent Devices and Cloud Computing
 * ====================================================
 * Final Project: Movie Table App
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import Main from './src';

export default class MovieTable extends Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('MovieTable', () => MovieTable);
