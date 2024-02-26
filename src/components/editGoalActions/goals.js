import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const initialState = {
    selectedGoals: [
        {id: 11, icon: (<MaterialCommunityIcons name="weight-lifter" color='black' size={50}/>), title: 'Exercise sample'},
    ]
  };

export default function goalReducer (state = initialState, action){
    switch (action.type) {
        case 'SELECT_GOAL':
        return {
            ...state,
            selectedGoals: [...state.selectedGoals, action.payload],
        };
        case 'DESELECT_GOAL':
        return {
            ...state,
            selectedGoals: state.selectedGoals.filter(
            (goal) => goal.id !== action.payload
            ),
        };
        default:
        return state;
    }
};