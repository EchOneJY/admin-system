import { Effect, Reducer, Subscription } from 'umi';
import { fakeUserList } from './service';
import { UserType } from './data';

export interface StateType {
  list: UserType[];
  total: number;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    query: Effect;
  };
  reducers: {
    setUserList: Reducer<StateType>;
  };
  // subscriptions: { setup: Subscription };
}

const Model: ModelType = {
  namespace: 'user',
  state: {
    list: [],
    total: 0,
  },
  reducers: {
    setUserList(state, { payload }) {
      const { list, total } = payload;
      return {
        ...state,
        list,
        total,
      };
    },
  },
  effects: {
    *query({ payload }, { put, call }) {
      const { current, pageSize } = payload;
      const data = yield call(fakeUserList, { current, pageSize });
      const { data: list, total } = data;
      yield put({
        type: 'setUserList',
        payload: { list, total },
      });
    },
  },
};

export default Model;
