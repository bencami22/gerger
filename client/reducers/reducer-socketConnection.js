export default function(state = null, action) {
    switch (action.type) {
        case "SOCKET_CONNECTION":
            return action.payload;
        default:
            return state;
    }
}
