import store from './redux/reduxStore';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import { Provider } from 'react-redux';
import SamuraiJSApp from './App';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); 

// let rerenderEntireTree = () =>{
// root.render(
//   <BrowserRouter>
//   <Provider store={store}>
//     <App/>
//   </Provider>
//   </BrowserRouter>
// );
// }
// rerenderEntireTree(store.getState());
// store.subscribe(() => {
//   let state = store.getState()
//   rerenderEntireTree(state)
// })
// root.render(
//   <BrowserRouter>
//       <Provider store={store}>
//           <App/>
//       </Provider>
//   </BrowserRouter>);

root.render(<SamuraiJSApp/>);
