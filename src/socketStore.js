import io from 'socket.io-client'
import {ON_USER_UPDATE} from './actions'
import {onUserDataUpdate} from './actions'
import store from "./reduxStore"
const socket=io('http://192.168.1.224:8000');


socket.on('test',function(data){console.log(data)});
//socket.on("New_User",function(data){console.log(data)});

/*
 *
 */

socket.on(ON_USER_UPDATE, function(data){
  console.log(data);
  store.dispatch(onUserDataUpdate(data));
})

export default socket;
