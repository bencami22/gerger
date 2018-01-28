export default function(state = null, action) {
    switch (action.type) {
        case "SORT_COMPLAINTS":
            return action.payload;
        default:
            return state;
    }
}
