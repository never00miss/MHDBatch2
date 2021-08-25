const initialState = {
    students: [
        {id: '1', nama: 'Kuncoro', alamat: 'Jakarta'},
        {id: '2', nama: 'Sendy', alamat: 'Jakarta'},
        {id: '3', nama: 'Dika', alamat: 'Magelang'},
    ],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DELETE-DATA':
            return {
                ...state,
                students: state.students.filter( item => item.id != action.payload )
            }
        case 'ADD-DATA':
            return {
                ...state,
                students: [...state.students, action.payload]
            }
        case 'UPDATE-DATA':
            return {
                ...state,
                students: action.payload
            }
        default:
            return state
    }
}

export default reducer