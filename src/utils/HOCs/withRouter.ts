import { ComponentClass } from 'utils/Component/Component';
import Router from '../Router/Router';

type WithRouterProps = { router: Router };

function withRouter<P extends WithRouterProps>(WrappedComponent: ComponentClass) {
  return class extends WrappedComponent {
    public static componentName = WrappedComponent.componentName || WrappedComponent.name;

    constructor(props: P) {
      super({ ...props, router: window.router });
    }
  } as ComponentClass;
}

export default withRouter;
