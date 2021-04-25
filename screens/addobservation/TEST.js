<View style={styles.container}>
            <View style={{ width: '100%', marginLeft: 10, marginBottom: 20 }}>
                <Text style={{ color: '#C7BABA' }}>Add bird 1/7</Text>
                <Text style={{ fontSize: 20 }}>Onko havainnostasi kuvaa?</Text>
            </View>

            {isCameraVisible ?
                (<View style={{ flex: 1 }}>
                    <Camera style={{ flex: 4, height: 500, width: 400 }} ref={camera}></Camera>
                    <Button title="Take picture" onPress={()=>snap}></Button>
                    {/*<View>
                        <Image style={{ flex: 1 }} source={{ uri: photoName }}></Image>
                        <Image style={{ flex: 1 }} source={{ uri: `data:image/gif;base64,${photoBase64}` }}></Image>
                    </View> */}
                </View>
                ) : (
                    <View>
                        {hasCameraPermission ?
                            (<View style={{ alignItems: 'center' }}>
                                <View style={styles.buttonandicon}>
                                    <Icon type="font-awesome-5" name="camera-retro" size={80} onPress={setCameraVisible(true)}></Icon>
                                    <Text style={{ color: '#C7BABA' }}>Ota kuva!</Text>
                                </View>
                                <View style={styles.buttonandicon}>
                                    <Icon type="font-awesome-5" name="cloud-upload-alt" size={80}></Icon>
                                    <Text style={{ color: '#C7BABA' }}>Lataa kuva!</Text>
                                </View>
                            </View>
                            ) : (
                                <Text>No permission to use camera!</Text>
                            )}
                    </View>)}

            <Button buttonStyle={styles.nextbutton} titleStyle={{ color: 'white' }} title="Seuraava" onPress={() => navigation.navigate('AddName')}></Button>
        </View>