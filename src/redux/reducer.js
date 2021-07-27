const initialState = {
    title: 'Redux',
    description: 'Learning State Management with Redux',
    students: [
        {id: '1', nama: 'Kuncoro', alamat: 'Jakarta'},
        {id: '2', nama: 'Sendy', alamat: 'Jakarta'},
        {id: '3', nama: 'Dika', alamat: 'Magelang'},
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DELETE-DATA':
            return {
                ...state,
                students: state.students.filter( item => item.id != action.payload )
            }
        case 'CHANGE-TITLE':
            return {
                ...state,
                title: action.title
            }
        default:
            return state
    }
}

export default reducer