export default function(state = null, action) {
    switch (action.type) {
        case "JUST_LOGGED_OUT":
            return action.payload;
        default:
            return state;
    }
}
