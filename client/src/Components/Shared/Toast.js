const Toast = (props) => {
    return (
        <div className={`toast ${props.toastType}`} onClick={() => props.resetErrFn()}>
            {props.message}
        </div>
    );
};

export default Toast;
