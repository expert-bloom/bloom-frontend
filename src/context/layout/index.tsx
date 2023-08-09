import React, {
  type DOMAttributes,
  type FC,
  type Reducer,
  useMemo,
} from 'react';

type PropsType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export interface State {
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;

  start: {
    Component?: React.FC | undefined;
    props?: PropsType;
  };
  middle: {
    Component?: React.FC | undefined;
    props?: DOMAttributes<HTMLElement>;
  };

  end: {
    Component?: React.FC | undefined;
    props?: PropsType;
  };

  Top: React.FC | undefined;

  reset: () => void;
  setSome: (payload: Partial<typeof initialState>) => void;
  setTop: (component: React.FC<any>) => void;
}

const initialState: State = {
  end: {},
  middle: {},
  start: {},
  props: {},
  Top: undefined,
  reset: () => null,
  setSome: () => null,
  setTop: () => null,
};

interface Action {
  type: 'SET_ALL' | 'RESET' | 'SET_TOP';
  payload?: any;
}

export const LayoutContext = React.createContext<State | any>(initialState);

LayoutContext.displayName = 'LayoutContext';

const uiReducer: Reducer<typeof initialState, Action> = (state, action) => {
  switch (action.type) {
    case 'RESET': {
      return {
        ...initialState,
      };
    }
    case 'SET_ALL':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_TOP':
      return {
        ...state,
        Top: action.payload,
      };
    default:
      return state;
  }
};

const LayoutProvider: FC<{
  children: React.ReactElement;
  pageProps: Record<string, any>;
}> = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const reset = () => {
    dispatch({
      type: 'RESET',
    });
  };

  const setTop = (component: React.FC<any>) => {
    dispatch({
      type: 'RESET',
      payload: component,
    });
  };

  const setSome = (payload: Partial<typeof initialState>) => {
    dispatch({
      type: 'SET_ALL',
      payload,
    });
  };

  const value = useMemo(
    () => ({
      ...state,
      reset,
      setSome,
    }),
    [state],
  );

  return (
    <LayoutContext.Provider value={value}>
      {props.children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;

export const useLayoutContext = () => {
  const context = React.useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context as State;
};
