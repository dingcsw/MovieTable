import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ModalPicker from 'react-native-modal-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { Movie } from '../components'

export default class PageNowPlaying extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [{
          id: 1,
          titleCh: '神力女超人',
          titleEn: 'Wonder Woman',
          releaseDate: '2017/05/30',
          runningTime: '141',
          ratings: '護',
          genres: ['動作', '冒險', '奇幻'],
          languages: ['英文'],
          image: 'https://image.tmdb.org/t/p/w640/1bmocxZAGEU8Gr7jKBsZplrsi9d.jpg'
        }, {
          id: 2,
          titleCh: '吃吃的愛',
          titleEn: 'DIDI\'s Dream' ,
          releaseDate: '2017/05/27',
          runningTime: '91',
          ratings: '護',
          genres: ['劇情', '親情'],
          languages: ['中文'],
          image: 'http://web.vscinemas.com.tw/upload/film/film_20170523002.jpg'
        }, {
          id: 3,
          titleCh: '神鬼傳奇',
          titleEn: 'The Mummy(2017)',
          releaseDate: '2017/06/07',
          runningTime: '111',
          ratings: '輔',
          genres: ['動作', '恐怖', '冒險', '奇幻'],
          languages: ['英文'],
          image: 'https://image.tmdb.org/t/p/w640/8K8LHSgXdUH3YHFJpcUXslPYpYr.jpg'
        }, {
          id: 4,
          titleCh: '惡女',
          titleEn: 'The Villainess',
          releaseDate: '2017/06/16',
          runningTime: '143',
          ratings: '限',
          genres: ['劇情', '動作', '冒險'],
          languages: ['韓文'],
          image: 'http://resource.holyshare.com.tw/uploads/article/600x0/1497519734pi2_1.jpg'
        }
      ],
      city: '全部',
      theater: '全部影城',
      date: '',
      cityOptions: [
        '全部', '台北', '新北'
        //'桃園', '新竹', '苗栗', '台中', '南投', '彰化', '雲林', '嘉義', '台南', '高雄', '屏東', '宜蘭', '花蓮', '台東', '澎湖', '金門' 
      ],
      theaterOptions: {
        '全部': ['全部影城'],
        '台北': ['台北全部影城', '台北信義威秀', '台北京站威秀', '台北日新威秀'],
        '新北': ['新北全部影城', '板橋大遠百威秀', '林口三井OUTLET威秀']
      },
      isDateTimePickerVisible: false
    }
  }

  static navigationOptions = {
    tabBarLabel: '現正熱映'
  };

  componentWillMount() {
    const date = new Date();
    this.setState({
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        inString: [date.getFullYear(), (date.getMonth()+1), date.getDate()].join("-")
      }
    })
  }

  render() {
    const { movies, city, cityOptions, theater, theaterOptions, date, isDateTimePickerVisible } = this.state;
    const showMovies = movies.map((item, key) => (
      <Movie 
        {...item}
        key={item.id}
        isNowPlaying={true}
      />
    ));
    const setCityOptions = cityOptions.map((item, key) => {
      return {
        key: key,
        label: item
      }
    });
    const setTheaterOptions = theaterOptions[city].map((item, key) => {
      return {
        key: key,
        label: item
      }
    });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerToolbar}>

            <ModalPicker
              data={setCityOptions}
              onChange={(option) => {this.setState({
                city: option.label,
                theater: theaterOptions[option.label][0]
              })}}
            >
              <TextInput 
                style={styles.cityButton} 
                editable={false} 
                value={city}
              />
            </ModalPicker>

            <ModalPicker
              data={setTheaterOptions}
              onChange={(option) => {this.setState({theater: option.label})}}
            >
              <TextInput 
                style={styles.theaterButton} 
                editable={false} 
                value={theater}
              />
            </ModalPicker>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.dateButton} 
                onPress={() => this.setState({isDateTimePickerVisible: true})}
              >
                <Text style={styles.dateText}>{date.inString}</Text>
              </TouchableOpacity>

              <DateTimePicker
                isVisible={isDateTimePickerVisible}
                minimumDate={new Date()}
                onConfirm={() => this.setState({isDateTimePickerVisible: false})}
                onCancel={() => this.setState({isDateTimePickerVisible: false})}
                onHideAfterConfirm={(date) => this.setState({
                  date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate(),
                    inString: [date.getFullYear(), (date.getMonth()+1), date.getDate()].join("-")
                  }
                })}
              />
            </View>

          </View>
        </View>
        <ScrollView>
          {showMovies}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 45,
  },
  headerToolbar: {
    flex: 1,
    flexDirection: 'row',
  },
  cityButton: {
    color: '#0F2540',
    backgroundColor: '#E5F0F4',
    margin: 10,
    padding: 3,
    borderRadius: 5,
    height: 25,
    width: 50,
    textAlign: 'center',
    justifyContent: 'center',
  },
  theaterButton: {
    color: '#0F2540',
    backgroundColor: '#E5F0F4',
    marginVertical: 10,
    padding: 3,
    borderRadius: 5,
    height: 25,
    width: 160,
    textAlign: 'center',
    justifyContent: 'center',
  },
  dateButton: {
    backgroundColor: '#E5F0F4',
    margin: 10,
    padding: 3,
    borderRadius: 5,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    color: '#0F2540',
  }
});
