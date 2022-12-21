export type Listener<T extends unknown[] = any[]> = (...args: T) => void;

class EventBus<E extends string = string, M extends { [K in E]: unknown[] } = Record<E, any[]>> {
  private listeners: { [key in E]?: Listener<M[E]>[] } = {};

  // подписка функции-обработчика на событие
  on(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  // отписка функции-обработчика от события
  off(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  // оповещения подписчиков
  emit(event: E, ...args: M[E]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }
}

export default EventBus;
