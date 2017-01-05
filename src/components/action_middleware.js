/*
 * This is action middleware
 */
export default socket => store => next => action => {
    console.info("In action middleware.");
    if (action.meta && action.meta.remote) {
        socket.emit('action', action);
    }
    
    return next(action);
};