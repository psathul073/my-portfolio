
const ToggleSwitch = ({ handleFun, isChecked }) => {


    return (
        <>
            <label className="switch">
                <input type="checkbox"  onChange={(e) => handleFun(e)} checked={isChecked} />
                    <span className="slider"></span>
            </label>
        </>
    )
}

export default ToggleSwitch