import io from 'socket.io-client'
import {Events} from './actions'
import {onUserDataUpdate} from './actions'
import store from "./reduxStore"
const socket=io('http://192.168.1.33:8000');


socket.on('test',function(data){console.log(data)});
//socket.on("New_User",function(data){console.log(data)});

/*
 *
 */

socket.on(Events.ON_USER_UPDATE, function(data){
  console.log(data);
  store.dispatch(onUserDataUpdate(data));
})

export default socket;
