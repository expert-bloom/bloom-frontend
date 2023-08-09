import React, { type FC, type Reducer } from 'react';

export interface State {
  pathname: string;
  showLoginModal: boolean;
  toggleAuthModal: (value?: boolean) => void;
}

const initialState = {
  pathname: 'sld',
  showLoginModal: false,
};

interface Action {
  type: 'SHOW_LOGIN_MODAL';
  payload?: any;
}

export const AppContext = React.createContext<State | any>(initialState);

AppContext.displayName = 'UIContext';

const uiReducer: Reducer<typeof initialState, Action> = (state, action) => {
  switch (action.type) {
    /* case 'DARKEN_NAV_BAR': {
              return {
                ...state,
                darkNavBar: true,
              };
            } */
    case 'SHOW_LOGIN_MODAL':
      return {
        ...state,
        showLoginModal: action.payload,
      };
    default:
      return state;
  }
};

const AppProvider: FC<{ children: React.ReactElement }> = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const toggleAuthModal = (value?: boolean) => {
    dispatch({
      type: 'SHOW_LOGIN_MODAL',
      payload: value !== undefined ? value : !state.showLoginModal,
    });
  };

  /* const value = useMemo(
        () => ({
          ...state,
          me: data?.me,
          toggleAuthModal,
        }),
        [state, session],
      ); */

  const value = {
    ...state,
    toggleAuthModal,
  };

  return <AppContext.Provider value={value} {...props} />;
};

export default AppProvider;

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context as State;
};
