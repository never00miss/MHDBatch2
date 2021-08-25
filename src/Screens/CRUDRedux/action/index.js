const deleteData = (id) => {
    return dispatch => {
        dispatch({
            type: 'DELETE-DATA',
            payload: id
        })
    }
}

const addData = (data) => {
    return dispatch => {
        dispatch({
            type: 'ADD-DATA',
            payload: data
        })
    }
}

const updateData = (data) => {
    return dispatch => {
        dispatch({
            type: 'UPDATE-DATA',
            payload: data
        })
    }
}

export { deleteData, addData, updateData }