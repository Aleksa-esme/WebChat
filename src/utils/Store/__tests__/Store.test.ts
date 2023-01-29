import { Store, StoreEvents } from '../Store';

describe('utils/Store', () => {
  // ЮНИТ-ТЕСТ на модуль
  it('should set state', () => {
    const store = new Store({});

    store.set({ userId: 123 });

    expect(store.getState()).toEqual({ userId: 123 });
  });

  // ЮНИТ-ТЕСТ на тестирования события
  it('should emit event after store was updated', () => {
    const store = new Store({ userId: -1 });
    const mock = jest.fn();

    store.on(StoreEvents.UPDATED, mock);

    store.set({ userId: 123 });

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({ userId: -1 }, { userId: 123 });
  });

  // ЮНИТ-ТЕСТ на тестирования вызова функции
  it('should call callback with store and dispatch when it is function', () => {
    const store = new Store({ userId: -1 });
    const mock = jest.fn();

    store.dispatch(mock, 'PAYLOAD_PARAMS');

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith(expect.anything(), store.getState(), 'PAYLOAD_PARAMS');
  });
});
