/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {images, icons, tabListData, COLORS, FONTS, SIZES} from '../constants';

const ScrollableTab = ({tabList, selectedTab, onPress}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{marginHorizontal: SIZES.padding}}
      onPress={() => onPress(item)}>
      <Text style={{color: COLORS.secondary, ...FONTS.body2}}>{item.name}</Text>
      {selectedTab.id === item.id && (
        <View style={{alignItems: 'center', marginTop: SIZES.base}}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: COLORS.blue,
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={{marginTop: SIZES.padding}}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={tabList}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};

const ScrollableCard = ({navigation, productList}) => {
  const renderCard = ({item}) => (
    <TouchableOpacity
      style={{marginLeft: SIZES.padding}}
      onPress={() => navigation.navigate('ItemDetail', {itemInfo: item})}>
      <View
        style={{
          width: SIZES.width / 2.5,
          height: SIZES.height / 3,
        }}>
        <Image
          source={item.image}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: SIZES.radius * 2,
          }}
        />

        <View
          style={{position: 'absolute', top: 15, left: '10%', right: '10%'}}>
          <Text style={{color: COLORS.lightGray2, ...FONTS.h3}}>Furniture</Text>
          <Text
            style={{
              marginTop: SIZES.base,
              color: COLORS.white,
              ...FONTS.h3,
            }}>
            {item.productName}
          </Text>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 15,
            borderRadius: 15,
            paddingVertical: 5,
            paddingHorizontal: 15,
            backgroundColor: COLORS.transparentLightGray,
          }}>
          <Text style={{...FONTS.h3}}>$ {item.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{marginTop: SIZES.padding, paddingHorizontal: SIZES.padding}}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={productList}
        renderItem={renderCard}
        keyExtractor={(item) => `${item.productId}`}
      />
    </View>
  );
};

const Home = ({navigation}) => {
  const [tabList, setTabList] = useState(tabListData);
  const [selectedTab, setSelectedTab] = useState(tabListData[0]);

  function renderHeader() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding / 2,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity onPress={() => console.log('Menu on clicked')}>
              <Image
                source={icons.menu}
                resizeMode="contain"
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => {
                console.log('Cart on clicked!');
              }}>
              <Image
                source={icons.cart}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function renderTitle(title) {
    return (
      <View style={{marginTop: SIZES.padding, marginHorizontal: SIZES.padding}}>
        <Text style={{color: COLORS.black, ...FONTS.h1}}>Collection of</Text>
        <Text style={{color: COLORS.black, ...FONTS.h1}}>{title}</Text>
      </View>
    );
  }

  function renderPromotionCard() {
    return (
      <View
        style={[
          styles.shadow,
          {
            flexDirection: 'row',
            marginHorizontal: SIZES.padding,
            padding: SIZES.radius,
            height: 80,
            borderRadius: 20,
            backgroundColor: COLORS.white,
          },
        ]}>
        <View
          style={{
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.lightGray2,
            borderRadius: 20,
          }}>
          <Image
            source={images.sofa}
            resizeMode="contain"
            style={{
              width: '60%',
              height: '60%',
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h3}}>Special Offer</Text>
          <Text style={{...FONTS.body4}}>Adding to your cart</Text>
        </View>

        {/* Button */}
        <View
          style={{
            marginRight: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              justifyContent: 'center',
              alignItems: 'center',
              height: '70%',
              width: 40,
              borderRadius: 10,
            }}
            onPress={() => {
              console.log('Promo on clicked');
            }}>
            <Image
              source={icons.chevron}
              resizeMode="contain"
              style={{
                height: '50%',
                width: '50%',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderTitle(selectedTab.title)}

      <ScrollableTab
        tabList={tabList}
        selectedTab={selectedTab}
        onPress={(item) => setSelectedTab(item)}
      />

      <View style={{flex: 1}}>
        <ScrollableCard
          navigation={navigation}
          productList={selectedTab.productList}
        />
      </View>

      {/* Footer - Promotion Card */}
      <View style={{height: '19%', justifyContent: 'center'}}>
        {renderPromotionCard()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
});

export default Home;
