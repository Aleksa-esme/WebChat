import { Store, StoreEvents } from '../Store/Store';

type WithStateProps = { store: Store<AppState> };

function withStore<P extends WithStateProps>(WrappedComponent: any) {
  return class extends WrappedComponent<P> {
    public static componentName = WrappedComponent.componentName || WrappedComponent.name;

    constructor(props: P) {
      super({ ...props, store: window.store });
    }

    __onChangeStoreCallback = () => {
      this.setProps({ ...this.props, store: window.store });
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on(StoreEvents.UPDATED, this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off(StoreEvents.UPDATED, this.__onChangeStoreCallback);
    }
  };
}

export default withStore;
