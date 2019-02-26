import React, { Component } from 'react';
import {Alert,StyleSheet, View, TextInput, TouchableOpacity, Text,StatusBar} from 'react-native';

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            kode: '',
            jumlah: '',
            harga: '',
        };
    }
    onPress = () => {
        this.setState({
            total: this.state.jumlah*this.state.harga,

        })
    }
    onPress2 = () => {
        this.setState({
            kembalian: this.state.bayar-this.state.total
        })
    }
    SearchFunction = () =>{

        const { kode }  = this.state ;
        fetch('http://kusuma.projasawebsite.com/contohapi/kasir/cari.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cari: kode,
            })
        }).then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    harga: responseData
                })
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#0026ca" barStyle="light-content" />
                <View style={styles.atas}>
                    <Text style={{color: 'white', fontSize: 20}}>Program Kasir</Text>
                </View>
                <View>
                    <Text>{'\n'}</Text>
                    <View style={{flex: 0, flexDirection: 'row'}}>
                        <Text style={{fontSize: 17,margin: 10}}>Kode Barang:</Text>
                        <TextInput
                            style={{height: 40,width: 90, borderColor: 'black', borderWidth: 1}}
                            onChangeText={(kode) => this.setState({kode})}
                            value={this.state.kode}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.SearchFunction}
                        >
                            <Text style={{color: "white"}}> cari </Text>
                        </TouchableOpacity>
                    </View>
                    <Text>{'\n'}</Text>
                    <View style={{flex: 0, flexDirection: 'row'}}>
                        <Text style={{fontSize: 17, margin: 10}}>Jumlah Beli: </Text>
                        <TextInput
                            style={{height: 40,width: 90, borderColor: 'black', borderWidth: 1}}
                            onChangeText={(jumlah) => this.setState({jumlah})}
                            value={this.state.jumlah}
                        />
                    </View>
                    <Text>{'\n'}</Text>
                    <View style={{flex: 0, flexDirection: 'row'}}>
                        <Text style={{fontSize: 17,margin: 10}}>Harga: </Text>
                        <TextInput
                            style={{height: 40,width: 90, borderColor: 'black', borderWidth: 1}}
                            onChangeText={(harga) => this.setState({harga})}
                            value={this.state.harga}
                        />
                    </View>
                </View>
                <Text>{'\n'}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onPress}
                >
                    <Text style={{color: "white"}}> hitung </Text>
                </TouchableOpacity>
                <Text>{'\n'}</Text>
                <Text>Total Belanja: {this.state.total}</Text>
                <Text>{'\n'}</Text>
                <TextInput
                    style={{height: 40, borderColor: 'black', borderWidth: 1}}
                    onChangeText={(bayar) => this.setState({bayar})}
                    value={this.state.bayar}
                    placeholder="Uang Bayar"
                />
                <Text>{'\n'}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onPress2}
                >
                    <Text style={{color: "white"}}> hitung </Text>
                </TouchableOpacity>
                <Text>{'\n'}</Text>
                <Text>Total kembalian: {this.state.kembalian}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
    },
    atas: {
        backgroundColor: '#304ffe',
        width: "100%",
        height: 60,
        alignItems: "center",
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'blue',
        color: "white",
        padding: 10,
        borderRadius: 7
    }

});
