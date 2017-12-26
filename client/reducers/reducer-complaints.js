export default function(state = null, action) {
    switch (action.type) {
        case "SET_COMPLAINTS":
            return action.payload;
        default:
            return state;
    }
}
