import * as types from "../types";

const initialState: UserReducerType = {
	loading: false,
	users: [],
	error: null,
};

const UserReducer = (state = initialState, { type, payload }: any) => {
	switch (type) {
		case types.GET_USERS.REQUEST:
		case types.EDIT_USER.REQUEST:
		case types.DELETE_USER.REQUEST:
		case types.CREATE_USER.REQUEST:
			return { ...state, loading: true };

		case types.GET_USERS.SUCCESS:
		case types.EDIT_USER.SUCCESS:
		case types.DELETE_USER.SUCCESS:
			return { ...state, loading: false, users: payload };

		case types.CREATE_USER.SUCCESS:
			const insertUser = state.users.push(payload);
			return { ...state, loading: false, users: insertUser };

		case types.GET_USERS.FAILURE:
		case types.EDIT_USER.FAILURE:
		case types.DELETE_USER.FAILURE:
			return { ...state, loading: false, error: payload };

		default:
			return state;
	}
};

export default UserReducer;
