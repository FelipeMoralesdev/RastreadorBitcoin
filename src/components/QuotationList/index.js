import React, { Fragment } from "react";
import {ScrollView, View, Text, TouchableOpacity, FlatList} from "react-native";
import styles from "./styles";
import QuotationsItems from "./QuotationsItems";

export default function QuotationList(props){
    const daysQuery = props.filterDay
    return(
        <Fragment>
            <View style={styles.filters}>
                <TouchableOpacity
                style={styles.buttonQuery}
                onPress={()=> daysQuery(7)}
                >
                    <Text style={styles.textButton}>7D</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.buttonQuery}
                onPress={()=> daysQuery(15)}
                >
                    <Text style={styles.textButton}>15D</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.buttonQuery}
                onPress={()=> daysQuery(30)}
                >
                    <Text style={styles.textButton}>1M</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.buttonQuery}
                onPress={()=> daysQuery(90)}
                >
                    <Text style={styles.textButton}>3M</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.buttonQuery}
                onPress={()=> daysQuery(180)}
                >
                    <Text style={styles.textButton}>6M</Text>
                </TouchableOpacity>

            </View>
            <ScrollView>
                <FlatList
                data={props.listTransaction}
                renderItem={({item})=>{
                    return<QuotationsItems valor={item.valor} data={item.data}/>
                }}
                ></FlatList>
            </ScrollView>

        </Fragment>
    )
}