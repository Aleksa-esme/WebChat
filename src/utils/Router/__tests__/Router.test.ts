import Router from '../Router';

describe('Router', () => {
  it('should change history state', () => {
    const router = new Router();
    const history = global.window.history;

    router.go('/profile');
    expect(history.length).toEqual(2);

    router.go('/login');
    expect(history.length).toEqual(3);
  });
});
