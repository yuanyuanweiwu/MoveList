import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
const REQUEST_URL =
  'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      loaded:false
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
          data: this.state.data.concat(responseData.movies),
          loaded:true
        });
      });
  }
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  renderMovie({item}) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579081576389&di=3eb8572f216401cc023ec2981e5351c6&imgtype=0&src=http%3A%2F%2Fdmimg.5054399.com%2Fallimg%2Fpkm%2Fpk%2F22.jpg'}}
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
      <FlatList
        data={this.state.data}
        renderItem={this.renderMovie}
        style={styles.list}
        keyExtractor={item => item.id}
      />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ededed',
    marginBottom:10
  },
  thumbnail: {
    width: 63,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 18,
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
export default App;
