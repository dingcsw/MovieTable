import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ModalPicker from 'react-native-modal-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { MovieItem } from '../Utils';

export default class PageComingSoon extends Component {
  static navigationOptions = {
    tabBarLabel: '即將上映',
  };

   constructor(props) {
    super(props);
    this.state = {
      movies: [{
          id: 3,
          titleCh: '死小孩',
          titleEn: 'Innocent Curse',
          releaseDate: '2017/06/23',
          runningTime: '112',
          ratings: '輔',
          genres: ['恐怖', '驚悚'],
          languages: ['日文'],
          image: 'http://www.photowant.com/photo101/fijp35856116/pl_fijp35856116_0002.jpg',
          time: {
            '2017-6-23': {
              '台北信義威秀': ['19:20'],
            }
          }
        }, {
          id: 1,
          titleCh: '神偷奶爸 3',
          titleEn: 'Despicable Me 3',
          releaseDate: '2017/06/29',
          runningTime: '90',
          ratings: '護',
          genres: ['動畫', '喜劇', '家庭'],
          languages: ['中文', '英文'],
          image: 'https://i1.kknews.cc/large/d020007fe7a9cde68f6',
          time: {
            '2017-6-29': {
              '台北信義威秀': ['09:15', '11:05', '12:55', '14:45', '16:35', '18:25', '20:15'],
            },
            '2017-6-30': {
              '台北信義威秀': ['09:15', '11:05', '12:55', '14:45', '16:35', '18:25', '20:15'],
            }
          }
        }, {
          id: 2,
          titleCh: '蜘蛛人：返校日',
          titleEn: 'Spider-Man: Homecoming' ,
          releaseDate: '2017/07/05',
          runningTime: '133',
          ratings: '輔',
          genres: ['動作', '冒險', '英雄'],
          languages: ['英文'],
          image: 'http://www.truemovie.com/2016Poster/c7thfxlwsaapuf.jpg',
          time: {
            '2017-7-5': {
              '台北信義威秀': ['11:10', '13:45', '15:35', '16:20', '18:10', '19:00', '20:45', '21:35', '00:10'],
            },
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
      const availableTime = ((time, date, theater, region, theaterOptions) => {
        if (time[date]) {
          if (time[date][theater]) {
            return {
              timeCase: 'ONE_THEATER',
              times: time[date][theater]
            };
          } else if (theater.contains('全部影城')) {
            let times = [];
            let hasAvailable = false;
            const theaters = theaterOptions[region];
            theaters.forEach((th) => {
              if (!th.contains('全部影城')) {
                if (time[date][th]) hasAvailable = true;
                times.push({
                  theater: th,
                  time: time[date][th]
                });
              }
            });
            if (hasAvailable)
              return {
                timeCase: 'MANY_THEATERS',
                times: times
              };
            else return {
              timeCase: 'NO_TIME_DATE'
            };
          } else return {
            timeCase: 'NO_TIME_THEATER',
            date: date
          };
        } else return {
          timeCase: 'NO_TIME_DATE'
        };
      }) (item.time, date.inString, theater, region, theaterOptions);

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
