import {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import {TouchableWithoutFeedback, Image, TextInput, ScrollView, Text, View, Keyboard} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import LogoPNG from "../../assets/logo.png";
import SearchAnim from "../../assets/Search_3.json";
import { LinearGradient } from 'expo-linear-gradient';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import {ApiCode, ApiEndpoints} from "../Configs/Services";



const isValidDomain = (domain) => domain.match(/^(?:(?:https?:\/\/)?(?:www\.)?|www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+)$/);

export default function Home({onClickSite, activeURL, userID}) {

    const [url, setUrl] = useState('');
    const [getSites, setSites] = useState([]);


    const GetSites = ()  => {

        fetch(activeURL + ApiEndpoints.siteHistory + "?api_key=" + ApiCode + "&user_id=" + userID)
            .then(response => response.json())
            .then(response => {

                if(response.status === 0){
                    throw new Error("Servis Hatası");
                }

                console.log(response)
                setSites(response.data.sites ?? [])


            })
            .catch(error => {
                console.log("HATA getLastSitesCallback: ",error)
            })

    }

    useEffect(() => {

        if(userID && activeURL){

            GetSites();

        }

    }, [userID,activeURL]);

    return (
        <>
            <ScrollView automaticallyAdjustKeyboardInsets automaticallyAdjustContentInsets  style={{ position:"relative", width:"100%", height:"100%", flex:1}}>
                <View style={{ overflow:"hidden", flex:1,  paddingTop: ( Constants.statusBarHeight + 155 ),  paddingBottom:15, alignItems:"center" }}>


                <View style={{width:"90%", marginBottom:25,  borderRadius:6, overflow:"hidden", marginTop:45}}>
                <LottieView
                    autoPlay
                    style={{
                        width: "100%",
                        height: 180
                    }}
                    source={SearchAnim}
                />
            </View>

            <View style={{ width:"90%", display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", marginTop:20}}>

                <TextInput
                    value={url}
                    placeholderTextColor={"white"}
                    style={{  flex:1, height:50, color:"white", backgroundColor:"#001d47", borderRadius:6, padding:10 }}
                    placeholder="Eklenecek Site Adresi"
                    keyboardType="url"
                    onChangeText={text => {

                        setUrl(text.toLowerCase());

                        if(isValidDomain(text.toLowerCase())){
                            setUrl(text.toLowerCase());
                        }

                    }}
                />

                <TouchableWithoutFeedback disabled={!url} onPress={() => {


                    fetch(activeURL + ApiEndpoints.siteAdd + "?api_key=" + ApiCode + "&user_id=" + userID + "&url=" + url)
                        .then(response => response.json())
                        .then(response => {


                            console.log("LOG : ",response);

                            GetSites();

                            setUrl('');


                        })
                        .catch(error => {
                            console.log("HATA : ",activeURL + ApiEndpoints.siteAdd + "?api_key=" + ApiCode+ ApiCode + "&user_id=" + userID + "&url=" + url)
                        })

                }}>
                    <View style={{  display:"flex", justifyContent:"center", alignItems:"center", marginLeft:5, aspectRatio: 1 / 1, width:50, backgroundColor: url ? "#001d47" : 'rgba(0,0,0,0.27)' , borderRadius:6, padding:10 }}>
                        <AntDesign name="plus" size={18} color={ url ? "#ffffff" : 'rgba(155,155,155,0.24)'} />
                    </View>
                </TouchableWithoutFeedback>

            </View>

            <View style={{width:"90%", height:30,   marginTop:45, marginBottom:25, display:"flex", justifyContent:"center", borderBottomWidth:1, borderBottomColor:"#727c94", paddingBottom:10}}>
                <Text style={{color:"#727c94", fontSize:18}}>
                    Kayıtlı Siteler
                </Text>
            </View>


            {
                getSites.length === 0 &&
                    <View  style={{width:"90%", marginBottom:15,   flexDirection:"row",   display:"flex", alignItems:"center", backgroundColor:"#001d47",  justifyContent:"center", borderRadius:6,  borderWidth:1, borderColor:"#010405", padding:10}}>
                        <Text style={{color:"white"}}> Kayıt Bulunamadı </Text>
                    </View>
            }

            {

                getSites.map(item => {
                    var id = "id" + Math.random().toString(16).slice(2)

                    return(
                        <View key={`url_${id}`} style={{width:"90%", marginBottom:15,   flexDirection:"row",   display:"flex", alignItems:"center", backgroundColor:"#001d47",  justifyContent:"space-between", borderRadius:6,  borderWidth:1, borderColor:"#010405", padding:10}}>
                            <Text style={{color:"#727c94", fontSize:18}}>
                                {item.url}
                            </Text>
                            <View style={{display:"flex", gap:10, flexDirection:"row"}}>
                                <TouchableWithoutFeedback onPress={() => {

                                    fetch(activeURL + ApiEndpoints.siteDelete + "?api_key=" + ApiCode + "&user_id=" + userID + "&url=" + item.url)
                                        .then(response => response.json())
                                        .then(response => {

                                            console.log(response)

                                            GetSites();

                                        })
                                        .catch(error => {
                                            console.log("HATA : ",activeURL + ApiEndpoints.siteAdd + "?api_key=" + ApiCode+ ApiCode + "&user_id=" + userID + "&url=" + url)
                                        });

                                }}>
                                    <View style={{height:40, width:40, backgroundColor:"#e70404", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:6}}>
                                        <AntDesign name="delete" size={18} color="white" />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {

                                    fetch(activeURL + ApiEndpoints.siteHome + "?api_key=" + ApiCode + "&user_id=" + userID + "&url=" + item.url)
                                        .then(response => response.json())
                                        .then(response => {

                                            console.log(response)
                                            onClickSite({status: true, url: item.url})

                                        })
                                        .catch(error => {
                                            console.log("HATA : ",activeURL + ApiEndpoints.siteAdd + "?api_key=" + ApiCode+ ApiCode + "&user_id=" + userID + "&url=" + url)
                                        })


                                }}>
                                    <View style={{height:40, width:40, backgroundColor:"#001535", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:6}}>
                                        <AntDesign name="home" size={18} color="white" />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => onClickSite({status: true, url: item.url})}>
                                    <View style={{height:40, width:40, backgroundColor:"#001535", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:6}}>
                                        <AntDesign name="right" size={18} color="white" />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    )
                })

            }


                </View>
            </ScrollView>
        </>
  );
}
