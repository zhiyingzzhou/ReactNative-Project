import React , { Component , PropTypes } from 'react';
import {View,StyleSheet,Image} from 'react-native';

const base64Icon = "data:image/svg+xml;charset=utf-8,<svg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20x%3D'0px'%20y%3D'0px'%20viewBox%3D'0%200%2012%209'%20xml%3Aspace%3D'preserve'><polygon%20fill%3D'%23ffffff'%20points%3D'12%2C0.7%2011.3%2C0%203.9%2C7.4%200.7%2C4.2%200%2C4.9%203.9%2C8.8%203.9%2C8.8%203.9%2C8.8%20'%2F><%2Fsvg>";

export default class ImageComponent extends Component {
  render() {
    return (
        <View style={{
          backgroundColor: '#e74c3c'
        }}>
          <Image 
            source={{uri:base64Icon}}
            style={styles.base64}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
 base64:{
  flex: 1,
  height: 50,
  resizeMode: 'contain',
 }
});