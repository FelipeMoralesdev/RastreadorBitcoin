import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar } from 'react-native';

import CurrentPrice from './src/components/CurrentPrice';
import HistoryGraphic from './src/components/HistoryGraphic';
import QuotationList from './src/components/QuotationList';
import QuotationsItems from './src/components/QuotationList/QuotationsItems';

function addZero(number){
  if(number <= 9){
    return "0" + number
  }
  return number
}

function url(qtdDays){
  const date = new Date();
  const listLastDays = qtdDays
  const end_date = 
  `${date.getMonth()}-${addZero(date.getDate()+1)}-${addZero(date.getFullYear())}`
  date.setDate(date.getDate() - listLastDays)
  const start_date = 
  `${date.getMonth()}-${addZero(date.getDate()+1)}-${addZero(date.getFullYear())}`

  return `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda=%27EUR%27&@dataInicial=%27${start_date}%27&@dataFinalCotacao=%27${end_date}%27&$top=100&$format=json&$select=cotacaoVenda,dataHoraCotacao`

}

async function getListCoins(url) {
  let response = await fetch(url);
  let returnApi = await response.json();
  let selectListQuotations = returnApi.value;
  const queryCoinsList = selectListQuotations.map((item) => {
    const date = new Date(item.dataHoraCotacao);
    return {
      data: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      valor: item.cotacaoVenda,
    };
  });
  return queryCoinsList;
}

async function getPriceCoinsGraphic(url) {
  let responseG = await fetch(url);
  let returnApiG = await responseG.json();
  let selectListQuotationsG = returnApiG.bpi;
  const queryCoinsList = Object.keys(selectListQuotationsG.map((key)=>{
      selectListQuotationsG[key]
  }));
  let dataG = queryCoinsList;
  return dataG;
}


export default function App() {
  const [coinList, setCoinList] = useState([]);
  const [coinsGraphicList, setCoinsGraphicList] = useState([0]);
  const [days, setDays] = useState(30);
  const [updateData, setUpdateData] = useState(true);

  function updateDay(number){
    setDays(number);
    setUpdateData(true);
  }

  useEffect(() => {
    getListCoins(url(days)).then((data)=>{
      setCoinList(data)
    })

    getPriceCoinsGraphic(url(days)).then((dataG) => {
      setCoinsGraphicList(dataG)
    })
    if(updateData){
      setUpdateData(false)
    }

  }, [updateData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
      backgroundColor='#f50d41'
      />
      <CurrentPrice/>
      <HistoryGraphic/>
      <QuotationList filterDay={updateDay} listTransactions={coinList}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: Platform.OS === "android" ? 40:0,
  },
});
