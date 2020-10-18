export const actionTypes = {
  SET_USER: "SET_USER",
  TOGGLE_SELECTED_MESSAGE: "TOGGLE_SELECTED_MESSAGE",
  CLEAR_SELECTED_MESSAGES: "CLEAR_SELECTED_MESSAGES"
}

export const initialState = {
  user: null,
  selectedMessages: []
}

export const reducer = (state, { payload, type }) => {
  switch (type) {
    case actionTypes.SET_USER: {
      return setUser(state, payload.user)
    }
    case actionTypes.TOGGLE_SELECTED_MESSAGE:
      return setSelectedMessages(state, payload.messageId)
    case actionTypes.CLEAR_SELECTED_MESSAGES:
      return emptyMessagesList(state)
    default:
      return state
  }
}

export const setCurrentUser = user => ({
  type: actionTypes.SET_USER,
  payload: { user }
})

export const clearSelectedMessages = () => ({
  type: actionTypes.CLEAR_SELECTED_MESSAGES
})

export const toggleSelectMessage = messageId => ({
  type: actionTypes.TOGGLE_SELECTED_MESSAGE,
  payload: { messageId }
})

const setUser = (state, user) => {
  return {
    ...state,
    user
  }
}

const setSelectedMessages = (state, messageId) => {
  const messageIndex = state.selectedMessages.findIndex(id => id === messageId)
  if (messageIndex === -1) {
    return {
      ...state,
      selectedMessages: [...state.selectedMessages, messageId]
    }
  } else {
    return {
      ...state,
      selectedMessages: state.selectedMessages.filter(
        (_, i) => i !== messageIndex
      )
    }
  }
}

const emptyMessagesList = state => ({
  ...state,
  selectedMessages: []
})
