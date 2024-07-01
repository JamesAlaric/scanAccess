import { Stack } from "expo-router";


export default function RootLayout(){
    return(
        <Stack >
            
            <Stack.Screen name="index" options={{headerShown:false, title:"welcome"}}/>
            <Stack.Screen name="login" options={{headerShown:false, title:"log In"}}/>
            <Stack.Screen name="goRegister" options={{headerShown:false, title:"goRegister"}}/>
            <Stack.Screen name="(tabs)" options={{headerShown:false, title:"tabs", headerBackButtonMenuEnabled:true}}/>
        </Stack>
    )
}