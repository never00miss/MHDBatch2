const initialState = {
    stdFirestore: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET-USERS':
            return {
                ...state,
                stdFirestore: action.payload
            }
        default:
            return state
    }
}

export default reducer