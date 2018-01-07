export const setSocketConnection = (socketConnection) => {
    return {
        type: "SOCKET_CONNECTION",
        payload: socketConnection
    }
};
