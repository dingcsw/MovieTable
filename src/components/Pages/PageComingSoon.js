import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ModalPicker from 'react-native-modal-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { MovieItem } from '../Utils';

export default class PageComingSoon extends Component {
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
          image: 'https://image.tmdb.org/t/p/w640/1bmocxZAGEU8Gr7jKBsZplrsi9d.jpg',
          time: {
            '2017-6-22': {
              '台北信義威秀': ['09:15', '10:30', '11:55', '13:15', '14:05', '14:35', '15:55', '17:15', '18:40', '19:10', '20:00', '21:20', '22:40', '00:00', '01:20'],
              '台北日新威秀': ['10:05', '12:45', '15:30', '22:30'],
              '台北京站威秀': ['09:05', '11:45', '14:25', '15:45', '17:05', '19:45', '22:25', '23:35', '01:05']
            },
            '2017-6-23': {
              '台北信義威秀': ['09:15', '11:55', '14:00', '14:35', '17:15', '19:15', '20:00', '22:40', '01:20'],
              '台北日新威秀': ['10:05', '12:45', '15:30', '22:30', '01:10'],
              '台北京站威秀': ['09:05', '11:45', '14:25', '15:45', '17:05', '19:45', '22:25', '23:35', '01:05']
            }
          }
        }, {
          id: 2,
          titleCh: '吃吃的愛',
          titleEn: 'DIDI\'s Dream' ,
          releaseDate: '2017/05/27',
          runningTime: '91',
          ratings: '護',
          genres: ['劇情', '親情'],
          languages: ['中文'],
          image: 'http://web.vscinemas.com.tw/upload/film/film_20170523002.jpg',
          time: {
            '2017-6-22': {
              '台北信義威秀': ['09:05', '14:50', '20:15', '23:45'],
              '台北京站威秀': ['09:40', '18:25'],
            },
            '2017-6-23': {
              '台北信義威秀': ['09:05', '14:45', '20:15', '23:45'],
              '台北京站威秀': ['09:40', '18:25'],
            }
          }
        }, {
          id: 3,
          titleCh: '神鬼傳奇',
          titleEn: 'The Mummy(2017)',
          releaseDate: '2017/06/07',
          runningTime: '111',
          ratings: '輔',
          genres: ['動作', '恐怖', '冒險', '奇幻'],
          languages: ['英文'],
          image: 'https://image.tmdb.org/t/p/w640/8K8LHSgXdUH3YHFJpcUXslPYpYr.jpg',
          time: {
            '2017-6-22': {
              '台北信義威秀': ['09:30', '10:35', '11:40', '12:45', '13:50', '14:55', '16:00', '17:05', '18:10', '19:15', '20:20', '21:25', '22:30', '23:35', '00:40', '01:45'],
              '台北日新威秀': ['09:05', '11:10', '13:20', '18:15', '20:20', '23:45'],
              '台北京站威秀': ['09:25', '11:35', '12:45', '13:45', '15:55', '17:00', '18:05', '20:20', '21:25', '22:30', '00:45'],
            },
            '2017-6-23': {
              '台北信義威秀': ['10:35', '12:45', '14:55', '19:15', '21:25', '23:35', '01:45'],
              '台北日新威秀': ['09:05', '11:10', '13:20', '18:15', '20:20'],
              '台北京站威秀': ['09:25', '11:35', '12:45', '13:45', '15:55', '17:00', '18:05', '20:20', '21:25', '22:30', '00:45'],
            }
          }
        }, {
          id: 4,
          titleCh: '惡女',
          titleEn: 'The Villainess',
          releaseDate: '2017/06/16',
          runningTime: '143',
          ratings: '限',
          genres: ['劇情', '動作', '冒險'],
          languages: ['韓文'],
          image: 'http://resource.holyshare.com.tw/uploads/article/600x0/1497519734pi2_1.jpg',
          time: {
            '2017-6-22': {
              '台北信義威秀': ['21:15']
            }
          }
        }
      ],
      region: '全部地區',
      theater: '全部影城',
      date: '',
      regionOptions: ['全部地區', '北部地區', '中部地區', '南部地區'],
      theaterOptions: {
        '全部地區': [
          '全部影城', '台北信義威秀', '台北日新威秀', '台北京站威秀', '板橋大遠百威秀', '林口三井OUTLET威秀', '新竹大遠百威秀', '新竹巨城威秀',
          '頭份尚順威秀', '台中大遠百威秀', '台中TIGER CITY威秀', '台南大遠百威秀', '台南南紡威秀', '高雄大遠百威秀'
        ],
        '北部地區': ['北部全部影城', '台北信義威秀', '台北京站威秀', '台北日新威秀', '板橋大遠百威秀', '林口三井OUTLET威秀', '新竹大遠百威秀', '新竹巨城威秀'],
        '中部地區': ['中部全部影城', '頭份尚順威秀', '台中大遠百威秀', '台中TIGER CITY威秀'],
        '南部地區': ['南部全部影城', '台南大遠百威秀', '台南南紡威秀', '高雄大遠百威秀']
      },
      isDateTimePickerVisible: false
    }
  }

  static navigationOptions = {
    tabBarLabel: '即將上映',
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
    const { movies, region, regionOptions, theater, theaterOptions, date, isDateTimePickerVisible } = this.state;
    const showMovies = movies.map((item, key) => {
      const availableTime = ((time, date, theater) => {
        if (time[date]) {
          if (time[date][theater]) {
            return {
              timeCase: 'ONE_THEATER',
              times: time[date][theater]
            };
          } else if (theater.contains('全部影城')) {
            let times = [];
            switch(theater) {
              case '全部影城':
              case '北部全部影城':
              case '中部全部影城':
              case '南部全部影城':
              
            }

            return {
              timeCase: 'MANY_THEATERS'
            };
          } else return {
            timeCase: 'NO_TIME_THEATER',
            date: date
          };
        } else return {timeCase: 'NO_TIME_DATE'};
      }) (item.time, date.inString, theater);

      return (
        <MovieItem
          {...item}
          key={item.id}
          isNowPlaying={true}
          availableTime={availableTime}
        />
      );
    });
    const setRegionOptions = regionOptions.map((item, key) => {
      return {
        key: key,
        label: item
      }
    });
    const setTheaterOptions = theaterOptions[region].map((item, key) => {
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
              data={setRegionOptions}
              onChange={(option) => {this.setState({
                region: option.label,
                theater: theaterOptions[option.label][0]
              })}}
            >
              <TextInput 
                style={styles.regionButton} 
                editable={false} 
                value={region}
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
  regionButton: {
    color: '#0F2540',
    backgroundColor: '#E5F0F4',
    margin: 10,
    padding: 3,
    borderRadius: 5,
    height: 25,
    width: 75,
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
    width: 155,
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

