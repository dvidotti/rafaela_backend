const Project = require('../../models/Project')
const Portfolio = require('../../models/Portfolio')
const ModulesCollection = require('../../models/ModulesCollection')
const FullImageModule = require('../../models/FullImageModule')
const DoublePicture = require('../../models/DoublePicture')
const Module = require('../../models/Module')
const dotenv = require('dotenv');
dotenv.config();

// ERRORS HANDLER //
const handleErrors = (err) => {
  let errors = {}
  if (err.message.includes('E11000 duplicate key error collection')) {
     errors["message"] = 'Duplicated project name, chose another name for your project';
  } else {
    errors["message"] = err.message;
  }
  errors["success"] = false;
  return errors
}

// CONTROLERS //

module.exports.createProject = async (req, res, next) => {
  let {
    name,
    type,
    areas,
    cover,
    link,
    published
  } = req.body

  let projectObj = {
    name,
    type,
    areas,
    cover,
    link,
    published
  }
  try {
    const module = await ModulesCollection.create({})
    projectObj.modules = module._id
    const project = await Project.create(projectObj)
    const portfolio = await Portfolio.find()
      if(portfolio.length === 0) {
        console.log("PROJECT", project)
        portfolio = await Portfolio.create({portfolio: [project._id]})
        console.log("PORTFOLIO CREATED", portfolio)
      } else {
          let portFolioId = portfolio[0]._id
          let portFolioUpadted = await Portfolio.findByIdAndUpdate(
            portFolioId, {$push : {"portfolio": project._id}},
            {new: true}
          )
          console.log(portFolioUpadted)
      }
    res.status(201).json(project)
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors})
  }
}

