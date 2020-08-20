import { Effect, Reducer, Subscription } from 'umi';

import { AnalysisData, TodoListType } from './data';
import { queryDashboard } from './service';

export interface ModelType {
  namespace: string;
  state: AnalysisData;
  effects: {
    query: Effect;
    addTodoList: Effect;
    removeTodoList: Effect;
    handleComplete: Effect;
    handleCompleteAll: Effect;
  };
  reducers: {
    updateState: Reducer<AnalysisData>;
    updateTodoList: Reducer<AnalysisData>;
  };
  subscriptions: { setup: Subscription };
}

const DashboardModel: ModelType = {
  namespace: 'dashboard',
  state: {
    numbers: [],
    pages: [],
    todoList: [],
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    updateTodoList(
      state = { numbers: [], pages: [], todoList: [] },
      { payload },
    ) {
      return {
        ...state,
        todoList: payload,
      };
    },
  },
  effects: {
    *query({}, { call, put }) {
      const data = yield call(queryDashboard);
      yield put({
        type: 'updateState',
        payload: data,
      });
    },
    *addTodoList({ payload }, { put, select }) {
      const getstate = yield select();
      const todoList = getstate.dashboard.todoList;
      yield put({
        type: 'updateTodoList',
        payload: todoList.concat(payload),
      });
    },
    *removeTodoList({ payload }, { put, select }) {
      const getstate = yield select();
      const todoList = getstate.dashboard.todoList.filter(
        (item: TodoListType) => item.id !== payload,
      );
      yield put({
        type: 'updateTodoList',
        payload: todoList,
      });
    },
    *handleComplete({ payload }, { put, select }) {
      const getstate = yield select();
      const todoList = getstate.dashboard.todoList.map((item: TodoListType) => {
        const todo = { ...item };
        if (todo.id === payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      yield put({
        type: 'updateTodoList',
        payload: todoList,
      });
    },
    *handleCompleteAll({ payload }, { put, select }) {
      const getstate = yield select();
      const todoList = getstate.dashboard.todoList.map((item: TodoListType) => {
        const todo = { ...item };
        todo.completed = payload;
        return todo;
      });
      yield put({
        type: 'updateTodoList',
        payload: todoList,
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
