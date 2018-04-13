import React, { Component } from "react";
import {
  SafeAreaView,
  Animated,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  TouchableHighlight
} from "react-native";

const deviceWidth = Dimensions.get("window").width;
const FIXED_BAR_WIDTH = deviceWidth - 20;
const BAR_SPACE = 0;
const tabs = [
  { name: "Tab 1" },
  { name: "Tab 2" },
  { name: "Tab 3" }
];

export default class Tabs extends Component {
 
  numItems = tabs.length;
  itemWidth = FIXED_BAR_WIDTH / this.numItems - (this.numItems - 1) * BAR_SPACE;
  animVal = new Animated.Value(0);
  

  render() {
    let tabArray = [];
    let barArray = [];
    tabs.forEach((tab, i) => {
      let thisTab = null;
      if (tab.name == "Tab 1") {
        thisTab = (
          <View key={`tab${i}`} style={styles.tabStyle}>
            <Text>Tab 1</Text> 
          </View>
        );
      }
      if (tab.name == "Tab 2") { 
        thisTab = (
          <View key={`journey${i}`} style={styles.tabStyle}>
            <Text>Tab 2</Text>
          </View>
        );
      }
      if (tab.name == "Tab 3") {
        thisTab = (
          <View key={`journey${i}`} style={styles.tabStyle}>
            <Text>Tab 3</Text>
          </View>
        );
      }
      tabArray.push(thisTab);
      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: "clamp"
      });
      const thisBar = (
        <View key={`bar${i}`}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              this.myScrollView.scrollTo({
                x: i * deviceWidth,
                y: 0,
                animated: true
              });
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: "#1e1e1e",
                fontSize: 16
              }}
            >
              {tab.name}
            </Text>
          </TouchableHighlight>
          <View
            style={[
              styles.track,
              {
                width: this.itemWidth,
                marginLeft: i === 0 ? 0 : BAR_SPACE
              }
            ]}
          >
            <Animated.View
              style={[
                styles.bar,
                {
                  width: this.itemWidth,
                  transform: [{ translateX: scrollBarVal }]
                }
              ]}
            />
          </View>
        </View>
      );
      barArray.push(thisBar);
    });

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.container} flex={1}>
          <ScrollView
            ref={ (ref) => this.myScrollView = ref }
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={10}
            pagingEnabled
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { x: this.animVal } } }
            ])}
          >
            {tabArray}
          </ScrollView>
          <View style={styles.barContainer}>{barArray}</View>
          
          
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f7f9"
  },
  barContainer: {
    position: "absolute",
    zIndex: 5,
    top: 120,
    flexDirection: "row",
    borderBottomColor: "transparent",
    borderBottomWidth: 1
  },
  track: {
    backgroundColor: "rgba(0,0,0,0)",
    overflow: "hidden",
    height: 20,
    alignSelf: "center"
  },
  bar: {
    backgroundColor: "#50e3c2",
    height: 2,
    position: "absolute",
    left: 0,
    top: 0
  },
 tabStyle:{
   flex: 1, 
   width: deviceWidth,
   justifyContent:'center',
   alignItems:'center',
   alignContent:'center'
 }
});
