import { StoreEvents } from 'utils/Store/Store';

function withChats(WrappedBlock: any) {
  return class extends WrappedBlock {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: any) {
      super({ ...props, chats: window.store.getState().chats });
    }

    __onChangeUserCallback = (prevState: AppState, nextState: AppState) => {
      if (JSON.stringify(prevState.chats) !== JSON.stringify(nextState.chats)) {
        this.setProps({ ...this.props, chats: nextState.chats });
      }
    };

    componentDidMount(props: any) {
      super.componentDidMount(props);
      window.store.on(StoreEvents.UPDATED, this.__onChangeUserCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off(StoreEvents.UPDATED, this.__onChangeUserCallback);
    }
  };
}

export default withChats;
