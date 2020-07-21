import { Effect, Reducer, Subscription } from 'umi';
import { parse } from 'qs';

import { AnalysisData } from './data';
import { queryDashboard } from './service';

export interface ModelType {
  namespace: string;
  state: AnalysisData;
  effects: {
    query: Effect;
  };
  reducers: {
    updateState: Reducer<AnalysisData>;
  };
  subscriptions: { setup: Subscription };
}

const DashboardModel: ModelType = {
  namespace: 'dashboard',
  state: {
    numbers: [],
    pages: [],
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(queryDashboard, parse(payload));
      yield put({
        type: 'updateState',
        payload: data,
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/' || pathname === '/dashboard') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
};

export default DashboardModel;
