import { StoreEvents } from 'utils/Store/Store';
import { ComponentClass } from 'utils/Component/Component';

function withChats(WrappedComponent: ComponentClass) {
  return class extends WrappedComponent {
    public static componentName = WrappedComponent.componentName || WrappedComponent.name;

    constructor(props: any) {
      super({ ...props, chats: window.store.getState().chats });
    }

    __onChangeUserCallback = (prevState: AppState, nextState: AppState) => {
      if (JSON.stringify(prevState.chats) !== JSON.stringify(nextState.chats)) {
        this.setProps({ ...this.props, chats: nextState.chats });
      }
    };

    componentDidMount(props: unknown) {
      super.componentDidMount(props);
      window.store.on(StoreEvents.UPDATED, this.__onChangeUserCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off(StoreEvents.UPDATED, this.__onChangeUserCallback);
    }
  } as ComponentClass;
}

export default withChats;
