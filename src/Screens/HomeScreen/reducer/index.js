const initialState = {
    user: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER-DATA':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default reducer