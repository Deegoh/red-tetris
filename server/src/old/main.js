
// import 'vite/modulepreload-polyfill';
// import params  from '../../params'
import * as server from './index'
server.create({
  host: '0.0.0.0'
, port: 3004
, get url(){ return 'http://' + this.host + ':' + this.port } 
}).then( () => console.log('not yet ready to play tetris with U ...') )
