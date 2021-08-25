const initialState = {
    users: [
        { username: 'ferryakmal97', password: '123', nama: 'Akmal' },
        { username: 'ferry97', password: '123', nama: 'Ghaffari' },
    ],
    isLogin: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER-LOGIN':
            return {
                ...state,
                isLogin: action.payload
            }
        default:
            return state
    }
}

export default reducer