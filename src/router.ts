import Router from 'utils/Router/Router';
import renderDOM from 'utils/Component/renderDOM';
import { Store } from 'utils/Store';
import { getScreenComponent, Screens } from 'utils/Router/screenList';

const routes = [
  {
    path: '/',
    block: Screens.ChatsPage,
    shouldAuthorized: true,
  },
  {
    path: '/login',
    block: Screens.LoginPage,
    shouldAuthorized: false,
  },
  {
    path: '/register',
    block: Screens.RegisterPage,
    shouldAuthorized: false,
  },
  {
    path: '/profile',
    block: Screens.ProfilePage,
    shouldAuthorized: true,
  },
  {
    path: '/change',
    block: Screens.ProfileChangePage,
    shouldAuthorized: true,
  },
  {
    path: '/password',
    block: Screens.ProfilePasswordPage,
    shouldAuthorized: true,
  },
  {
    path: '/error500',
    block: Screens.Error500Page,
    shouldAuthorized: false,
  },
  {
    path: '*',
    block: Screens.Error404Page,
    shouldAuthorized: false,
  },
];

function initRouter(router: Router, store: Store<AppState>) {
  routes.forEach(route => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);
      const currentScreen = Boolean(store.getState().screen);

      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({ screen: route.block });
        return;
      }

      if (!currentScreen) {
        store.dispatch({ screen: Screens.LoginPage });
      }
    });
  });

  /**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */
  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }

    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page({}));
      document.title = `App / ${Page.componentName}`;
    }
  });
}

export default initRouter;
