import EventBus from '../Component/EventBus';

export type Dispatch<State> = (
  nextStateOrAction: Partial<State> | Action<State>,
  payload?: unknown,
) => void;

export type Action<State> = (
  dispatch: Dispatch<State>,
  state: State,
  payload: unknown,
) => void;

export enum StoreEvents {
  UPDATED = 'updated',
}

export class Store<State extends Record<string, unknown>> extends EventBus {
  private state: State = {} as State;

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
    this.set(defaultState);
  }

  public getState() {
    return this.state;
  }

  public set(nextState: Partial<State>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.UPDATED, prevState, nextState);
  }

  dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: unknown) {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.set({ ...this.state, ...nextStateOrAction });
    }
  }
}
