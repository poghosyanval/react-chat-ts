import { InferActionsTypes } from "./reduxStore"

type DialogType = {
  id: number
  name: string
}
type MessageType = {
  id: number
  message: string
}
let initialState = {
    dialogs: [
      { id: 1, name: "John" },
      { id: 2, name: "Dana" },
      { id: 3, name: "Morris" },
      { id: 4, name: "Klara" },
      { id: 5, name: "Margo" },
      { id: 6, name: "Raul" },
    ] as Array<DialogType>,
    messages: [
      { id: 1, message: "Hi" },
      { id: 2, message: "How are you?" },
      { id: 3, message: "Alooooo" },
      { id: 4, message: "Alooooo" },
      { id: 5, message: "Alooooo" },
      { id: 6, message: "Alooooo" },
    ] as Array<MessageType>,
  };
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND_MESSAGE':
            return{
                ...state,
                messages:[...state.messages,{ id: 6, message: action.newMessageBody }],
            }
        default:
            return state
    }
}

export const actions = {
  sendMessage: (newMessageBody: string) => ({
    type: 'SN/DIALOGS/SEND_MESSAGE',newMessageBody
} as const)
}

export default dialogsReducer