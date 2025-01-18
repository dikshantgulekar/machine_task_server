import db from "../database/db.js";


const addCategory = async function(req, res) {
    const {categoryName, id} = req.body
    try{
        const query = "insert into categories (categoryName) values (?)";
        const [result ] = await db.execute(query, [categoryName]);
        res.status(201).send({ msg: "Category Added"});
    }
    catch(error){
        res.status(500).send({ error: error.message });
    }
}

const showCategory = async function (req, res) {
    try{
        const query = "select * from categories"
        const [rows] = await db.execute(query)
        res.send({ msg : 'Showing categories', data: rows})
    }
    catch(error){
        res.status(500).send({ error: error.message });
    }
}

const showCategoryById = async function (req, res) {
    const {catId} = req.params;
    try{
        const query = 'select * from categories where id = ?'
        const [rows] = await db.execute(query , [catId])
        res.send({ msg : 'Showing categories by id', data: rows})
    }
    catch(error){
        res.status(500).send({ error: error.message });
    }
}

const updateCategoryById = async function (req, res) {
    const {catId} = req.params;
    const {categoryName} = req.body;
    try{
        const query = 'update categories set categoryName=? where id = ?'
        const [result] = await db.execute(query, [categoryName, catId])
        if (result.affectedRows === 0) {
            return res.status(404).send({ msg: "Category not found" });
          }
        res.send({msg:"Category Updated Successfully"})
    }
    catch(error){
        res.status(500).send({ error: error.message });
    }
    
}

const deleteCategoryById = async function (req, res) {
    const { catId } = req.params;
    try{
        const query = "delete from categories where id = ?"
        const [result] = await db.execute(query, [catId])
        res.send({msg:"Category Deleted"})
    }
    catch(error){

    }
}


export{
    addCategory,
    showCategory,
    showCategoryById,
    updateCategoryById,
    deleteCategoryById
}