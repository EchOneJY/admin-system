import { Effect, Reducer, Subscription } from 'umi';
import { fakeUserList } from './service';
import { UserType, PaginationType } from './data';

export interface StateType {
  list: UserType[];
  pagination: PaginationType;
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
  subscriptions: { setup: Subscription };
}

const Model: ModelType = {
  namespace: 'user',
  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      current: 1,
      total: 0,
      pageSize: 10,
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/users/list') {
          const payload = { current: 1, pageSize: 10 };
          dispatch({
            type: 'query',
            payload,
          });
        }
      });
    },
  },
  reducers: {
    setUserList(state, { payload }) {
      const { list, pagination } = payload;
      return {
        ...state,
        list,
        pagination: {
          ...state?.pagination,
          ...pagination,
        },
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
        payload: { list, pagination: { ...payload, total } },
      });
    },
  },
};

export default Model;
