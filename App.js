import React from 'react';
import {Alert} from "react-native";
import Loading from "./Loading";
import * as Location from 'expo-location';
import axios from 'axios';
import Umbrella from "./Umbrella";
import * as TaskManager from 'expo-task-manager'
import * as BackgroundFetch from 'expo-background-fetch';
const API_KEY = "b077bc1e699f7573e652b50541fbdbba";

//BackgroundFetch.setMinimumIntervalAsync(5);
const taskName = 'refresh-api';
let dateToday = new Date;
let currentDay = dateToday.getDate();
let alarmChecker = false;

export default class App extends React.Component{
  state = {
    isLoading: true,
    isRain: false,
    Rain: [],
    location: "",
  };
  getLocation = async () =>{
    console.log("check !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    try{
      await Location.requestPermissionsAsync();
      const data = await Location.getCurrentPositionAsync();
      console.log(data);
      const{coords: {latitude, longitude}} = data;
      const where = await Location.reverseGeocodeAsync({
        latitude: latitude,
        longitude: longitude
      });
      console.log("what");
      const place = where[0].city;
      console.log(where);
      //console.log("data");
      //console.log(data);      
      this.getWeather(latitude, longitude);
      

    }
    catch(error){

    }
  };

  getWeather = async (latitude, longitude) =>{
    const {data : {hourly}} = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&%20exclude=hourly,daily&appid=${API_KEY}`);
    let rainChecker = false;
    let todayList = [];
    let today = new Date;
    let date = today.getDate();
    let hours = "No Rain";
    const city = await Location.reverseGeocodeAsync({
      latitude: latitude,
      longitude: longitude
    });
    hourly.forEach( function (item){
      let unix_timestampe = item.dt;
      let dateConvert = new Date(unix_timestampe * 1000);
      //console.log("check");
      //console.log("check2");
      if(dateConvert.getDate() === date){
        todayList.push(item);
        
      }
      
    });
    let RainArray = [];
    todayList.forEach( function (item){
      if(item.weather[0].main === "Rain" || item.weather[0].main === "Thunderstorm"){
        let time = "";
        let timestamp = item.dt;
        let convertTime = new Date(timestamp * 1000);
        hours = convertTime.getHours();
        RainArray.push(time + convertTime.getHours() +":00");
        rainChecker = true;
      }
    });
    if(rainChecker){
      this.setState({
        isLoading: false,
        isRain: true,
        Rain: RainArray,
        location: city[0].city

      });

    }
    else{
      this.setState({
        isLoading: false,
        isRain: false,
        Rain: RainArray,
        location: city[0].city
      });

    }

    
  }



  
  componentDidUpdate(){
    console.log("yap");
  }

  componentDidMount = async () => {
    setInterval(() => {this.getLocation()}, 3000)
    //86400 하루
    this.registerTaskAsync();
    await Location.startLocationUpdatesAsync('firstTask', {
      accuracy: Location.Accuracy.Balanced,
    });
  }
  
  registerTaskAsync = async () =>{
    await BackgroundFetch.registerTaskAsync(taskName);
    console.log("task registered");
    const status = await BackgroundFetch.getStatusAsync();
    switch (status) {
      case BackgroundFetch.Status.Restricted:
        alert('Restrict');
        break;
      case BackgroundFetch.Status.Denied:
        alert('Background execution is disabled');
        break;

      case BackgroundFetch.Status.Available:
        alert('Avaible');
        break;

      default: {
        alert('Background execution allowed');

        let tasks = await TaskManager.getRegisteredTasksAsync();
        if (tasks.find(f => f.taskName === taskName) == null) {
          alert('Registering task');
          await BackgroundFetch.registerTaskAsync(taskName);

          tasks = await TaskManager.getRegisteredTasksAsync();
          alert('Tanımlananlar', tasks);
        } else {
          alert(`Task ${taskName} already registered, skipping`);
        }

        await BackgroundFetch.setMinimumIntervalAsync(15);
        
        break;
      }
    }


  }
  
  render(){
    const {isLoading, isRain, Rain, city} = this.state;
    console.log(this.state);
    return isLoading ? <Loading /> : <Umbrella condition = {isRain} rain = {Rain} city = {city}/>;
    //return <Loading/>
  }
};




TaskManager.defineTask('firstTask', async ({ data, error }) => {
  let rainchecker = false;
  if (error) {
    // Error occurred - check `error.message` for more details.
    console.log(error.message);
    return;
  }
  if (data) {
    let todayList = [];
    let rainChecker = false;
    let today = new Date;
    let date = today.getDate();
    if(data === undefined){
      console.log("sdfsdfdsf");

    }
    const { locations } = data;
    const{coords: {latitude, longitude}} = locations[0];
    const {data : {hourly}} = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&%20exclude=hourly,daily&appid=${API_KEY}`);
    hourly.forEach( function (item){
      let unix_timestampe = item.dt;
      let dateConvert = new Date(unix_timestampe * 1000);
      //console.log("check");
      //console.log("check2");
      if(dateConvert.getDate() === date){
        todayList.push(item);
        
      }
      
    });
    todayList.forEach( function (item){
      if(item.weather[0].main === "Rain" || item.weather[0].main === "Thunderstorm"){
        rainChecker = true;
      }
    });
    //push
    if(rainchecker){
      
    }

    

  }
})

TaskManager.defineTask(taskName, async() => {

  try{
    let rainChecker = false;
    let todayCheck = dateToday.getDate();
    if(currentDay !== todayCheck){
      alarmChecker = false;
    }


    console.log("check background api reset");
    const data = await Location.getCurrentPositionAsync();
    console.log(data);
    const{coords: {latitude, longitude}} = data;
    const {data : {hourly}} = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&%20exclude=hourly,daily&appid=${API_KEY}`);
    hourly.forEach( function (item){
      let unix_timestampe = item.dt;
      let dateConvert = new Date(unix_timestampe * 1000);
      //console.log("check");
      //console.log("check2");
      if(dateConvert.getDate() === date){
        todayList.push(item);
        
      }
      
    });
    todayList.forEach( function (item){
      if(item.weather[0].main === "Rain" || item.weather[0].main === "Thunderstorm"){
        rainChecker = true;
      }
    });
    //push
    if(rainChecker === true && alarmChecker === false){
      alarmChecker = true;

      
    }

  }
  catch (error){
    alert('error');
  }

})
