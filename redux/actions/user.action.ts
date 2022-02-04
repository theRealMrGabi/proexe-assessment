import * as types from "../types";
import axios from "services/axios";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@redux/reducers";

export const GetUsers = ()=> {
  return (successCallback?: ()=> void, errorCallback?: ()=> void)=> (dispatch: Dispatch)=> (
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

            return data
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
	const dispatch = useDispatch();
  const  {users} = useSelector((state: AppState) => state.user);

  console.log('action called ->');
  

  return (data: object) => {
    dispatch({type: types.CREATE_USER.REQUEST});

    const highestId = users.reduce(
      (acc: number, current: UserProps) => Math.max(acc, current.id),
      0
	  );

    //@ts-ignore
    data.id = highestId + 1;
 
     dispatch({type: types.CREATE_USER.SUCCESS, payload: data});
    // successCallback?.()
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