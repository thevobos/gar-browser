import {useRef, useState} from "react";
import {TouchableWithoutFeedback, Image, TextInput, ScrollView, Text, View, Keyboard, SafeAreaView} from 'react-native';
import {WebView} from "react-native-webview";
import {AntDesign} from "@expo/vector-icons";


export default function BrowserCustom({url,onClose = () => {}, init}) {

    const webviewRef = useRef()

    console.log(init);
    return (
        <>
            <View style={{position:"absolute", zIndex:9, top:0, left:0, width:"100%", height:"100%", backgroundColor:"#131723"}}>
                <SafeAreaView style={{flex:1, backgroundColor:"#131723"}}>
                    <View style={{flex:1,display:"flex",flexDirection:"column"}}>
                        <View style={{flex:1}}>
                            <WebView
                                ref={webviewRef}
                                style={{flex:1}}
                                originWhitelist={['*']}
                                source={{ uri: `https://${url}` }}
                            />
                        </View>
                        <View style={{height:70, paddingTop:15, backgroundColor:"#131723", display:"flex",flexDirection:"row", gap:15, justifyContent:"center", alignItems:"center"}}>
                            {
                                !init.welcome.welcome_system &&
                                    <TouchableWithoutFeedback onPress={() => onClose()}>
                                        <View style={{width:55, height:55, display:"flex", justifyContent:"center", alignItems:"center", borderRadius:6, backgroundColor:"#1d2231"}}>
                                            <AntDesign name="close" size={26} color="white" />
                                        </View>
                                    </TouchableWithoutFeedback>
                            }
                            <TouchableWithoutFeedback onPress={() => webviewRef?.current?.goBack()}>
                                <View style={{width:55, height:55, display:"flex", justifyContent:"center", alignItems:"center", borderRadius:6, backgroundColor:"#1d2231"}}>
                                    <AntDesign name="left" size={26} color="white" />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => webviewRef?.current?.goForward()}>
                                <View style={{width:55, height:55, display:"flex", justifyContent:"center", alignItems:"center", borderRadius:6, backgroundColor:"#1d2231"}}>
                                    <AntDesign name="right" size={26} color="white" />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => webviewRef?.current?.reload()}>
                                <View style={{width:55, height:55, display:"flex", justifyContent:"center", alignItems:"center", borderRadius:6, backgroundColor:"#1d2231"}}>
                                    <AntDesign name="reload1" size={26} color="white" />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </SafeAreaView>
            </View>


        </>
  );
}
