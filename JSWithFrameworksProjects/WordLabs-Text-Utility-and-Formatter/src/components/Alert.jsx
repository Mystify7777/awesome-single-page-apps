// src/components/Alert.js
function Alert({ alert }) {
    const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

    return (
        alert && (
            <div className={`absolute top-20 right-5 w-[40vh] bg-${alert.type}-100 border border-${alert.type}-400 text-${alert.type}-700 px-4 py-3 rounded  my-4 shadow-md bg-[#00e061af] `} role="alert">
                <strong>{capitalize(alert.type)}: </strong>
                <span>{alert.msg}</span>
            </div>
        )
    );
}

export default Alert;