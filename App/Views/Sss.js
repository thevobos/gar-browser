import {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import {TouchableWithoutFeedback, Image, TextInput, ScrollView, Text, View, Keyboard} from 'react-native';
import Accordion from "react-native-collapsible/Accordion";
import Constants from "expo-constants";

const SECTIONS = [
    {
        title: 'Nasıl Kullanılır',
        content: 'GarBrowser ile sitelerinizi direk açılış sayfası olarak kullanabilir PWA site gibi açabilirsiniz',
    },
    {
        title: 'Site Ekleme',
        content: 'Eklemek istediginiz alan adını başında http yada https gibi bir protokol olmadan yazınız, Örnek google.com formatında',
    },
    {
        title: 'Site Silme',
        content: 'Geçmiş sitelerim alanında sitelerinizi kolaylıkla silebilirsiniz',
    },
    {
        title: 'Anasayfa ekleme',
        content: 'Ekli olan site üzerinde bulunan EV butonuna tıklamanız yeterli olacaktır',
    },
    {
        title: 'KVKK, Veriler',
        content: 'GarBrowser sizlerin site bilgilerini, ve geçmişlerini kayıt altına almaz',
    },
    {
        title: 'İletişim',
        content: 'Bizleri İnstagram, Facebook ve diğer sosyal medya platformlarından GarBrowser olarak takip edebilirsiniz',
    }
];

export default function Sss() {

    const [activeSections, setActiveSections] = useState([]);

    const renderHeader = (section) => {
        return (
            <View style={{color:"white", marginTop:10, backgroundColor:"#001d47", marginBottom:10, paddingTop:10, paddingBottom:10, paddingLeft:10, borderRadius:6}}>
                <Text style={{fontSize:22, color:"white"}}>{section.title}</Text>
            </View>
        );
    };

    const renderContent = (section) => {
        return (
            <View style={{paddingLeft:10, paddingRight:10}}>
                <Text style={{fontSize:22, color:"white"}}>{section.content}</Text>
            </View>
        );
    };

    const updateSections = (activeSections) => {
        setActiveSections(activeSections);
    };

    return (
        <>
            <ScrollView automaticallyAdjustKeyboardInsets automaticallyAdjustContentInsets  style={{ position:"relative", width:"100%", height:"100%", flex:1}}>
                <View style={{ overflow:"hidden", flex:1,  paddingTop: ( Constants.statusBarHeight + 155 ),  paddingBottom:15, alignItems:"center" }}>

                    <Accordion
                        touchableComponent={TouchableWithoutFeedback}
                        containerStyle={{width:"90%", height:"100%", marginTop:15, borderRadius:6}}
                        sections={SECTIONS}
                        activeSections={activeSections}
                        renderHeader={renderHeader}
                        renderContent={renderContent}
                        onChange={updateSections}
                    />

                </View>
            </ScrollView>


        </>
  );
}
