import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class Movie extends Component {
  render() {
    const {
      titleCh,
      titleEn,
      releaseDate,
      runningTime,
      ratings,
      genres,
      languages,
      image,
      isNowPlaying,
      availableTime
    } = this.props;
    
    const genreButtons = genres.map((item, key) => (
      <TouchableOpacity
        key={key}
        style={styles.genreButton}
      >
        <Text style={styles.genreButtonText}>{item}</Text>
      </TouchableOpacity>
    ));

    const showAvailableTime = ((availableTime) => {
      switch(availableTime.timeCase) {
        case 'NO_TIME_DATE':
          return (
            <View style={styles.timeNoTimeBox}>
              <Text>您搜尋的時間沒有可觀看場次！</Text>
            </View>
          );
        case 'NO_TIME_THEATER':
          return (
            <View style={styles.timeNoTimeBox}>
              <Text>該電影院在{availableTime.date}沒有可觀看場次！</Text>
            </View>
          );
        case 'ONE_THEATER':
          const res = availableTime.times.map((item, key) => (
            <TouchableOpacity key={key} style={styles.timeItem}>
              <Text style={styles.timeItemText}>{item}</Text>
            </TouchableOpacity>
          ));
          return res;
        case 'MANY_THEATERS':
      }
    }) (availableTime);

    return (
      <View style={styles.movie}>
        <View style={styles.intro}>
          <View style={styles.imageView}>
            <Image 
              style={styles.image} 
              source={{uri: `${image}`}}
            />
          </View>
          <View style={styles.textView}>
            <Text style={styles.titleCh}>{titleCh}</Text>
            <Text style={styles.titleEn}>{titleEn}</Text>
            <View style={styles.detailView}>
              <View> 
                <View style={styles.detailItemView}>
                  <Text style={styles.detail}>[{languages.join('/')}] 片長：{runningTime}分</Text>
                </View>
                <View style={styles.detailItemView}>
                  <Text style={styles.detail}>上映日期：{releaseDate}</Text>
                </View>
                <View style={styles.genreView}>{genreButtons}</View>
              </View>
              <View style={{justifyContent:"space-between"}}> 
                <TouchableOpacity
                  style={[(() => {
                    switch(ratings) {
                      case '普': return styles.rating1;
                      case '護': return styles.rating2;
                      case '輔': return styles.rating3;
                      case '限': return styles.rating4;
                    }
                  })(), styles.ratingCommon]}
                >
                  <Text style={styles.ratingButtonText}>{ratings}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginBottom: 10 }}
                >
                  <Text>T</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.time}>
          {showAvailableTime}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  movie: {
    flex: 1
  },
  time: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#EEEEEE',
    marginHorizontal: 10,
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  timeItem: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
    padding: 3,
    height: 25,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeItemText: {
    fontSize: 12
  },
  timeNoTimeBox: {
    paddingBottom: 5
  },
  intro: {
    flex: 1,
    flexDirection: 'row',
    height: 165,
    paddingHorizontal: 10,
    paddingTop: 5
  },
  imageView: {
    paddingRight: 15
  },
  image: {
    height: 150,
    width: 100,
  },
  textView: {
    flex: 1,
  },
  titleCh: {
    color: '#373C38',
    fontSize: 18,
    fontWeight: '900'
  },
  tltleEn: {
    color: '#707C74',
    fontSize: 7
  },
  detailView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 5,
    marginTop: 5,
    marginRight: 5,
    borderTopColor: '#DDDDDD',
    borderTopWidth: 2,
    justifyContent: 'space-between'
  },
  detailItemView: {
    paddingBottom: 3
  },
  detail: {
    color: '#111111',
    fontSize: 12
  },
  genreView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 5,
  },
  genreButton: {
    backgroundColor: '#EEEEEE',
    marginRight: 5,
    padding: 3,
    borderRadius: 5,
    height: 22,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genreButtonText: {
    fontSize: 10
  },
  ratingButtonText: {
    color: '#FFFFFF',
    fontSize: 9
  },
  ratingCommon: {
    padding: 0,
    borderRadius: 6,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rating1: {
    backgroundColor: '#7B824E',
  },
  rating2: {
    backgroundColor: '#4B7F95',
  },
  rating3: {
    backgroundColor: '#F07E3C',
  },
  rating4: {
    backgroundColor: '#CB5B5A',
  }
});
