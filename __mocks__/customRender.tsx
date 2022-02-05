import { ReactElement } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../redux/reducers";
import thunkMiddleware from "redux-thunk";

const CustomRender = (ui: ReactElement, options?: any) => {
	const store = createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(thunkMiddleware))
	);

	const Wrapper = ({ children }: JSX.ElementChildrenAttribute) => (
		<Provider store={store}>{children}</Provider>
	);

	return render(ui, { wrapper: Wrapper, ...options });
};

export * from "@testing-library/react";
export { CustomRender as render };
