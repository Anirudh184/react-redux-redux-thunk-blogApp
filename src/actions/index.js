import _ from 'lodash';

import jsonPlaceHolder from '../apis/jsonPlaceHolder';

// export const fetchPost = () => {
//     return async (dispatch) => {
//         const response = await jsonPlaceHolder.get('/posts');
//         dispatch({
//             type: 'FETCH_POST',
//             payload: response
//         });
//     }
// };

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPost());
    const user = _.uniq(_.map(getState().posts, 'userId'));

    user.forEach(userId => {
        dispatch(fetchUser(userId));
    });

}



export const fetchPost = () => async dispatch => {
    const response = await jsonPlaceHolder.get('/posts');
    dispatch({
        type: 'FETCH_POST',
        payload: response.data
    });
};

export const fetchUser = userId => async dispatch => {
    const response = await jsonPlaceHolder.get(`/users/${userId}`);
    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    });
};  

// overfecthing solution number 2, using _.memoize

// export const fetchUser = userId => dispatch => {
//     _fetchUser(userId, dispatch)
// }; 

// const _fetchUser = _.memoize(async (userId, dispatch) => {
//     const response = await jsonPlaceHolder.get(`/users/${userId}`);
//     dispatch({
//         type: 'FETCH_USER',
//         payload: response.data
//     });
// });