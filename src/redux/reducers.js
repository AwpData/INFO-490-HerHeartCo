import { TOGGLE_BOOLEAN } from './actions';

const initialState = {
    allGoals: [ 
        {id: 1, category: 'EXERCISE', title: 'Exercise for 3 times/ Week', isSelected: false}, 
        {id: 2, category: 'STEPS', title: 'Move 10,000 Steps/ Daily', isSelected: false},
        {id: 3, category: 'WATER', title: 'Drink 7 Glasses of Water / Daily', isSelected: false},
        {id: 4, category: 'FAT', title: 'Reduce Fat %', isSelected: false},
        {id: 5, category: 'HRV', title: 'Meditate for 15mins / Daily', isSelected: false},
    ]
  };

function userReducer(state = initialState.allGoals, action) {
    switch (action.type) {
        case TOGGLE_BOOLEAN:
            return state.map((goal) =>
                goal.id === action.payload.id
                ? { ...goal, isSelected: !goal.isSelected }
                : goal )
            ;
        default:
            return state;
    }
}

export default userReducer;