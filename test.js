import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Pressable, Button, Alert } from "react-native";
import axios from 'axios'
import { TextInput } from "react-native-gesture-handler";


export default function Test() {
  const URLs = 'http://localhost:8000/'
  const [news, onChangeNews] = useState(null);
  const [lineslength, setLineslength] = useState(5);
  const [summary, setSummary] = useState('');
  const [selectedmode, setselectedmode] = useState(0);

  const getData = async (bb, lines) => {
      try {
          if (selectedmode == 0){
            const feedback = await axios.get(URLs + 'normal_summary?text=' + bb)
            console.log(feedback.data.summary)
            setSummary(feedback.data.summary)
          } else if (selectedmode == 1){
            const feedback = await axios.get(URLs + 'lexrank_summary?text=' + bb + '&line=' + lines)
            console.log(feedback.data.summary)
            setSummary(feedback.data.summary)
          } else if (selectedmode == 2){
            const feedback = await axios.get(URLs + 'pagerank_summary?text=' + bb + '&line=' + lines)
            console.log(feedback.data.summary)
            setSummary(feedback.data.summary)
          } else {
            console.log('@')
          }
      } catch(e) {
          console.log("fail")
      }
  }

  useEffect(() => {
      getData()
  }, [])

  return (
    <ImageBackground source={require('./assets/images/bg.png')} style={{width: '100%', height: '100%'}} resizeMode={"cover"}>
        <View style={{flex: 13, alignItems:'center'}}>
            {/* title */}
            <View style={{zIndex: 0, flex: 2, width:'100%', flexDirection:'row', backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                <Image source={require('./assets/images/pig.gif')} style={{width:'10%', height:'100%'}}/>
                <div style={{width:'2%'}}></div>
                <View>
                    <Text style={styles.title}>NLP System</Text>
                    <Text style={styles.title}>Summarization</Text>
                </View>
            </View>
            {/* header */}
            {/* <View style={styles.header}></View> */}
            {/* body */}
            <View style={styles.content}>
                <TextInput
                    placeholder = "Please Input Your News Here ..."
                    placeholderTextColor = {'#BBBBBB'}
                    onChangeText = {text => onChangeNews(text)}
                    multiline
                    style = {[styles.input1, styles.footer2]}
                />
                <View style={{width:'10%', height:'50%', alignItems:'center', justifyContent:'center'}}>
                    <Image style={{width:'60%', height:'50%'}} source={require("./assets/images/arror.gif")}/>
                </View>
                <TextInput
                    value = {summary} 
                    placeholder = "Your Summary"
                    placeholderTextColor = {'#BBBBBB'}
                    multiline
                    style = {[styles.input2, styles.footer2]}
                />
            </View>
            {selectedmode==1 || selectedmode==2
            ?<View style={{flex:1, flexDirection:'row'}}>
                
                <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                    <Text style={{fontFamily: 'chalkboard', fontWeight: 'bold', fontSize: 25,}}>Number of summary lines(under 5): </Text>
                    <TextInput
                        onChangeText = {text => setLineslength(text)}
                        style = {{fontSize:25, width:'30%', height:'44%', borderColor:'black', borderWidth:1, borderRadius:6}}
                    />
                </View>
                <View style={{width:'20%'}}>
                    <Button onPress={() => getData(news, lineslength)} title="Run"></Button>
                </View>
            </View>
            :<View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                <View style={{width:'200%'}}><Button onPress={() => getData(news, lineslength)} title="Run"></Button></View>
            </View>}
            {/* footer */}
            <View style={{zIndex: 0, flex: 2, width:'100%', justifyContent:'flex-end', alignItems:'center'}}>
                <div style={{zIndex: 0, height:'50%'}}></div>
                <div style={{zIndex: 0, height:'50%', backgroundColor:'white', width:'100%',}}></div>
                <View style={[styles.footer1, styles.footer2]}>

                    <View style={[styles.button, {borderRightWidth:1}]}>
                        <Pressable style={styles.pressable} onPress={()=> {setselectedmode(0)}}>
                        <Image 
                            style={styles.image}
                            source={require("./assets/images/1.png")}/>
                        {selectedmode==0
                        ?<Text style={styles.image_text_selected}>Weighted</Text>
                        :<Text style={styles.image_text}>Weighted</Text>}
                        </Pressable>
                    </View>

                    <View style={[styles.button, {borderRightWidth:1}]}>
                        <Pressable style={styles.pressable} onPress={()=> {setselectedmode(1)}}>
                        <Image 
                            style={styles.image}
                            source={require("./assets/images/2.png")}/>
                        {selectedmode==1
                        ?<Text style={styles.image_text_selected}>LexRank</Text>
                        :<Text style={styles.image_text}>LexRank</Text>}
                        </Pressable>
                    </View>

                    <View style={[styles.button, {borderRightWidth:1}]}>
                        <Pressable style={styles.pressable} onPress={()=> {setselectedmode(2)}}>
                        <Image 
                            style={styles.image}
                            source={require("./assets/images/3.png")}/>
                        {selectedmode==2
                        ?<Text style={styles.image_text_selected}>PageRank</Text>
                        :<Text style={styles.image_text}>PageRank</Text>}
                        </Pressable>
                    </View>

                    <View style={styles.button}>
                        <Pressable style={{}} onPress={()=>{}}>
                        <Image 
                            style={{width:'80%', height:'80%'}}
                            source={require("./assets/images/arror.gif")}/>
                        </Pressable>
                    </View>

                </View>
            </View>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    title:{
        fontWeight: 'bold',
        fontFamily: "Impact",
        fontSize: 40  
    },
    header:{
        zIndex: 0, 
        width:'100%',
        flex: 1, 
        backgroundColor:'white', 
        borderColor:'#D3D3D3', 
        borderBottomWidth:1, 
        borderTopWidth: 1
    },
    content: {
        zIndex: 0, 
        flex: 8, 
        width:'100%', 
        justifyContent:'center', 
        alignItems:'center', 
        flexDirection:'row'
    },
    input1: {
        borderWidth:3,
        borderRadius:20,
        borderColor:'#9D858F',
        backgroundColor:'white',
        paddingVertical: 0, 
        paddingLeft: 5, 
        fontSize: 20, 
        lineHeight: 34,
        fontFamily: 'arial',
        height: '80%',
        width:'50%'
    },
    input2: {
        borderTopWidth:3,
        borderBottomWidth:3,
        borderRightWidth:3,
        borderLeftWidth:6,
        borderRadius:20,
        borderColor:'#9D858F',
        backgroundColor:'white',
        paddingVertical: 0, 
        paddingLeft: 5, 
        fontSize: 20, 
        lineHeight: 34,
        fontFamily: 'arial',
        height: '80%',
        width:'30%'
    },
    button: {
        width:'23%', 
        height:'80%', 
        justifyContent:'center',
        alignItems:'center'
    },
    pressable: {
        justifyContent:'space-evenly',
        alignItems:'center',
        width:'40%', 
        height:'100%'
    },
    image: {
        width:60, 
        height:60
    },
    image_text: {
        fontFamily: 'chalkboard',
        fontWeight: 'bold',
        fontSize: 18,
    },
    image_text_selected: {
        textDecorationLine:'underline',
        color:'#dfa784',
        fontFamily: 'chalkboard',
        fontWeight: 'bold',
        fontSize: 18,
    },
    footer1: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white', 
        width:'80%', 
        height:'100%', 
        position: 'absolute', 
        zIndex:1
    },
    footer2: {
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOpacity: 0.2
    }
})