import './button.css'

function Button({ text, fn }) {
    return (
        <>
            <button className="counter-button" onClick={fn}>{text}</button>
        </>
    )
}

export default Button