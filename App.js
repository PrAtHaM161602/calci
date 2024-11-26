import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { ScrollView, Button, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [output,setOutput] = useState("0")
  const buttons = [
    '1','2','3','4','5','6','7','8','9','0','00','+','-','x','/'  ]

  
  const del = () => {
    try {
      setOutput(output.substring(0,output.length-1))
    } catch (error) {
      console.log(error)
    }
    
  }
  const result = () => {
   try {
    
    if (output.includes('x'))
    {
      setOutput(eval(output.substring(0,output.indexOf('x'))+'*'+output.substring(output.indexOf('x')+1,output.length)))
    }
    else if(output.includes('^'))
    {
      setOutput(eval(output.substring(0,output.indexOf('^'))+'**'+ output.substring(output.indexOf('^')+1,output.length)))
    }
    else if (output.includes("√"))
    {
      if (output.indexOf("√") !=0) {
      setOutput(eval(output.substring(0,output.indexOf("√"))+"*"+Math.sqrt(output.substring(output.indexOf("√")+1,output.length))))
      }
      else {
        setOutput(Math.sqrt(output.substring(1,output.length)))
      }
    }
    else if(output.includes("ln"))
    {
      if (output.indexOf("ln") == 0)
      {
        // console.log(output.substring(2,output.length))
        // console.log(Math.log(Number(output.substring(2,output.length))))
        setOutput(Math.log(Number(output.substring(2,output.length))))
      }
      else
      {
        setOutput(eval(output.substring(0,output.indexOf("ln"))+"*"+Math.log(output.substring(output.indexOf("ln")+2,output.length))))
      }
      
    }
    else 
    { 
     
     
        setOutput(eval(output))
     
      
    }
  }
  catch (error)
  {
    ToastAndroid.show("Invalid operation",ToastAndroid.SHORT)
    setOutput('0')
  }
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.bar}>Calculator</Text>
      <Text style={styles.output}>{output}</Text>
      <View style={styles.innerContainer}>
      <TouchableOpacity style={{backgroundColor:"orange", width:"25%",backgroundColor:"orange", width:"25%",borderColor:"white",borderWidth:0.5}} onPress={()=>setOutput('0')}><Text style={{fontSize:40,textAlign:"center",fontWeight:"bold"}}>AC</Text></TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:"orange", width:"25%",backgroundColor:"orange", width:"25%",borderColor:"white",borderWidth:0.5}} onPress={del}><Text style={{fontSize:40,textAlign:"center",fontWeight:"bold"}}> DEL</Text></TouchableOpacity>
      {buttons.map((button,index)=>{
        return(
          <TouchableOpacity style={styles.button} key={index} onPress={()=>output=='0'? setOutput(button) : setOutput(output+button)}>
            <Text style={{color:"white",fontWeight:"bold",fontSize:40}}>{button}</Text>
            </TouchableOpacity>
        )
      })}
     
      <TouchableOpacity style={{backgroundColor:"green" ,width:"25%",borderColor:"white",borderWidth:0.5}} onPress={()=>setOutput(output +"^")}><Text style={{color:"white",fontSize:40,textAlign:"center",fontWeight:"bold"}}>^</Text></TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:"green", width:"25%",borderColor:"white",borderWidth:0.5}} onPress={()=>setOutput(output**2)}><Text style={{color:"white",fontSize:20,textAlign:"center",fontWeight:"bold"}}>2</Text></TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:"green", width:"25%",borderColor:"white",borderWidth:0.5}} onPress={()=>output=='0'? setOutput("√") : setOutput(output+'√')}><Text style={{color:"white",fontSize:40,textAlign:"center",fontWeight:"bold"}}>√</Text></TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:"green" ,width:"25%",borderColor:"white",borderWidth:0.5}} onPress={()=>output=='0' ? setOutput("(") : setOutput( output+"(")}><Text style={{color:"white",fontSize:40,textAlign:"center",fontWeight:"bold"}}>(</Text></TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:"green", width:"25%",borderColor:"white",borderWidth:0.5}} onPress={()=>output=='0' ? setOutput(")") : setOutput( output+")")}><Text style={{color:"white",fontSize:40,textAlign:"center",fontWeight:"bold"}}>)</Text></TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:"green", width:"25%",borderColor:"white",borderWidth:0.5}} onPress={()=>output=='0' ? setOutput("ln") : setOutput( output+"ln")}><Text style={{color:"white",fontSize:40,textAlign:"center",fontWeight:"bold"}}>ln</Text></TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:"orange", width:"25%",borderColor:"white",borderWidth:0.5}} onPress={result}><Text style={{fontSize:40,textAlign:"center",fontWeight:"bold"}}>=</Text></TouchableOpacity>
      </View>

  </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  bar: {
    backgroundColor:"purple",
    width:"100%",
    minHeight:40,
    textAlign:"center",
    fontWeight:'bold',
    fontSize:20,
    color:"white",
    paddingVertical:25

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:'column',
    width:"100vw"
    
  },
  innerContainer: {
    
   flexDirection:"row",
   flexWrap:"wrap"
    
    
  },
  output: {
    backgroundColor: "#D3D3D3",
    height:150,
    width: "100%",
    textAlign:"right",
    fontSize:50
  },
  grid: {
  
    width:"100%",
   
    
    
  },
  button: {
    maxWidth:"100%",
    minWidth: "25%", // Divide buttons into 4 columns
    minHeight:"17%",
    maxHeight: "25%", // Divide buttons into 4 rows
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: "#007BFF",
    
  },
});
