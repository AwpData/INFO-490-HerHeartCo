import { TOGGLE_BOOLEAN, UPDATE_GOALS } from './actions';

const initialState = {
    allGoals: [ 
        {id: 1, category: 'EXERCISE', title: 'Exercise for 3 times/ Week', isSelected: false, recommendation: 'Any movement of 20 minutes or more counts whether that is a brisk walk, run, or a workout class is totally up to you. You choose which movement is best for your body. This goal will increase your heart rate, improve your aerobic fitness, muscle recovery and endurance.'}, 
        {id: 2, category: 'STEPS', title: 'Move 5,000 Steps/ Daily', isSelected: false, recommendation: 'The best way to get your steps up is to do a short, 3-5 minute walk (250 steps) every hour. This helps to move stagnation and enhance circulation evenly throughout the day.'},
        {id: 3, category: 'WATER', title: 'Drink 7 Glasses of Water / Daily', isSelected: false, recommendation: 'Tracking your water intake is the first step in making sure you are staying hydrated on a regular basis. Hydration is essential for detoxification, lubrication of your joints and good digestion. Drinking 7 glasses of water or half of your body weight in ounces will boost energy and focus too!'},
        {id: 4, category: 'SLEEP', title: 'Sleep 7 hours/ Daily', isSelected: false, recommendation: 'Sleep 7 hours a day'},
        {id: 5, category: 'HRV', title: 'Meditate for 15mins / Daily', isSelected: false, recommendation: 'HRV measures your resiliency to everyday stressors that are both internal and external. To increase your HRV, training your breathing patterns to have a slightly longer time exhaling than inhaling is essential and is called resonance breathing. To train, set aside 10-20 minutes, twice daily in a comfortable place. Inhale for a count of 4 and exhale for a count of 6.'},
    ], 
  };

function userReducer(state = initialState.allGoals, action) {
    switch (action.type) {
        case TOGGLE_BOOLEAN:
            return state.map((goal) =>
                goal.id === action.payload.id
                ? { ...goal, isSelected: !goal.isSelected }
                : goal )
            ;
        case UPDATE_GOALS: 
            return action.payload.map((goal) => goal );
        ;
        default:
            return state;
    }
}

export default userReducer;