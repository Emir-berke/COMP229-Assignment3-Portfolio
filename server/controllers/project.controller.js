import mongoose from 'mongoose'
import Project from '../models/project.model.js'

const fields = [
  'title',
  'firstname',
  'lastname',
  'email',
  'completion',
  'description',
]

function handleError(res, error) {
  if (
    error.name === 'ValidationError' ||
    error.name === 'CastError'
  ) {
    return res.status(400).json({ error: error.message })
  }

  return res.status(500).json({
    error: 'Unable to complete the project request.',
  })
}

function validId(req, res) {
  if (!mongoose.isObjectIdOrHexString(req.params.id)) {
    res.status(400).json({ error: 'Invalid project ID.' })
    return false
  }

  return true
}

function projectData(body = {}) {
  const data = {}

  for (const field of fields) {
    if (Object.hasOwn(body, field)) {
      data[field] = body[field]
    }
  }

  return data
}

async function create(req, res) {
  try {
    const project = await Project.create(
      projectData(req.body ?? {})
    )

    return res.status(201).json(project)
  } catch (error) {
    return handleError(res, error)
  }
}

async function list(req, res) {
  try {
    const projects = await Project.find()
    return res.status(200).json(projects)
  } catch (error) {
    return handleError(res, error)
  }
}

async function read(req, res) {
  if (!validId(req, res)) return

  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({
        error: 'Project not found.',
      })
    }

    return res.status(200).json(project)
  } catch (error) {
    return handleError(res, error)
  }
}

async function update(req, res) {
  if (!validId(req, res)) return

  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({
        error: 'Project not found.',
      })
    }

    Object.assign(project, projectData(req.body ?? {}))
    await project.save()

    return res.status(200).json(project)
  } catch (error) {
    return handleError(res, error)
  }
}

async function remove(req, res) {
  if (!validId(req, res)) return

  try {
    const project = await Project.findByIdAndDelete(
      req.params.id
    )

    if (!project) {
      return res.status(404).json({
        error: 'Project not found.',
      })
    }

    return res.status(200).json({
      message: 'Project deleted.',
    })
  } catch (error) {
    return handleError(res, error)
  }
}

async function removeAll(req, res) {
  try {
    const result = await Project.deleteMany({})

    return res.status(200).json({
      message: 'All projects deleted.',
      deletedCount: result.deletedCount,
    })
  } catch (error) {
    return handleError(res, error)
  }
}

export default {
  create,
  list,
  read,
  update,
  remove,
  removeAll,
}