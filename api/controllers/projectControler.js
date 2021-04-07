const Project = require('../../models/Project')
const Portfolio = require('../../models/Portfolio')
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
    headImg,
    link,
    description,
    local,
    date,
    partnership,
    images,
  } = req.body

  let projectObj = {
    name,
    type,
    areas,
    cover,
    headImg,
    link,
    description,
    local,
    date,
    partnership,
    images, 
  }
  try {
    let project = await Project.create(projectObj)
    if (project) {
      let portfolio = await Portfolio.find()
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
  try {
    let { projectId } = req.params;
    let projectDeleted = await Project.findByIdAndDelete(projectId)
    if(projectDeleted === null) {
      throw Error("Couldn't find and delete project")
    }
    let portfolio = await Portfolio.find();
    let portFolioId = portfolio[0]._id
    let portUpdated = await Portfolio.findByIdAndUpdate(
      portFolioId, {$pull: {portfolio: projectId}}, {new: true}
    )
    console.log("PORT UPDATED", portUpdated)
    res.status(201).json({
      success: true,
      message: `The project ${projectDeleted.name}  was succesfully deleted`
    })
  } catch(err) {
    const error = handleErrors(err)
    res.status(401).json(error)
  }
}

module.exports.updateProject = async (req, res, next) => {
  let {
    projectId, name, type, areas, cover, headImg, link,
    description, local, date, partnership, images,
  } = req.body

  let projectObj = {
    name, type, areas, cover, headImg, link,
    description, local, date, partnership, images,
  }

  try {
    const projectUpdated = await Project.findOneAndUpdate(
      {_id: projectId}, projectObj, {new:true}
    ).populate('images cover headImg')
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