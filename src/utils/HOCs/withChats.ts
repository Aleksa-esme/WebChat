function withChats(WrappedBlock) {
  return class extends WrappedBlock {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props) {
      super({ ...props, chats: window.store.getState().chats });
    }

    __onChangeUserCallback = (prevState: AppState, nextState: AppState) => {
      if (JSON.stringify(prevState.chats) !== JSON.stringify(nextState.chats)) {
        this.setProps({ ...this.props, chats: nextState.chats });
      }
    };

    componentDidMount(props) {
      super.componentDidMount(props);
      window.store.on('changed', this.__onChangeUserCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('changed', this.__onChangeUserCallback);
    }
  };
}

export default withChats;
