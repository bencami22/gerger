export default function(state = null, action) {
    switch (action.type) {
        case "ADD_COMPLAINT":
            return action.payload;
            break;
        default:
            return state;
    }
    return state;

}
