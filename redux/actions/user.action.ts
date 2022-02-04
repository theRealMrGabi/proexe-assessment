import * as types from "../types";
import axios from "services/axios";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@redux/reducers";

export const GetUsers = () => {
  return (successCallback?: () => void, errorCallback?: () => void) => (dispatch: Dispatch) => (
    dispatch({type: types.GET_USERS.REQUEST}),
    axios.request(
      "GET",
      'data',
      (res: unknown)=> {
        if(Array.isArray(res)){
          const users = res.map((item)=> {
            const data = {
              id: item?.id,
              name: item?.name,
              username: item?.username,
              email: item?.email,
              city: item?.address?.city,
            }
            return data;
          })
          dispatch({type: types.GET_USERS.SUCCESS, payload: [...users] });
        }
        successCallback?.()
      },
      (err: unknown)=> {
        dispatch({type: types.GET_USERS.FAILURE, payload: err});
        errorCallback?.()
      },
    )
  )
}

export const CreateUser = () => {
  const  {users} = useSelector((state: AppState) => state.user);

  return (data: UserProps) =>(dispatch: Dispatch)=> {
    dispatch({type: types.CREATE_USER.REQUEST});

    /** We are getting highest ID so the new user to be created will have and id of getHighestId + 1 */
    const getHighestId = users.reduce(
      (acc: number, current: UserProps) => Math.max(acc, current.id),
      0
	  );

    data.id = getHighestId + 1;

    const newUser = users.push(data);
    dispatch({type: types.CREATE_USER.SUCCESS, payload: newUser});
  }
}

export const EditUser = () => {
  const  {users} = useSelector((state: AppState) => state.user);

  return (data: UserProps) =>(dispatch: Dispatch) => {
    dispatch({type: types.EDIT_USER.REQUEST});

    if(Array.isArray(users)){
      /**Find index of data to be updated */
      const selectedUserIndex = users.findIndex(item => item.id === data.id);

      /**Remove and replace old data with new data */
      const user = users.splice(selectedUserIndex, 1, data);
      dispatch({type: types.EDIT_USER.SUCCESS, payload: user});
    }
  }
}

export const SetUserToEdit = () => {
  return(data: UserProps)=> (dispatch:Dispatch)=> {
    dispatch({type: types.SET_USER_TO_EDIT.REQUEST, payload: data});
  }
}

export const ClearSelectedUser = () => {
  return () => (dispatch:Dispatch)=> {
    dispatch({type: types.CLEAR_SELECTED_USER.REQUEST, payload: {}});
  }
}

export const SetModalType = () => {
  return (modal: modalType) => (dispatch:Dispatch)=> {
    dispatch({type: types.SELECT_MODAL_TYPE.REQUEST, payload: modal});
  }
}

export const DeleteUser = () => {
	const dispatch = useDispatch();
  const { users } = useSelector((state: AppState) => state.user);

  return (id:number) => {
    dispatch({type: types.DELETE_USER.REQUEST});

    const filteredUser = users?.filter((user:UserProps)=> user.id !== id)
    return dispatch({type: types.DELETE_USER.SUCCESS, payload: filteredUser});
  }
}