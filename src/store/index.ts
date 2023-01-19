const defaultState: AppState = {
  appIsInited: false,
  isLoading: false,
  screen: null,
  loginFormError: null,
  user: null,
  chats: [],
  chatField: {
    id: null,
    title: '',
    users: [],
    messages: [],
  },
};

export default defaultState;
