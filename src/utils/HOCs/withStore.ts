import { ComponentClass } from 'utils/Component/Component';
import { Store, StoreEvents } from '../Store/Store';

type WithStateProps = { store: Store<AppState> };

function withStore<P extends WithStateProps>(WrappedComponent: ComponentClass) {
  return class extends WrappedComponent {
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
  } as ComponentClass;
}

export default withStore;
