import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Image, TextInput, Button, StyleSheet, ImageBackground, SafeAreaView, TouchableOpacity, AppRegistry } from 'react-native';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert } from 'react-native';
import { Linking } from 'react-native';
import { NativeModules } from 'react-native';
import { WelcomePage } from './screens/Welcome';
import {name as appName} from './app.json'; 
import {firebase} from 'firebase/app';
import auth from '@react-native-firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0OTkqw_e2uZz5n0n9-ogCa02gAIwHtDI",
  authDomain: "aucourier-6cd5a.firebaseapp.com",
  projectId: "aucourier-6cd5a",
  storageBucket: "aucourier-6cd5a.appspot.com",
  messagingSenderId: "315944479168",
  appId: "1:315944479168:android:de8ba4139b7a962cda0025"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// AppRegistry.registerComponent(appName,()=>App);
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();




// Create a context object
const UserContext = createContext();

export default function App() {
  const [registeredData1, setRegisteredData1] = useState([]);

  return (
    <UserContext.Provider value={{ registeredData1, setRegisteredData1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome Page" component={WelcomePage} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CourierLogin" component={CourierLogin} />

          <Stack.Screen name="HomePage" component={HomePage} />

          <Stack.Screen name="SearchPage" component={SearchPage} />
          <Stack.Screen name="SearchPageFood" component={SearchPageFood} />
          <Stack.Screen name="SearchPageCoffee" component={SearchPageCoffee} />
          <Stack.Screen name="SearchPageBooks" component={SearchPageBooks} />
          <Stack.Screen name="SearchPageMarket" component={SearchPageMarket} />
          <Stack.Screen name="SearchPageEmergency" component={SearchPageEmergency} />

          <Stack.Screen name="Restaurant1Screen" component={Restaurant1Screen} />
          <Stack.Screen name="Restaurant2Screen" component={Restaurant2Screen} />
          <Stack.Screen name="Restaurant3Screen" component={Restaurant3Screen} />
          <Stack.Screen name="Restaurant4Screen" component={Restaurant4Screen} />

          <Stack.Screen name="Coffee1Screen" component={Coffee1Screen} />
          <Stack.Screen name="Coffee2Screen" component={Coffee2Screen} />
          <Stack.Screen name="Coffee3Screen" component={Coffee3Screen} />

          <Stack.Screen name="Grocery1Screen" component={Grocery1Screen} />
          <Stack.Screen name="Grocery2Screen" component={Grocery2Screen} />

          <Stack.Screen name="BooksScreen" component={BooksScreen} />

          <Stack.Screen name="CustomScreen" component={CustomScreen} />


          <Stack.Screen name="Emergency1Screen" component={Emergency1Screen} />
          <Stack.Screen name="Emergency2Screen" component={Emergency2Screen} />

          <Stack.Screen name="ProfilePage" component={ProfilePage} />
          <Stack.Screen name="CourierProfile" component={CourierProfile} />
          <Stack.Screen name="CourierPage" component={CourierPage} />
          <Stack.Screen name="ApplicationForCourier" component={ApplicationForCourier} />

          <Stack.Screen name="OrderPage" component={OrderPage} />

        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
/*................................................................................................*/
const SignUp = ({ navigation }) => {
  const { registeredData1, setRegisteredData1 } = useContext(UserContext);
  const [username1, setUsername1] = useState('');
  const [password1, setPassword1] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  useEffect(() => {
    console.log("Registered Data updated:", registeredData1);
  }, [registeredData1]);

  const handleSignUp = async () => {
    if (!username1 || !password1 || !mobileNumber) {
      alert('Please fill in all fields.');
      return;
    }

    const newUser = {
      username1: username1,
      password1: password1,
      mobileNumber: mobileNumber
    };

    setRegisteredData1(prevData => [...prevData, newUser]);

    setUsername1('');
    setPassword1('');
    setMobileNumber('');
    navigation.navigate('Login');
  };

    return (
      <><View style={style2.container}>
        <Image source={require('./assets/sign-up.png')}
        style={{width: 320, height: 300}} />
        <TextInput
        style={style2.input}
        placeholder="Username"
        value={username1}
        onChangeText={text => setUsername1(text)}
      />
      <TextInput
        style={style2.input}
        placeholder="Password"
        value={password1}
        onChangeText={text => setPassword1(text)}
        secureTextEntry
      />
      <TextInput
        style={style2.input}
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={text => setMobileNumber(text)}
        keyboardType="numeric"
      />

        <Button title="Sign Up"
        color={'#003566'}
        onPress={handleSignUp} />
      </View></>
      );
};
/*................................................................................................*/
const Login = ({ navigation }) => {
  const { registeredData1 } = useContext(UserContext);
  const [username1, setUsername1] = useState('');
  const [password1, setPassword1] = useState('');

  const handleLogin1 = () => {
    const userExists = registeredData1.some(user => user.username1 === username1 && user.password1 === password1);
    if (userExists) {
      navigation.navigate('HomePage');
    } else {
      alert('Invalid username or password.');
    }
  };

  return (
    <View style={style3.container}>
      <Image source={require('./assets/loginimg.png')} style={{ width: 320, height: 300 }} />
      <TextInput
        style={style3.input}
        placeholder="Username"
        value={username1}
        onChangeText={text => setUsername1(text)}
        autoCapitalize="none"
      />
      <TextInput
        style={style3.input}
        placeholder="Password"
        value={password1}
        onChangeText={text => setPassword1(text)}
        secureTextEntry
      />
      <Button title="Login" 
      color={'#003566'}
      onPress={() => { navigation.navigate('HomePage') }} />
    </View>
  );
};
/*................................................................................................*/
const HomePage = ({ navigation }) => {
  const categories = [
    { name: 'Food', image: require('./assets/food.png'), targetScreen: 'SearchPageFood' },
    { name: 'Coffee', image: require('./assets/coffee.png'), targetScreen: 'SearchPageCoffee' },
    { name: 'Super markets', image: require('./assets/market.png'), targetScreen: 'SearchPageMarket' },
    { name: 'Stationary & Books', image: require('./assets/library.png'), targetScreen: 'SearchPageBooks' },
    { name: 'Custom Order', image: require('./assets/customization.png'), targetScreen: 'CustomScreen' },
    { name: 'Emergency', image: require('./assets/emergency.png'), targetScreen: 'SearchPageEmergency' },
    { name: 'Receive Order', image: require('./assets/Order.png'), targetScreen: 'Emergency2Screen' },
  ];
  return (
    <View style={style4.container}>
      <View style={style4.header}>
        <Image source={require('./assets/AUC(Final).png')} style={style4.logo} />
      </View>
      <TextInput style={style4.searchBar} placeholder="Search for products..." />
      <View style={style5.categories}>
        {categories.map((category, index) => (
          <View key={category.name} style={style5.categoryContainer}>
            <TouchableOpacity
              style={style5.categoryBox1}
              onPress={() => navigation.navigate(category.targetScreen)}>
              <Image source={category.image} style={style5.categoryImage} />
              <Text style={style5.categoryName}>{category.name}</Text>
            </TouchableOpacity>
            <View style={style5.blueBox} />
          </View>
        ))}
      </View>
      {/* Add the following View to incorporate the bottom tab buttons */}
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const OrderPage = ({ navigation }) => {
  return (
    <View style={style4.container}>
      {/* Food Categories (Replace with your layout) */}
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Home</Text>
        </TouchableOpacity>
        { <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Search</Text>
        </TouchableOpacity>}
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const SearchPage = ({ navigation }) => {
  const categories = [
    //{ name: 'Relish', image: require('./assets/Restourant.png'), targetScreen: 'RestaurantScreen' }, // Specify target screen for each category
    // { name: 'Cilantro', image: require('./assets/Cilantro.png'), targetScreen: 'CoffeeScreen' }, // Specify target screen for each category
    // { name: 'Soudi', image: require('./assets/grocery.png'), targetScreen: 'GroceryScreen' }, // Specify target screen for each category
    // { name: 'Emergency', image: require('./assets/Red.png'), targetScreen: 'EmergencyScreen' }, // Specify target screen for each category
  ];
  // const categoryColors = [
  //   '#ff9b85', // Food 
  //   '#ffd97d', // Coffee 
  //   '#60d394', // Super markets 
  //   '#ee6055', // Emergency 
  // ];
  return (
    <View style={style4.container}>
      {/* Search Bar */}
      <View style={style4.searchBarContainer}>
        <TextInput style={style4.searchBar} placeholder="Search for products..." />
      </View>
      <View style={style5.categories2}>
      {categories.map((category, index) => (
        <View key={category.name} style={[style5.categoryContainer2, { backgroundColor: categoryColors[index] }]}>
          <TouchableOpacity
              style={style5.categoryBox2}
              onPress={() => navigation.navigate(category.targetScreen)}>
              <Image source={category.image} style={style5.categoryImage} />
              <Text style={style5.categoryName2}>{category.name}</Text>
            </TouchableOpacity>
            <View style={style5.blueBox} />
          </View>
        ))}
      </View>
  
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const SearchPageFood = ({ navigation }) => {
  const categories = [
    { name: 'Relish', image: require('./assets/Restourant.png'), targetScreen: 'Restaurant1Screen' }, 
    { name: 'Tarwe2a', image: require('./assets/Restourant.png'),  targetScreen: 'Restaurant2Screen'}, 
    { name: 'Tabali', image: require('./assets/Restourant.png'),  targetScreen: 'Restaurant3Screen'}, 
    { name: 'Buchers Burger', image: require('./assets/Restourant.png'), targetScreen: 'Restaurant4Screen'}, 
  ];
  const categoryColors = [
    '#ff9b85',
    '#60d394', 
    '#8a5a44', 
    '#ffd97d', 
  ];
  return (
    <View style={style4.container}>
      {/* Search Bar */}
      <View style={style4.searchBarContainer}>
        <TextInput style={style4.searchBar} placeholder="Search for products..." />
      </View>
      <View style={style5.categories2}>
      {categories.map((category, index) => (
        <View key={category.name} style={[style5.categoryContainer2, { backgroundColor: categoryColors[index] }]}>
          <TouchableOpacity
              style={style5.categoryBox2}
              onPress={() => navigation.navigate(category.targetScreen)}>
              <Image source={category.image} style={style5.categoryImage} />
              <Text style={style5.categoryName2}>{category.name}</Text>
            </TouchableOpacity>
            <View style={style5.blueBox} />
          </View>
        ))}
      </View>
  
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const SearchPageCoffee = ({ navigation }) => {
  const categories = [
    //{ name: 'Relish', image: require('./assets/Restourant.png'), targetScreen: 'RestaurantScreen' }, 
    { name: 'Cilantro', image: require('./assets/Cilantro.png'), targetScreen: 'Coffee1Screen' }, 
    { name: 'La ROMA', image: require('./assets/Cilantro.png'), targetScreen: 'Coffee2Screen'}, 
    { name: 'TBS', image: require('./assets/Cilantro.png'), targetScreen: 'Coffee3Screen' }, 
  ];
  const categoryColors = [
   // '#ff9b85', // Food 
    '#ffd97d', // Coffee 
    '#8a5a44', // Super markets 
    '#bb9457', // Emergency 
  ];
  return (
    <View style={style4.container}>
      {/* Search Bar */}
      <View style={style4.searchBarContainer}>
        <TextInput style={style4.searchBar} placeholder="Search for products..." />
      </View>
      <View style={style5.categories2}>
      {categories.map((category, index) => (
        <View key={category.name} style={[style5.categoryContainer2, { backgroundColor: categoryColors[index] }]}>
          <TouchableOpacity
              style={style5.categoryBox2}
              onPress={() => navigation.navigate(category.targetScreen)}>
              <Image source={category.image} style={style5.categoryImage} />
              <Text style={style5.categoryName2}>{category.name}</Text>
            </TouchableOpacity>
            <View style={style5.blueBox} />
          </View>
        ))}
      </View>
  
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const SearchPageBooks = ({ navigation }) => {
  const categories = [
    //{ name: 'Relish', image: require('./assets/Restourant.png'), targetScreen: 'RestaurantScreen' }, 
    { name: 'AUC Book Store', image: require('./assets/Books.png'), targetScreen: 'BooksScreen' }, 
    //{ name: 'La ROMA', image: require('./assets/Cilantro.png'), targetScreen: 'Coffee2Screen'}, 
    // { name: 'Emergency', image: require('./assets/Red.png'), targetScreen: 'EmergencyScreen' }, 
  ];
  const categoryColors = [
   // '#ff9b85', // Food 
    '#48cae4', // Coffee 
    //'#8a5a44', // Super markets 
   // '#ee6055', // Emergency 
  ];
  return (
    <View style={style4.container}>
      {/* Search Bar */}
      <View style={style4.searchBarContainer}>
        <TextInput style={style4.searchBar} placeholder="Search for products..." />
      </View>
      <View style={style5.categories2}>
      {categories.map((category, index) => (
        <View key={category.name} style={[style5.categoryContainer2, { backgroundColor: categoryColors[index] }]}>
          <TouchableOpacity
              style={style5.categoryBox2}
              onPress={() => navigation.navigate(category.targetScreen)}>
              <Image source={category.image} style={style5.categoryImage} />
              <Text style={style5.categoryName2}>{category.name}</Text>
            </TouchableOpacity>
            <View style={style5.blueBox} />
          </View>
        ))}
      </View>
  
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const SearchPageMarket = ({ navigation }) => {
  const categories = [
    //{ name: 'Relish', image: require('./assets/Restourant.png'), targetScreen: 'RestaurantScreen' }, 
    // { name: 'Cilantro', image: require('./assets/Cilantro.png'), targetScreen: 'CoffeeScreen' }, 
    { name: 'Soudi', image: require('./assets/grocery.png'), targetScreen: 'Grocery1Screen' }, 
    { name: 'Quik', image: require('./assets/grocery.png'), targetScreen: 'Grocery2Screen'}, 
  ];
  const categoryColors = [
   // '#ff9b85', // Food 
   // '#ffd97d', // Coffee 
    '#60d394', // Super markets 
    '#ee6055', // Emergency 
  ];
  return (
    <View style={style4.container}>
      {/* Search Bar */}
      <View style={style4.searchBarContainer}>
        <TextInput style={style4.searchBar} placeholder="Search for products..." />
      </View>
      <View style={style5.categories2}>
      {categories.map((category, index) => (
        <View key={category.name} style={[style5.categoryContainer2, { backgroundColor: categoryColors[index] }]}>
          <TouchableOpacity
              style={style5.categoryBox2}
              onPress={() => navigation.navigate(category.targetScreen)}>
              <Image source={category.image} style={style5.categoryImage} />
              <Text style={style5.categoryName2}>{category.name}</Text>
            </TouchableOpacity>
            <View style={style5.blueBox} />
          </View>
        ))}
      </View>
  
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const SearchPageEmergency = ({ navigation }) => {
  const categories = [
    { name: 'AUC clinic', image: require('./assets/hospital.png'), targetScreen: 'Emergency1Screen' }, 
    //{ name: 'Recive Order', image: require('./assets/Order.png'), targetScreen: 'Emergency2Screen' }, 
    // { name: 'Soudi', image: require('./assets/grocery.png'), targetScreen: 'GroceryScreen' }, 
   // { name: 'Equipments', image: require('./assets/tools.png'), targetScreen: 'Emergency3Screen' }, 
  ];
  const categoryColors = [
    '#06d6a0', // Food 
    '#48cae4', // Coffee 
   // '#60d394', // Super markets 
    '#adb5bd', // Emergency 
  ];
  return (
    <View style={style4.container}>
      {/* Search Bar */}
      <View style={style4.searchBarContainer}>
        <TextInput style={style4.searchBar} placeholder="Search for products..." />
      </View>
      <View style={style5.categories2}>
      {categories.map((category, index) => (
        <View key={category.name} style={[style5.categoryContainer2, { backgroundColor: categoryColors[index] }]}>
          <TouchableOpacity
              style={style5.categoryBox2}
              onPress={() => navigation.navigate(category.targetScreen)}>
              <Image source={category.image} style={style5.categoryImage} />
              <Text style={style5.categoryName2}>{category.name}</Text>
            </TouchableOpacity>
            <View style={style5.blueBox} />
          </View>
        ))}
      </View>
  
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const Coffee1Screen = ({ navigation }) => {
  const categories = [
    { name: 'Latte', targetScreen: 'OrderPage' },
    { name: 'Ice Coffee',  targetScreen: 'OrderPage' },
    { name: 'Turkey', targetScreen: 'OrderPage' },
    { name: 'Cookies', targetScreen: 'OrderPage' },
    { name: 'Mafins', targetScreen: 'OrderPage' },
    { name: 'Water', targetScreen: 'OrderPage' },
    { name: 'Juices', targetScreen: 'OrderPage' },
  ];

  const [closestCourier, setClosestCourier] = useState(null);
  const handleCategoryPress = (category) => {
  const closest = findClosestCourier(couriers);
  setClosestCourier(closest);
  navigation.navigate(category.targetScreen);
};

  return (
    <View style={style4.container}>
      <View style={style5.categories}>
        {categories.map((category, index) => (
          <View key={category.name} style={style5.categoryContainer}>
            <TouchableOpacity
              key={category.name}
              style={style5.categoryBox1}
              onPress={() => handleCategoryPress(category)}>
              <Image source={category.image} style={style5.categoryImage} />
              <Text style={style5.categoryName}>{category.name}</Text>
            </TouchableOpacity>
            <View style={style5.blueBox} />
          </View>
        ))}
      </View>
      {/* Add the following View to incorporate the bottom tab buttons */}
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const Coffee2Screen = ({ navigation }) => {
  const categories = [
    { name: 'Latte', targetScreen: 'OrderPage' },
    { name: 'Ice Coffee',  targetScreen: 'OrderPage' },
    { name: 'Turkey', targetScreen: 'OrderPage' },
    { name: 'Cookies', targetScreen: 'OrderPage' },
    { name: 'Mafins', targetScreen: 'OrderPage' },
    { name: 'Water', targetScreen: 'OrderPage' },
    { name: 'Juices', targetScreen: 'OrderPage' },
  ];
  return (
    <View style={style4.container}>
      <View style={style5.categories}>
        {categories.map((category, index) => (
          <View key={category.name} style={style5.categoryContainer}>
            <TouchableOpacity
              style={style5.categoryBox1}
              onPress={() => navigation.navigate(category.targetScreen)}>
              <Image source={category.image} style={style5.categoryImage} />
              <Text style={style5.categoryName}>{category.name}</Text>
            </TouchableOpacity>
            <View style={style5.blueBox} />
          </View>
        ))}
      </View>
      {/* Add the following View to incorporate the bottom tab buttons */}
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const Coffee3Screen = ({ navigation }) => {
  const categories = [
    { name: 'Latte', targetScreen: 'OrderPage' },
    { name: 'Ice Coffee',  targetScreen: 'OrderPage' },
    { name: 'Turkey', targetScreen: 'OrderPage' },
    { name: 'Cookies', targetScreen: 'OrderPage' },
    { name: 'Mafins', targetScreen: 'OrderPage' },
    { name: 'Water', targetScreen: 'OrderPage' },
    { name: 'Juices', targetScreen: 'OrderPage' },
  ];
  return (
    <View style={style4.container}>
      <View style={style5.categories}>
        {categories.map((category, index) => (
          <View key={category.name} style={style5.categoryContainer}>
            <TouchableOpacity
              style={style5.categoryBox1}
              onPress={() => navigation.navigate(category.targetScreen)}>
              <Image source={category.image} style={style5.categoryImage} />
              <Text style={style5.categoryName}>{category.name}</Text>
            </TouchableOpacity>
            <View style={style5.blueBox} />
          </View>
        ))}
      </View>
      {/* Add the following View to incorporate the bottom tab buttons */}
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const BooksScreen = ({ navigation }) => {
  const categories = [
    { name: 'Books', targetScreen: 'OrderPage' },
    { name: 'Tote Bags',  targetScreen: 'OrderPage' },
    { name: 'Nootbooks', targetScreen: 'OrderPage' },
    { name: 'Pens', targetScreen: 'OrderPage' },
    { name: 'Pencils', targetScreen: 'OrderPage' },
    { name: 'Themal mugs', targetScreen: 'OrderPage' },
    { name: 'Files', targetScreen: 'OrderPage' },
  ];
  return (
    <View style={style4.container}>
      <View style={style5.categories}>
        {categories.map((category, index) => (
          <View key={category.name} style={style5.categoryContainer}>
            <TouchableOpacity
              style={style5.categoryBox1}
              onPress={() => navigation.navigate(category.targetScreen)}>
              <Image source={category.image} style={style5.categoryImage} />
              <Text style={style5.categoryName}>{category.name}</Text>
            </TouchableOpacity>
            <View style={style5.blueBox} />
          </View>
        ))}
      </View>
      {/* Add the following View to incorporate the bottom tab buttons */}
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const Grocery1Screen = ({ navigation }) => {
  const categories = [
    { name: 'Snacks', targetScreen: 'OrderPage' },
    { name: 'Juices',  targetScreen: 'OrderPage' },
    { name: 'Soft Drinks', targetScreen: 'OrderPage' },
    { name: 'Water', targetScreen: 'OrderPage' },
    { name: 'Chocolates', targetScreen: 'OrderPage' },
    { name: 'Gums', targetScreen: 'OrderPage' },
  ];
  return (
    <View style={style4.container}>
      <View style={style5.categories}>
        {categories.map((category, index) => (
          <View key={category.name} style={style5.categoryContainer}>
            <TouchableOpacity
              style={style5.categoryBox1}
              onPress={() => navigation.navigate(category.targetScreen)}>
              <Image source={category.image} style={style5.categoryImage} />
              <Text style={style5.categoryName}>{category.name}</Text>
            </TouchableOpacity>
            <View style={style5.blueBox} />
          </View>
        ))}
      </View>
      {/* Add the following View to incorporate the bottom tab buttons */}
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const Grocery2Screen = ({ navigation }) => {
  const categories = [
    { name: 'Snacks', targetScreen: 'OrderPage' },
    { name: 'Juices',  targetScreen: 'OrderPage' },
    { name: 'Soft Drinks', targetScreen: 'OrderPage' },
    { name: 'Water', targetScreen: 'OrderPage' },
    { name: 'Chocolates', targetScreen: 'OrderPage' },
    { name: 'Gums', targetScreen: 'OrderPage' },
  ];
  return (
    <View style={style4.container}>
      <View style={style5.categories}>
        {categories.map((category, index) => (
          <View key={category.name} style={style5.categoryContainer}>
            <TouchableOpacity
              style={style5.categoryBox1}
              onPress={() => navigation.navigate(category.targetScreen)}>
              <Image source={category.image} style={style5.categoryImage} />
              <Text style={style5.categoryName}>{category.name}</Text>
            </TouchableOpacity>
            <View style={style5.blueBox} />
          </View>
        ))}
      </View>
      {/* Add the following View to incorporate the bottom tab buttons */}
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const Restaurant1Screen = ({ navigation }) => {
  const categories = [
    { name: 'Pizza', targetScreen: 'OrderPage' },
    { name: 'Pasta',  targetScreen: 'OrderPage' },
    { name: 'Salad', targetScreen: 'OrderPage' },
    { name: 'Hot meal', targetScreen: 'OrderPage' },
    { name: 'Ice cream', targetScreen: 'OrderPage' },
    { name: 'French Fries', targetScreen: 'OrderPage' },
    { name: 'Breakfast', targetScreen: 'OrderPage' },
  ];
  return (
    <View style={style4.container}>
      <View style={style5.categories}>
        {categories.map((category, index) => (
          <View key={category.name} style={style5.categoryContainer}>
            <TouchableOpacity
              style={style5.categoryBox1}
              onPress={() => navigation.navigate(category.targetScreen)}>
              <Image source={category.image} style={style5.categoryImage} />
              <Text style={style5.categoryName}>{category.name}</Text>
            </TouchableOpacity>
            <View style={style5.blueBox} />
          </View>
        ))}
      </View>
      {/* Add the following View to incorporate the bottom tab buttons */}
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const Restaurant2Screen = ({ navigation }) => {
  const categories = [
    { name: 'Pizza', targetScreen: 'OrderPage' },
    { name: 'Pasta',  targetScreen: 'OrderPage' },
    { name: 'Salad', targetScreen: 'OrderPage' },
    { name: 'Hot meal', targetScreen: 'OrderPage' },
    { name: 'Ice cream', targetScreen: 'OrderPage' },
    { name: 'French Fries', targetScreen: 'OrderPage' },
    { name: 'Breakfast', targetScreen: 'OrderPage' },
  ];
  return (
    <View style={style4.container}>
      <View style={style5.categories}>
        {categories.map((category, index) => (
          <View key={category.name} style={style5.categoryContainer}>
            <TouchableOpacity
              style={style5.categoryBox1}
              onPress={() => navigation.navigate(category.targetScreen)}>
              <Image source={category.image} style={style5.categoryImage} />
              <Text style={style5.categoryName}>{category.name}</Text>
            </TouchableOpacity>
            <View style={style5.blueBox} />
          </View>
        ))}
      </View>
      {/* Add the following View to incorporate the bottom tab buttons */}
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const Restaurant3Screen = ({ navigation }) => {
  const categories = [
    { name: 'Pizza', targetScreen: 'OrderPage' },
    { name: 'Pasta',  targetScreen: 'OrderPage' },
    { name: 'Salad', targetScreen: 'OrderPage' },
    { name: 'Hot meal', targetScreen: 'OrderPage' },
    { name: 'Ice cream', targetScreen: 'OrderPage' },
    { name: 'French Fries', targetScreen: 'OrderPage' },
    { name: 'Breakfast', targetScreen: 'OrderPage' },
  ];
  return (
    <View style={style4.container}>
      <View style={style5.categories}>
        {categories.map((category, index) => (
          <View key={category.name} style={style5.categoryContainer}>
            <TouchableOpacity
              style={style5.categoryBox1}
              onPress={() => navigation.navigate(category.targetScreen)}>
              <Image source={category.image} style={style5.categoryImage} />
              <Text style={style5.categoryName}>{category.name}</Text>
            </TouchableOpacity>
            <View style={style5.blueBox} />
          </View>
        ))}
      </View>
      {/* Add the following View to incorporate the bottom tab buttons */}
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const Restaurant4Screen = ({ navigation }) => {
  const categories = [
    { name: 'Pizza', targetScreen: 'OrderPage' },
    { name: 'Pasta',  targetScreen: 'OrderPage' },
    { name: 'Salad', targetScreen: 'OrderPage' },
    { name: 'Hot meal', targetScreen: 'OrderPage' },
    { name: 'Ice cream', targetScreen: 'OrderPage' },
    { name: 'French Fries', targetScreen: 'OrderPage' },
    { name: 'Breakfast', targetScreen: 'OrderPage' },
  ];
  return (
    <View style={style4.container}>
      <View style={style5.categories}>
        {categories.map((category, index) => (
          <View key={category.name} style={style5.categoryContainer}>
            <TouchableOpacity
              style={style5.categoryBox1}
              onPress={() => navigation.navigate(category.targetScreen)}>
              <Image source={category.image} style={style5.categoryImage} />
              <Text style={style5.categoryName}>{category.name}</Text>
            </TouchableOpacity>
            <View style={style5.blueBox} />
          </View>
        ))}
      </View>
      {/* Add the following View to incorporate the bottom tab buttons */}
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const Emergency1Screen = ({ navigation }) => {
  return (
    <View style={style10.emergencyScreenContainer}>
      {/* <Text style={style10.emergencyTitle}>AUC Clinic</Text> */}
      <Button style={style7.courierButton}
      color={'#003566'}
      title="Call AUC Clinc" 
      onPress={() => Linking.openURL(`tel:0226154000`)} />
    </View>
  );
};
/*................................................................................................*/
const Emergency2Screen = ({ navigation }) => {
  return (
    <View style={style10.emergencyScreenContainer}>
      <Text style={style10.emergencyTitle}>Recive Order</Text>
      <View style={style10.messageContainer}>
        <TextInput
          multiline={true}
          style={style10.messageInput}
          placeholder="Enter your message..."
        />
        <TouchableOpacity style={style10.orderButton}>
          <Text style={style10.orderButtonText}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const CustomScreen = ({ navigation }) => {
  return (
    <View style={style10.emergencyScreenContainer}>
      <Text style={style10.emergencyTitle}>Custom Your Order</Text>
      <View style={style10.messageContainer}>
        <TextInput
          multiline={true}
          style={style10.messageInput}
          placeholder="Enter your message..."
        />
        <TouchableOpacity style={style10.orderButton}>
          <Text style={style10.orderButtonText}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const ProfilePage = ({ navigation }) => {
  const phoneNumber = '01016066261'; 
  const emailAddress = 'hazem_hisham@aucegypt.edu';
  const aboutMessage = 'This App is used to help you inside the AUC campus to get anything you want from any store or restourant inside AUC Via one of our couriers.';
  
  const handleBecomeCourierPress = () => {
    navigation.navigate('ApplicationForCourier');
  };

  const handleAboutAppPress = () => {
    Alert.alert(
      'About App',
      aboutMessage,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default' },
      ],
    );
  };
  const handleGetHelpPress = () => {
    Alert.alert(
      'Get Help',
      'Choose a contact method:',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: `Call Now ( ${phoneNumber} )`, onPress: () => Linking.openURL(`tel:${phoneNumber}`), style: 'default' },
        { text: `Email Us ( ${emailAddress} )`, onPress: () => Linking.openURL(`mailto:${emailAddress}`), style: 'default' },
      ],
    );
  };

  const profilePicture = require('./assets/profile pic.png');

  return (
    <View style={style7.container}>
      <View style={style7.profileHeader}>
        {/* Circle with Username */}
        <View style={style7.profileCircleContainer}>
          <Image source={profilePicture} style={style7.profileCircle} />
          <Text style={style7.username}>username</Text>
        </View>
      </View>
      <View style={style7.profileSeparator} />
      <View style={style7.profileOptions}>
        <TouchableOpacity style={style7.profileOption}>
          <Text style={style7.profileOptionText}>Your Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style7.profileOption}>
          <Text style={style7.profileOptionText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style7.profileOption} onPress={handleGetHelpPress}>
          <Text style={style7.profileOptionText}>Get Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style7.profileOption} onPress={handleAboutAppPress}>
          <Text style={style7.profileOptionText}>About App</Text>
        </TouchableOpacity>
      </View>
      
      {/* Added View for the "Become a Courier" button */}
      <View style={style7.courierButtonContainer}>
        <TouchableOpacity style={style7.courierButton} onPress={handleBecomeCourierPress}>
          <Text style={style7.courierButtonText}>Become a Courier</Text>
        </TouchableOpacity>
      </View>

      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('HomePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const ApplicationForCourier = ({ navigation }) => {
  const { registeredData2, setRegisteredData1 } = useContext(UserContext);
  const [username2, setUsername2] = useState('');
  const [password2, setPassword2] = useState('');
  const [DateOfBirth, setDateOfBirth] = useState('');
  const [phone_Number, setphone_Number] = useState('');
  const [Address, setAddress] = useState('');
  const [Email, setEmail] = useState('');

  useEffect(() => {
    console.log("Registered Data updated:", registeredData2);
  }, [registeredData2]);

    const handelSubmittion = () => {
      // if (!username2 || !password2 ||!DateOfBirth || !phone_Number || !Address || !Email) {
      //   alert('Please fill in all fields.');
      //   return;
      // }
      const newUser = {
        username2: username2,
        password2: password2,
        DateOfBirth: DateOfBirth,
        phone_Number: phone_Number,
        Address: Address,
        Email, Email,
      };
      setRegisteredData1(prevData => [...prevData, newUser]);
      setUsername2('');
      setPassword2('');
      setDateOfBirth('');
      setphone_Number('');
      setAddress('');
      setEmail('');
    navigation.navigate('CourierPage');
  };

  return (
    <View style={style8.container}>
      <Text style={style8.headerText}>Application for Courier</Text>
      {/* Input fields for username, date of birth, phone number */}
      <TextInput
        style={style2.input}
        placeholder="Username"
        value={username2}
        onChange={setUsername2}
      />
      <TextInput
        style={style2.input}
        placeholder="Password"
        value={password2}
        onChange={setPassword2}
        secureTextEntry
      />
      <TextInput
        style={style2.input}
        placeholder="Date of Birth"
        value={DateOfBirth}
        onChange={setDateOfBirth}
        keyboardType="datetime"
      />
      <TextInput
        style={style2.input}
        placeholder="Phone Number"
        value={phone_Number}
        onChange={setphone_Number}
        keyboardType="numeric"
      />
      <TextInput
        style={style2.input}
        placeholder="Address"
        value={Address}
        onChange={setAddress}
      />
      <TextInput
        style={style2.input}
        placeholder="Email"
        value={Email}
        onChange={setEmail}
        keyboardType="email-address"  // Set keyboard type for email
      />
      <Button style={style7.courierButton}
      color={'#003566'}
      title="Submit" 
      onPress={handelSubmittion} />
      </View>
  );
};
/*................................................................................................*/
const CourierLogin = ({ navigation }) => {
  const { registeredData2 } = useContext(UserContext);
  const [username2, setUsername2] = useState('');
  const [password2, setPassword2] = useState('');

  const handleLogin2 = () => {
  const userExists = registeredData2.some(user => user.username2 === username2 && user.password2 === password2);
  if (userExists) {
    navigation.navigate('CourierPage');
  } else {
    alert('Invalid username or password.');
    }
  };

  return (
    <View style={style3.container}>
      <Image source={require('./assets/loginimg.png')} style={{ width: 320, height: 300 }} />
      <TextInput
        style={style3.input}
        placeholder="Username"
        value={username2}
        onChangeText={text => setUsername2(text)}
        autoCapitalize="none"
      />
      <TextInput
        style={style3.input}
        placeholder="Password"
        value={password2}
        onChangeText={text => setPassword2(text)}
        secureTextEntry
      />
      <Button title="Login" 
      color={'#003566'}
      onPress={handleLogin2} />
    </View>
  );
};
/*................................................................................................*/
const CourierPage = ({ navigation }) => {
  const couriers = [
    { name: 'Ahmed', distance: 1 },
    { name: 'Ali', distance: 1.5 },
    { name: 'Salma', distance: 2 },
  ];
  
  const findClosestCourier = (couriers) => {
    let closestCourier = null;
    let minDistance = Infinity;
  
    for (const courier of couriers) {
      if (courier.distance < minDistance) {
        minDistance = courier.distance;
        closestCourier = courier;
      }
    }
  
    return closestCourier;
  };
  return (
    <View style={style4.container}>
      <TouchableOpacity
          style={style7.courierBox}
          onPress={() => {
            // Handle click on closest courier box (optional)
          }}>
          <Text style={style7.courierBoxText}>Closest Courier: {closestCourier.name}</Text>
        </TouchableOpacity>
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('CourierPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Home</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('SearchPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Search</Text>
        </TouchableOpacity> */}
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('CourierProfile')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
const CourierProfile = ({ navigation }) => {
  const phoneNumber = '01016066261'; 
  const emailAddress = 'hazem_hisham@aucegypt.edu';
  const aboutMessage = 'This App is used to help you inside the AUC campus to get anything you want from any store or restourant inside AUC Via one of our couriers.';

  const handleAboutAppPress = () => {
    Alert.alert(
      'About App',
      aboutMessage,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default' },
      ],
    );
  };
  const handleGetHelpPress = () => {
    Alert.alert(
      'Get Help',
      'Choose a contact method:',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: `Call Now ( ${phoneNumber} )`, onPress: () => Linking.openURL(`tel:${phoneNumber}`), style: 'default' },
        { text: `Email Us ( ${emailAddress} )`, onPress: () => Linking.openURL(`mailto:${emailAddress}`), style: 'default' },
      ],
    );
  };

  const profilePicture = require('./assets/profile pic.png');

  return (
    <View style={style7.container}>
      <View style={style7.profileHeader}>
        {/* Circle with Username */}
        <View style={style7.profileCircleContainer}>
          <Image source={profilePicture} style={style7.profileCircle} />
          <Text style={style7.username}>username</Text>
        </View>
      </View>
      <View style={style7.profileSeparator} />
      <View style={style7.profileOptions}>
        <TouchableOpacity style={style7.profileOption}>
          <Text style={style7.profileOptionText}>Pervious Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style7.profileOption}>
          <Text style={style7.profileOptionText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style7.profileOption}>
          <Text style={style7.profileOptionText}>Payment/Balance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style7.profileOption} onPress={handleGetHelpPress}>
          <Text style={style7.profileOptionText}>Get Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style7.profileOption} onPress={handleAboutAppPress}>
          <Text style={style7.profileOptionText}>About App</Text>
        </TouchableOpacity>
      </View>
      
      <View style={style6.tabBarContainer}>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('CourierPage')}>
          <Text style={[style6.tabBarButtonText, { color: '#FFFFFF' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={style6.tabBarButton}
        onPress={() => navigation.navigate('CourierProfile')}>
          <Text style={[style6.tabBarButtonText, { color: '#25DEF7' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*................................................................................................*/
/*Styles*/

const style1 = StyleSheet.create({
  container: {
    flex: 1, // Ensure container takes up the whole screen
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Stretch image to cover the entire screen
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 50,
  },
  // ... other styles for buttons and spacer
  buttonContainer: {
    flex: 1, // Make button container take up the whole screen
    justifyContent: 'flex-end', // Center buttons vertically (optional)
    paddingBottom: 120, // Add padding from bottom (adjust as needed)
    paddingLeft:50,
    paddingRight:20,
    width: '92%',
  },
  logo: {
    alignSelf: 'center', // Center logo horizontally
    width: '90%', // Adjust logo width as needed
    height: 70, // Adjust logo height as needed
  },
  buttonStyle: {
    borderCurve:20,
    fontWeight: 'bold',
    color: '#fff',
  },

  spacer: {
    height: 20, // Adjust height for desired spacing between buttons
  },
});

const style2 = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EDF6F9',
  },
  imageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 150,
  },
  input: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  loginText: {
    marginVertical: 10,
    textAlign: 'center',
  },
});

const style3 = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EDF6F9',
  },
  image: {
    width: 200,
    height: 150,
    alignSelf: 'center',  /* Center the image horizontally */
    marginBottom: 20,
  },
  input: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
},
});

const style4 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF6F9',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Stretch image to cover the entire screen
  },
  header: {
  flexDirection: 'column',
  alignItems: 'center',
  padding: 10,
  },
  logo: {
    width: 280,
    height: 60,
  },
  navBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navItem: {
    fontSize: 16,
  },
  searchBar: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
  },
  relishBox: {
    flexDirection: 'row',
    alignItems: 'center', // Vertically center content
    padding: 15,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
  },
  relishImage: {
    width: 70,
    height: 70,
    marginRight: 10, // Space between image and text
  },
  relishText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

const style5 = StyleSheet.create({
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  categories2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  categoryContainer: {
    width: '32%', // Adjust width to fit 3 boxes per row
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryContainer2: {
    width: '90%', // Adjust width to fit 3 boxes per row
    alignItems: 'stretch',
    marginBottom: 12,
    marginLeft: 18,
    marginRight: 15,
  },
  categoryBox1: {
    position: 'relative',
    padding: 10,
    backgroundColor: '#003566', // Adjust blue color as needed
    alignItems: 'center', // Center items within the box
    justifyContent: 'center', // Center items vertically within the box
  },
  categoryBox2: {
    position: 'relative',
    padding: 5,
    // backgroundColor: '#669BBC', // Adjust blue color as needed
    alignItems: 'center', // Center items within the box
    justifyContent: 'center', // Center items vertically within the box
  },
  categoryImage: {
    width: 80, // Adjust image size as needed
    height: 80, // Adjust image size as needed
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white', // Adjust text color for better visibility on blue background
},
categoryName2: {
  fontSize: 14,
  fontWeight: 'bold',
  color: 'black', // Adjust text color for better visibility on blue background
},
});

const style6 = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute', // Ensures buttons stay at bottom
    left: 0, // Align left
    right: 0, // Align right
    bottom: 0, // Position at bottom
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#003566',
    padding: 10,
  },
  tabBarButton: {
    alignItems: 'center',
  },
  tabBarButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const style7 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF6F9',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profileCircleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40, // Create a circle
    backgroundColor: '#25DEF7', // Set circle background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontSize: 32,
    color: '#fff', // Set initial text color to white
    fontWeight: 'bold',
  },
  username: {
    fontSize: 18,
    marginLeft: 10, // Add margin for spacing between circle and text
  },
  profileSeparator: {
    height: 1, // Set line height
    backgroundColor: '#ccc', // Set line color
    marginVertical: 10, // Add margin above and below the line
  },
  profileOptions: {
    // Add styles for the options container if needed
  },
  profileOption: {
    padding: 10, // Add padding for spacing between options
  },
  profileOptionText: {
    fontSize: 16,
  },
  courierButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#EDF6F9', // Adjust background color as desired
    padding: 10,
    marginBottom: 70,  // Added marginBottom
  },
  courierButton: {
    backgroundColor: '#003566', // Adjust button background color as desired
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  courierButtonText: {
    color: 'white', // Adjust button text color as desired
    fontSize: 16,
    fontWeight: 'bold',
  },
  courierBox: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  courierBoxText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
const style8 = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EDF6F9',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

const style9 = StyleSheet.create({
  restaurantScreen: {
    flex: 1, // Make the screen take up the whole view
    padding: 20, // Add some padding for aesthetics
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, // Add some space after the name
  },
  categoryContainer: {
    marginBottom: 15, // Space between categories
    borderBottomWidth: 1, // Add a border to separate categories
    borderBottomColor: '#ddd', // Border color
    paddingBottom: 5, // Space after the category title
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row', // Arrange elements in a row
    justifyContent: 'space-between', // Align items horizontally with space between
    alignItems: 'center', // Align items vertically in the center
    marginBottom: 10, // Space between menu items
  },
  orderNowText: {
    fontSize: 12,
    color: '#0080FF', // Optional: Blue color for "Order Now" text
  },
});

const style10 = StyleSheet.create({
  emergencyScreenContainer: {
    flex: 1, // Make the screen take up the whole view
    padding: 20,
    justifyContent: 'center', // Center elements vertically
    alignItems: 'center', // Center elements horizontally
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20, // Add some space after the title
  },
  messageContainer: {
    flexDirection: 'column', // Stack elements vertically
    alignItems: 'center',
  },
  messageInput: {
    width: '100%', // Make the input field fill the available width
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10, // Add some space before the button
  },
  orderButton: {
    backgroundColor: '#003566',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

