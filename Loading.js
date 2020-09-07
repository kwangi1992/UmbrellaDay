import React from "react";
import { StyleSheet, Image,Text, View, StatusBar } from 'react-native';

export default function Loading(){

    


    return(
        <View style = {styles.container}>
            <View style = {styles.halfContainer}>
            <Image
                style = {styles.logo} 
                source = {require('./assets/032-umbrella.png')}/>
            </View>
            
            <Text style = {styles.text} > Loading ...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "black"

    },
    halfContainer :{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text :{
        color: "#2c2c2c",
        fontSize: 30
    },
    logo: {
        width: 350,
        height: 350,
    },
    title:{
        position:"absolute",
        
        resizeMode: 'contain',
        width: 350,
        height: 100,
        bottom: 70
    }  
});