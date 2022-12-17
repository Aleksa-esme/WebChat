class EventBus {
  constructor() {
    this.listeners = {}; // Ключ - имя события, значение - массив с обработчиками этого события
  }

  // подписка функции-обработчика на событие
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  // отписка функции-обработчика от события
  off(event, callback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  // оповещения подписчиков
  emit(event, ...args) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }
}

export default EventBus;
