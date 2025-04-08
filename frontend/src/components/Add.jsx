const Add = (props) => {
    const {name, handleName, number, handleNumber} = props
    return (
        <>
            <h2>Add contact</h2>
            <div>
            name: <input value={name} onChange={handleName}/> <br />
            number: <input value={number} onChange={handleNumber}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </>
    )
}

export default Add