import React, {Component} from 'react';
import { StyleSheet, 
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      resultText: "",
      calculationText: ""
    }
    this.operations = ['DEL', '+', '-', '*', '/']
  }

  calculateResult = () => {
    text = this.state.resultText
    console.log(eval(text))
    this.setState({
      calculationText: eval(text)
    })
  }

  validate = () => {
    const text = this.state.resultText
    switch(text.slice(-1)){
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true
  }

  buttonPressed = (text) => {
    // console.log(text)

    if(text == '='){
      return this.validate() && this.calculateResult();
    }

    this.setState({
      resultText: this.state.resultText + text
    })
  }

  operate = (operation) => {
    switch(operation){
      case 'DEL':
        let text = this.state.resultText.split('')
        text.pop()
        if(this.state.resultText == "") return
        this.setState({
          resultText: text.join('')
        })
        break;

      case '+':
      case '-':
      case '*':
      case '/':
        let lastChar = this.state.resultText.split('').pop();
        if(this.operations.indexOf(lastChar) != -1) return
        if(this.state.resultText == "") return
        else {
          this.setState({
            resultText: this.state.resultText + operation
          })
        }
        break;
    }
  }


  render() {

    let rows = []
    let nums = [[1,2,3], [4,5,6], [7,8,9], ['.', 0, '=']]
    for(let i=0;i<4;i++){
      let row = [];
      for(let j=0;j<3;j++){
        row.push(
          <TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}>
            <Text style={styles.btntext}>{nums[i][j]}</Text>
          </TouchableOpacity>
        )
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }

    let ops = []
    for(let i=0;i<5;i++){
      ops.push(
        <TouchableOpacity key={this.operations[i]} style={styles.btn} onPress={() => this.operate(this.operations[i])}>
            <Text style={[styles.btntext, styles.white]}>{this.operations[i]}</Text>
          </TouchableOpacity>
      )
    }

    return (
      <View style={styles.container}>
        <View  style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style = {styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    calculationText: {
      fontSize: 60,
      color: 'black'
    },
    white: {
      color: 'white'
    },
    btn: {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    resultText: {
      fontSize: 50,
      color: 'black',
      marginTop: 50
    },
    result: {
      flex: 2,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    calculation: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    btntext: {
      fontSize: 30,
      color: 'white'
    },  
    buttons: {
      flex: 7,
      flexDirection: 'row'
    },
    numbers: {
      flex: 3,
      backgroundColor: '#434343'
    },
    operations: {
      flex: 1,
      justifyContent: 'space-around',
      backgroundColor: '#636363'
    }
});
