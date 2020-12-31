//# getData is currently not working
const getData = async (req, res) => {
    const db = req.app.get('db')
    const { tableName } = req.params
    // const { userId } = req.session.user
    const userId = 5

    const data = await db.data.get_data([userId, tableName])
    .catch(err => {console.log(err); res.status(500).send(err)})
    console.log(data)

    res.status(200).send(data)
}

const addData = async (req, res) => {
    const db = req.app.get('db')
    const { tableName } = req.params
    // const { userId } = req.session.user
    const userId = 5

    await db.data.add_data([userId, tableName, req.body])
    .catch(err => {console.log(err); res.status(500).send(err)})

    res.sendStatus(200)
}

const editData = async (req, res) => {
    const db = req.app.get('db')
    const { tableName, dataId } = req.params
    // const { userId } = req.session.user
    const userId = 5

    await db.data.edit_data([userId, tableName, req.body, dataId])
    .catch(err => {console.log(err); res.status(500).send(err)})

    res.sendStatus(200)
}

const deleteData = async (req, res) => {
    const db = req.app.get('db')
    const { tableName, dataId } = req.params
    // const { userId } = req.session.user
    const userId = 5

    await db.data.delete_data([userId, tableName, dataId])
    .catch(err => {console.log(err); res.status(500).send(err)})

    res.sendStatus(200)
}

export { getData, addData, editData, deleteData }