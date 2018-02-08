export default function(state = null, action) {
    switch (action.type) {
        case "LOCALITIES":
            return action.payload;
        default:
            return state;
    }
}
