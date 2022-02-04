import { generateActions } from "@utils";

export const GET_USERS = generateActions("GET_USERS");
export const CREATE_USER = generateActions("CREATE_USER");
export const EDIT_USER = generateActions("EDIT_USER");
export const DELETE_USER = generateActions("DELETE_USER");
export const SET_USER_TO_EDIT = generateActions("SET_USER_TO_EDIT");
export const CLEAR_SELECTED_USER = generateActions("CLEAR_SELECTED_USER");
export const SELECT_MODAL_TYPE = generateActions("SELECT_MODAL_TYPE");