module.exports.getProject = async (req, res, next) => {
  let { projectId } = req.params;
  console.log("PROJECTID", projectId)
  try {
    const project = await Project.findById(projectId).populate('images cover headImg')
    if(project === null) {
      throw Error("Can't get project, not found")
    }
    res.status(201).json(project)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.deleteProject = async (req, res, next) => {
  const {modCollId} = req.body;

  try {
    let { projectId } = req.params;
    let projectDeleted = await Project.findByIdAndDelete(projectId)
    if(projectDeleted === null) {
      throw Error("Couldn't find and delete project")
    }
    let moduleCollection = await ModulesCollection.findByIdAndDelete(modCollId)
    let portfolio = await Portfolio.find();
    let portFolioId = portfolio[0]._id
    let portUpdated = await Portfolio.findByIdAndUpdate(
      portFolioId, {$pull: {portfolio: projectId}}, {new: true}
    )
    console.log("PORT UPDATED", portUpdated)
    res.status(201).json({
      success: true,
      message: `The project ${projectDeleted.name}  was succesfully deleted`,
      data: {
        moduleCollection,
        projectDeleted,
        portUpdated
      }
    })
  } catch(err) {
    const error = handleErrors(err)
    res.status(401).json(error)
  }
}

module.exports.updateCover = async (req, res, next) => {
  let {
    projectId,
    // name, 
    // type, 
    // areas, 
    cover, 
    // link,
  } = req.body

  let projectObj = {
    // name,
    // type, 
    // areas, 
    cover, 
    // link
  }

  try {
    const projectUpdated = await Project.findByIdAndUpdate(
      projectId, projectObj, {new:true, useFindAndModify: false}
    ).populate('cover')
    if (projectUpdated === null) {
      throw Error("Couldn't find and update project");
    }
    res.status(200).json({
      success: true,
      projectUpdated: projectUpdated
    })
  } catch(err){
    const error = handleErrors(err)
    res.status(401).json(error)
  }
}

module.exports.updateProject = async (req, res, next) => {
  let {
    projectId,
    name, 
    type, 
    areas,  
    link,
    published
  } = req.body

  let projectObj = {
    name,
    type, 
    areas, 
    link,
    published
  }

  try {
    const projectUpdated = await Project.findByIdAndUpdate(
      projectId, projectObj, {new:true, useFindAndModify: false}
    ).populate('cover')
    if (projectUpdated === null) {
      throw Error("Couldn't find and update project");
    }
    res.status(200).json({
      success: true,
      projectUpdated: projectUpdated
    })
  } catch(err){
    const error = handleErrors(err)
    res.status(401).json(error)
  }
}


// FullImageModule controles
module.exports.createFullImage = async (req, res, next) => {
  const {images, moduleId} = req.body;

  try{
    const fullImageModule = await FullImageModule.create({images})
    const module = await Module.create({module: fullImageModule._id, onModel: "FullImageModule" })
    const moduleCol = await ModulesCollection.findByIdAndUpdate(
      moduleId, {$push: {modules: module._id}}, {new: true}
    )
    res.status(201).json({ success: true, data: fullImageModule })
  } catch(error) {
    console.log(error)
  }
}

// It's not working, need to be fixed TODO
module.exports.updateFullImage = async (req, res, next) => {
  const {fullImageModuleId, images} = req.body;
  try{
    const fullImageModule = await FullImageModule.findByIdAndUpdate(
      fullImageModuleId, {images: images }, {useFindAndModify: false, new: true}
    )
    // const moduleCol = await ModulesCollection.findByIdAndUpdate(
    //   moduleId, {$push: {modules: module._id}}, {new: true}
    // )
    res.status(201).json({ success: true, data: fullImageModule})
  } catch(error) {
    console.log(error)
  }
}

module.exports.deleteFullImage = async (req, res, next) => {
  const {fullImageModuleId, modulesId} = req.body;
  try{
    const fullImageModule = await FullImageModule.findByIdAndRemove(fullImageModuleId, {useFindAndModify: false, new: true})
    const module = await Module.findByIdAndRemove(modulesId, {useFindAndModify: false, new: true})
    // const fullImageModule = await FullImageModule.findByIdAndUpdate(
    //   fullImageModuleId, {images: images }, {useFindAndModify: false, new: true}
    // )
    // const moduleCol = await ModulesCollection.findByIdAndUpdate(
    //   moduleId, {$push: {modules: module._id}}, {new: true}
    // )
    res.status(201).json({ success: true, data: {fullImageModule, module}})
  } catch(error) {
    console.log(error)
  }
}


//Double Picture controler
module.exports.createDoublePicture = async (req, res, next) => {
  const {imageOne, imageTwo, moduleId} = req.body;

  try{
    const doubleImage = await DoublePicture.create({imageOne, imageTwo})
    const module = await Module.create({module: doubleImage._id, onModel: "DoublePicture" })
    const moduleCol = await ModulesCollection.findByIdAndUpdate(
      moduleId, {$push: {modules: module._id}}, {new: true}
    )
    res.status(201).json({ success: true, data: doubleImage })
  } catch(error) {
    console.log(error)
  }
}

module.exports.updateDoublePicture = async (req, res, next) => {
  const {imageOne, imageTwo, moduleId} = req.body;
  try{
    const doublePictureModule = await DoublePicture.findByIdAndUpdate(
      moduleId, {imageOne, imageTwo }, {useFindAndModify: false, new: true}
    )
    res.status(201).json({ success: true, data: doublePictureModule})
  } catch(error) {
    console.log(error)
  }
  

}


module.exports.deleteDoublePicture = async (req, res, next) => {
  const {doublePictureModuleId, modulesId} = req.body;
  try{
    const doublePicture = await DoublePicture.findByIdAndRemove(doublePictureModuleId, {useFindAndModify: false, new: true})
    const module = await Module.findByIdAndRemove(modulesId, {useFindAndModify: false, new: true})
    res.status(201).json({ success: true, data: {doublePicture, module}})
  } catch(error) {
    console.log(error)
  }
}


// Get and populate all modules
module.exports.getModulesCollection = async (req, res, next) => {
  const {id} = req.params;
  try {
    const mCol = await ModulesCollection.findById(id)
    .populate({
      path:'modules',
      populate: {
        path: "module",
        populate: {
          path: 'headImg images imageOne imageTwo',
        }
      }
    });
    res.status(200).json({
      success: true,
      data: mCol
    })
  } catch(error) {
    console.log(error)
  }
}