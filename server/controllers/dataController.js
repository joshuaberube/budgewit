const getData = async (req, res) => {

    const db = req.app.get('db')
    const { tableName } = req.params
    const { user_id } = req.session.user

    const data = await db[tableName].where("user_id=$1", [user_id])
    .catch(err => {console.log(err); res.status(500).send(err)})


	res.status(200).send(data);
};

const addData = async (req, res) => {

    const db = req.app.get('db')
    const { tableName } = req.params
    const { user_id } = req.session.user

    await db.data.add_data([user_id, tableName, req.body])
    .catch(err => {console.log(err); res.status(500).send(err)})


	res.sendStatus(200);
};

const editData = async (req, res) => {

    const db = req.app.get('db')
    const { tableName, dataId } = req.params
    const { user_id } = req.session.user

    await db.data.edit_data([user_id, tableName, req.body, dataId])
    .catch(err => {console.log(err); res.status(500).send(err)})

    res.sendStatus(200)
}

const deleteData = async (req, res) => {
    const db = req.app.get('db')
    const { tableName, dataId } = req.params
    const { user_id } = req.session.user

    await db.data.delete_data([user_id, tableName, dataId])
    .catch(err => {console.log(err); res.status(500).send(err)})

  

	res.sendStatus(200);
};

export { getData, addData, editData, deleteData };
