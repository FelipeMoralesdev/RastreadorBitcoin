import React from "react";
import {View, Text} from "react-native";
import styles from "./styles";

export default function CurrentPrice(){
    return(
        <View style={styles.headerPrice}>
            <Text style={styles.currentPrice}>R$ 142.055,49</Text>
            <Text style={styles.textPrice}>Última cotação.</Text>
        </View>
    )
}