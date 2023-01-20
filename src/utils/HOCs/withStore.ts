import { Store } from '../Store';

type WithStateProps = { store: Store<AppState> };

function withStore<P extends WithStateProps>(WrappedBlock: any) {
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, store: window.store });
    }

    __onChangeStoreCallback = () => {
      this.setProps({ ...this.props, store: window.store });
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on('changed', this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('changed', this.__onChangeStoreCallback);
    }
  };
}

export default withStore;
