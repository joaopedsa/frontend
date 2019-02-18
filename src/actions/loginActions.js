// action creator
export const changeUsername = (username) => {
    return {
        type: 'CHANGE_USERNAME',
        payload: username
    };
};

export const changePassword = (password) => {
    return {
        type: 'CHANGE_PASSWORD',
        payload: password
    };
};