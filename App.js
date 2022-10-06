import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {Image, Button, StyleSheet, View, Text} from 'react-native';

const App = () => {
  const [screen, setScreen] = useState(0);
  const handleClick = value => {
    setScreen(value);
  };

  const [inputDataTown, setInputDataTown] = useState({
    ten: '',
    ma: '',
  });

  const [inputDataUser, setInputDataUser] = useState({
    ten: '',
    sophong: '',
    phone: '',
  });

  const [dataTown, setDataTown] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  const handleChangeInputTown = (name, value) => {
    setInputDataTown({...inputDataTown, [name]: value});
  };

  const handleChangeInputUser = (name, value) => {
    setInputDataUser({...inputDataUser, [name]: value});
  };

  const handleDeleteTown = ma => {
    setDataTown(list => list.filter(it => it.ma !== ma));
  };

  const handleAddTown = () => {
    if (!inputDataTown.ten || !inputDataTown.ma) {
      ToastAndroid.show('Tên hoặc mã không được để trống', ToastAndroid.SHORT);
      return;
    }
    if (dataTown.findIndex(item => item.ma === inputDataTown.ma) > -1) {
      ToastAndroid.show('Mã tòa nhà đã tồn tại', ToastAndroid.SHORT);
      return;
    }
    setDataTown(list => [...list, inputDataTown]);
    setInputDataTown({ten: '', ma: ''});
  };

  const handleDeleteUser = phone => {
    setDataUser(list => list.filter(it => it.phone !== phone));
  };

  const handleAddUser = () => {
    if (!inputDataUser.sophong || !inputDataUser.phone) {
      ToastAndroid.show('Tên hoặc mã không được để trống', ToastAndroid.SHORT);
      return;
    }
    if (dataTown.findIndex(item => item.phone === inputDataUser.phone) > -1) {
      ToastAndroid.show(
        'phone đã tồn tại vui lòng nhập lại',
        ToastAndroid.SHORT,
      );
      return;
    }
    setDataUser(list => [...list, inputDataUser]);
    setInputDataUser({ten: '', sophong: '', phone: ''});
  };

  const Home = () => {
    return (
      <SafeAreaView>
        <View
          style={{
            height: 40,
            backgroundColor: '#f19339',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Quản Lý Dân Cư
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{
              width: 200,
              height: 200,
            }}
            source={{
              uri: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.18169-9/29683398_183965109060156_6337909875489863348_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8631f5&_nc_ohc=GIlL1ST-51sAX9vnXBW&_nc_ht=scontent.fhan2-4.fna&oh=00_AT-GZVyHWPFd6GvsFDjy4cXdyfZYX13kRhayfwdBbq7LDg&oe=636312D8',
            }}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Button
            color="#f19339"
            title="Quản lý tòa nhà"
            onPress={() => handleClick(1)}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Button
            color="#f19339"
            title="Quản lý cư dân"
            onPress={() => handleClick(2)}
          />
        </View>
      </SafeAreaView>
    );
  };

  const ManagerTown = () => {
    return (
      <SafeAreaView>
        <View
          style={{
            height: 40,
            backgroundColor: '#f19339',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Quản lý tòa nhà
          </Text>
        </View>
        <View>
          <TextInput
            value={inputDataTown.ten}
            onChangeText={e => handleChangeInputTown('ten', e)}
            style={{height: 40, margin: 12, borderWidth: 1, padding: 10}}
            placeholder="Tên tòa nhà"
          />
        </View>
        <View>
          <TextInput
            value={inputDataTown.ma}
            onChangeText={e => handleChangeInputTown('ma', e)}
            style={{height: 40, margin: 12, borderWidth: 1, padding: 10}}
            placeholder="Mã tòa nhà"
          />
        </View>
        <View
          style={{
            width: '80%',
            marginLeft: '10%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Button
            onPress={() => {
              handleAddTown();
            }}
            title="Thêm"
            color="#f19339"
          />
          <Button
            title="Quay lại"
            color="#f19339"
            onPress={() => handleClick(0)}
          />
        </View>
        <View style={{marginTop: 20, backgroundColor: '#f7c779'}}>
          <ScrollView>
            {dataTown?.map(item => (
              <View
                style={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View>
                  <Text>{item.ten}</Text>
                </View>
                <View>
                  <Text>{item.ma}</Text>
                </View>
                <View>
                  <Text onPress={() => handleDeleteTown(item.ma)}>Xóa</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };

  const ManagerUser = () => {
    return (
      <SafeAreaView>
        <View
          style={{
            height: 40,
            backgroundColor: '#f19339',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Quản lý dân cư
          </Text>
        </View>
        <View>
          <TextInput
            value={inputDataUser.ten}
            onChangeText={e => handleChangeInputUser('ten', e)}
            style={{height: 40, margin: 12, borderWidth: 1, padding: 10}}
            placeholder="Tên dân cư"
          />
        </View>
        <View>
          <TextInput
            value={inputDataUser.sophong}
            onChangeText={e => handleChangeInputUser('sophong', e)}
            style={{height: 40, margin: 12, borderWidth: 1, padding: 10}}
            placeholder="số phòng"
          />
        </View>
        <View>
          <TextInput
            value={inputDataUser.phone}
            onChangeText={e => handleChangeInputUser('phone', e)}
            style={{height: 40, margin: 12, borderWidth: 1, padding: 10}}
            placeholder="số điện thoại"
          />
        </View>
        <View
          style={{
            width: '80%',
            marginLeft: '10%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Button
            onPress={() => {
              handleAddUser();
            }}
            title="Thêm"
            color="#f19339"
          />
          <Button
            title="Quay lại"
            color="#f19339"
            onPress={() => handleClick(0)}
          />
        </View>
        <View style={{marginTop: 20, backgroundColor: '#f7c779'}}>
          <ScrollView>
            {dataUser?.map(item => (
              <View
                style={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View>
                  <Text>{item.ten}</Text>
                </View>
                <View>
                  <Text>{item.sophong}</Text>
                </View>
                <View>
                  <Text>{item.phone}</Text>
                </View>
                <View>
                  <Text onPress={() => handleDeleteUser(item.phon)}>Xóa</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };

  const renderContent = () => {
    switch (screen) {
      case 0:
        return <Home />;
      case 1:
        return <ManagerTown />;
      case 2:
        return <ManagerUser />;
      default:
        return null;
    }
  };
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#f7c779" />
      {renderContent()}
    </SafeAreaView>
  );
};

export default App;
