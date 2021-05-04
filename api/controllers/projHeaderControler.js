const ProjectHeader = require('../../models/ProjectHeader')


const handleErrors = (err) => {
  let errors = {}
  if (err.message.includes('E11000 duplicate key error collection')) {
     errors["message"] = 'Duplicated header name, chose another header name for your project';
  } else {
    errors["message"] = err.message;
  }
  errors["success"] = false;
  return errors
}


module.exports.createProjectHeader = async (req, res, next) => {
  const {
    title, 
    areas,
    headImg,
    description,
    local,
    date,
    partnership,
    moduleId
  } = req.body;

  const obj = {
    title, 
    areas,
    headImg,
    description,
    local,
    date,
    partnership
  }

  try{
    const projectHeader = await ProjectHeader.create(obj)
    const module = await Module.create({module: projectHeader._id, onModel: "ProjectHeader" })
    const moduleCol = await ModulesCollection.findByIdAndUpdate(
      moduleId, {$push: {modules: module._id}}, {new: true}
    )
    res.status(201).json({
      success: true
    })
  } catch(error) {
    handleErrors(error)
  }
}

//UPDATE


//DELETE