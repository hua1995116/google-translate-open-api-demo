import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import translate from 'google-translate-open-api';



const REQUEST_URL =
  "https://s3plus.meituan.net/v1/mss_0ddf9b250a1b4db28fb1d9ad764b2853/files/pikachu/MoviesExample.json";
const MOCKED_MOVIES_DATA = [
  {
    title: "标题",
    year: "2015",
    posters: { thumbnail: "http://i.imgur.com/UePbdph.jpg" }
  }
];

export default class SectionListBasics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      translate: '',
    };
    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向不对
    // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData();
    (async () => {
      try {
        const result = await translate(`I'm fine.`, {
          tld: "cn",
          to: "zh-CN",
        });
        const data = result.data[0];
        console.log(data);
        this.setState({
          translate: data
        })
      } catch (e) {
        this.setState({
          translate: e.toString()
        })
      }
      
    })();
  }
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
          data: this.state.data.concat(responseData.movies),
          loaded: true,
        });
      });
  }
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          正在加载电影数据……
        </Text>
      </View>
    );
  }

  renderMovie({ item }) {
    // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
    // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
    return (
      <View style={styles.container}>
        <Image
          source={{uri: item.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.year}>{item.year}</Text>
        </View>
      </View>
    );
  }
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View>
        <Text>
        {this.state.translate}
        </Text>
        <FlatList
        data={this.state.data}
        renderItem={this.renderMovie}
        style={styles.list}
        keyExtractor={item => item.id}
      />
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  list: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});