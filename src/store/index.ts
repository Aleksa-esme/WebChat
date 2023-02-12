const defaultState: AppState = {
  appIsInited: false,
  isLoading: false,
  screen: null,
  loginFormError: null,
  user: null,
  chats: [],
  chatId: null,
  chatTitle: '',
  users: [],
  messages: [],
  fileId: null,
  stickers: [],
  chatState: {
    chatList: true,
    chatField: true,
  },
};

export default defaultState;
