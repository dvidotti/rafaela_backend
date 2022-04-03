const ProjectHeader = require('../../models/ProjectHeader')
const Module  = require('../../models/Module')
const ModulesCollection  = require('../../models/ModulesCollection')


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

// CREATE
module.exports.createProjectHeader = async (req, res, next) => {
  const {
    title, 
    areas,
    headImg,
    description,
    local,
    date,
    partnership,
    moduleColId
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
  console.log("OBJCPOST", obj)
  try{
    const projectHeader = await ProjectHeader.create(obj)
    let updatedProjectHeader = await ProjectHeader.findById(projectHeader._id).populate("headImg")
    console.log("PROJECTHEADER",projectHeader)
    const module = await Module.create({component: projectHeader._id, onComponent: "ProjectHeader" })
    console.log("MODULE",module)
    const moduleCol = await ModulesCollection.findByIdAndUpdate(
      moduleColId, {$push: {modules: module._id}}, {new: true}
    )
    res.status(201).json({
      success: true,
      data: updatedProjectHeader,
      module: module
    })
  } catch(error) {
    console.log("ERROR", error)
    handleErrors(error)
  }
}

//UPDATE

module.exports.updateProjectHeader = async (req, res, next) => {
  const {
    title, 
    areas,
    headImg,
    description,
    local,
    date,
    partnership,
    moduleId,
    projectHeaderId
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
  console.log("OBJCUPDATE", obj)
  console.log("projctHeaderID UPDATE", projectHeaderId)
  // console.log("ModuleId UPDATE", moduleId)

  try{
    const projectHeader = await ProjectHeader.findByIdAndUpdate(projectHeaderId, obj)
    const updatedProjectHeader = await ProjectHeader.findById(projectHeaderId).populate('headImg')
    const module = await Module.findById(moduleId)

    res.status(200).json({
      success: true,
      message: `ProjectHeader with ID: ${projectHeaderId} was updated with success`,
      data: updatedProjectHeader,
      module
    })
  } catch(errors) {
    console.log(errors)
    handleErrors(errors)
  }
}

//DELETE
module.exports.deleteProjectHeader = async (req, res, next) => {
  const { moduleId, projectHeaderId, modulesCollId } = req.body;
  console.log("moduleId", moduleId)
  console.log("projectHeaderId", projectHeaderId)
  console.log("modulesCollId", modulesCollId)
  try{
    const projectHeader = await ProjectHeader.findByIdAndRemove(projectHeaderId);
    const module = await Module.findByIdAndRemove(moduleId);
    console.log("MODULE-----------------", module)
    const moduleColl = await ModulesCollection.findByIdAndUpdate(
      modulesCollId, {$pull: {modules: moduleId}}
    )
    console.log("moduleColl-----------------", moduleColl)
    res.status(200).json({
      success: true,
      message: `ProjectHeader with ID: ${projectHeaderId} was deleted with success`,
      data: projectHeader
    })
  } catch(errors) {
    console.log(errors)
    handleErrors(errors)
  }
}
