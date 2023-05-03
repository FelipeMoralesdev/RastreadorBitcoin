import React from "react";
import {View, Text, Image} from "react-native";
import styles from "./styles";

export default function QuotationsItems(){
    return(
        <View style={styles.mainContent}>

            <View style={styles.contextLeft}>
                <View style={styles.boxLogo}>
                    <Image
                    style={styles.logoBitcoin}
                    source={require("../../../img/bitcoin.png")}
                    ></Image>
                    <Text style={styles.dayCotation}>02/05/2023</Text>
                </View>
            </View>

            <View style={styles.contextRight}>
                <Text style={styles.price}>R$ 143.778,60</Text>
            </View>

        </View>
    )
}