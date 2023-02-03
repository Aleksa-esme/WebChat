import { StoreEvents } from 'utils/Store/Store';
import { ComponentClass } from 'utils/Component/Component';

type WithUserProps = { user: User | null };

function withUser<P extends WithUserProps>(WrappedComponent: ComponentClass) {
  return class extends WrappedComponent {
    public static componentName = WrappedComponent.componentName || WrappedComponent.name;

    constructor(props: P) {
      super({ ...props, user: window.store.getState().user });
    }

    __onChangeUserCallback = (prevState: AppState, nextState: AppState) => {
      if (JSON.stringify(prevState.user) !== JSON.stringify(nextState.user)) {
        this.setProps({ ...this.props, user: nextState.user });
      }
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on(StoreEvents.UPDATED, this.__onChangeUserCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off(StoreEvents.UPDATED, this.__onChangeUserCallback);
    }
  } as ComponentClass;
}

export default withUser;
