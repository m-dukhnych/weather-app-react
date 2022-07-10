import './button.scss';

const Button = ({children, classes, action = null}) => {
    const classList = `btn ${classes}`;

    return (
        <button onClick={action} className={classList}>
            {children}
        </button>
    )
}

export default Button;