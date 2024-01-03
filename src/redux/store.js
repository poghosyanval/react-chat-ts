import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi,how are you?", likesCount: 12 },
        { id: 2, message: "It's my first bithday", likesCount: 11 },
        { id: 3, message: "Alooooo", likesCount: 11 },
        { id: 4, message: "Alooooo", likesCount: 17 },
        { id: 5, message: "Alooooo", likesCount: 15 },
        { id: 6, message: "Alooooo", likesCount: 33 },
      ],
      newPostText: "it-kamasutra",
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: "John" },
        { id: 2, name: "Dana" },
        { id: 3, name: "Morris" },
        { id: 4, name: "Klara" },
        { id: 5, name: "Margo" },
        { id: 6, name: "Raul" },
      ],
      messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "Alooooo" },
        { id: 4, message: "Alooooo" },
        { id: 5, message: "Alooooo" },
        { id: 6, message: "Alooooo" },
      ],
      newMessageBody: "",
    },
    sideBar: {
      friends: [
        { id: 1, name: "John" },
        { id: 2, name: "Daniel" },
        { id: 3, name: "Morris" },
      ],
    },
  },
  _callSubscriber() {
    console.log("State changed");
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  // addPost() {
  //   let newPost = {
  //     id: 5,
  //     message: this._state.profilePage.newPostText,
  //     likesCount: 0,
  //   };
  //   this._state.profilePage.posts.push(newPost);
  //   this._state.profilePage.newPostText = "";
  //   this._callSubscriber(this._state);
  // },
  // updateNewPostText(newText) {
  //   this._state.profilePage.newPostText = newText;
  //   this._callSubscriber(this._state);
  // },
  // addMessage() {
  //   let newMessage = {
  //     id: Math.round(Math.random() * 1000),
  //     message: this._state.dialogsPage.newMessageText,
  //   };
  //   this._state.dialogsPage.messages.push(newMessage);
  //   this._state.dialogsPage.newMessageText = "";
  //   this._callSubscriber(this._state);
  // },
  // updateNewMessageText(newText) {
  //   this._state.dialogsPage.newMessageText = newText;
  //   this._callSubscriber(this._state);
  // },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sideBar = sidebarReducer(this._state.sideBar, action);
    this._callSubscriber(this._state);
  }
}
export default store;
window.store = store;
//     if (action.type === 'ADD-POST') {
//         let newPost = {
//             id: 7,
//             message: this._state.profilePage.newPostText,
//             likesCount: 0,
//           };
//           this._state.profilePage.posts.push(newPost);
//           this._state.profilePage.newPostText = "";
//           this._callSubscriber(this._state);
//     } else if(action.type === 'UPDATE-NEW-POST-TEXT'){
//         this._state.profilePage.newPostText = action.newText;
//         this._callSubscriber(this._state);
//     } else if (action.type === 'SEND-MESSAGE') {
//         let body = this._state.dialogsPage.newMessageBody;
//         this._state.dialogsPage.newMessageBody = '';
//         this._state.dialogsPage.messages.push({ id: 6, message: body });
//         this._callSubscriber(this._state);
//     } else if(action.type === 'UPDATE-NEW-MESSAGE-BODY'){
//         this._state.dialogsPage.newMessageBody = action.body;
//         this._callSubscriber(this._state);
//     }
//   },
// };
// export const addPostActionCreator = () => ({
//     type: "ADD-POST"
//   })
// export const updateNewPostTextActionCreator = (text) => ({
//     type: "UPDATE-NEW-POST-TEXT", newText: text
//   })
// export const sendMessageCreator = () => ({
//     type: "SEND-MESSAGE"
//   })
// export const updateNewMessageBodyCreator = (body) =>({
//     type: "UPDATE-NEW-MESSAGE-BODY", body: body
//   })

