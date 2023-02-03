import type { Dispatch } from 'utils/Store/Store';

export type DispatchStateHandler<TAction> = (dispatch: Dispatch<AppState>, state: AppState, action: TAction) => Promise<void>;
