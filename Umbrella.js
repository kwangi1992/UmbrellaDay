import React from "react";
import {Alert} from "react-native";
import {View, Text, Image, Button, StyleSheet, StatusBar, ScrollView} from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import PropTypes from "prop-types";
import { Dimensions } from 'react-native'



export default function Umbrella ({condition, rain, city}){
    //console.log(rain);
    let weather = null;
    let rainhour = rain;
    let d = new Date();
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let year = d.getFullYear();
    let month = months[d.getMonth()];
    let date = d.getDate();
    let dateString = "" + month + " " + date +"th  " + year;
    console.log(dateString);

    if(condition === true){
        weather = "Rain";


    }
    else{
        weather = "NoRain";
   
    }
    
    
    return (
        <View style = {styles.container}>
            <View style = {styles.firstContainer}>
                <StatusBar barStyle="light-content" />
                <Text style = {styles.Date}>{dateString}
                </Text>
                {condition && 
                    <Text style = {styles.raintitle}>
                        Rain Today !
                    </Text>
                }
                {!(condition) &&
                    <Text style = {styles.raintitle}>
                        No Rain Today !
                    </Text>

                }
                
                <Image
                     style = {styles.logo} 
                    source = {weatherOption[weather].image}></Image>
            </View>

            <View style = {styles.secondContainer}>
                <Text style = {styles.subtitle}>{weatherOption[weather].title}
                </Text>
                
            </View>
            
            <View style = {styles.thirdContainer}>
                {condition &&
                    <ScrollView style = {styles.ScrollviewContainer}>
                        <Text style ={{fontSize: 30, color: "white"}}>
                        {"  "}
                        Rain at:
                        </Text>
                    {rainhour.map(d => <Text style = {styles.textTable} key = {d}>     {d} </Text>)}

                    </ScrollView>
                
                }
                
            </View>
            <View style = {styles.adContainer}>
            </View>

            
    
                
            


            
        </View>
    );





}






const weatherOption ={
    Rain :{
        title: `Bring an Umbrella Today`,
        image: require("./assets/umbrella1.png")
    },
    NoRain :{
        title: `Don't have to bring an Umbrella`,
        image: require("./assets/023-sunny.png")
    }
}


const styles = StyleSheet.create({
    container :  {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "black"
        
    },
    firstContainer:{
        flex: 1.4,
        justifyContent: "center",
        alignItems: "center",
        
    },
    secondContainer:{
        //backgroundColor: "steelblue",
        flex: 0.25,
        justifyContent: "center",
        alignItems: "center",
        
    },
    thirdContainer:{
        flex:0.3,
        //backgroundColor: "skyblue",
        justifyContent: "center",
        alignItems: "center",
    },
    adContainer:{
        flex:0.3,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",

    },
    ScrollviewContainer:{
        flex:1,
        width: Dimensions.get('window').width,
        backgroundColor: "black",
    },
    logo: {
        position:'absolute',
        bottom:0,
        width: 300,
        height: 300,
    },
    Date: {
        position:'absolute',
        top:35,
        left:15,
        fontSize: 40,
        color: "white"
    },
    subtitle:{
        position: 'absolute',
        color: "white",
        flex:1,
        fontSize: 25,
        left: 15,
        top: 15
    },
    textTable:{
        fontSize:25,
        color: "white"
    },
    raintitle:{
        position:'absolute',
        top:95,
        left:45,
        fontSize: 28,
        color: "white"

    },
    

})