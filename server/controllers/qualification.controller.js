import mongoose from 'mongoose'
import Qualification from '../models/qualification.model.js'

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
    error: 'Unable to complete the qualification request.',
  })
}

function validId(req, res) {
  if (!mongoose.isObjectIdOrHexString(req.params.id)) {
    res.status(400).json({ error: 'Invalid qualification ID.' })
    return false
  }

  return true
}

function qualificationData(body = {}) {
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
    const qualification = await Qualification.create(
      qualificationData(req.body ?? {})
    )

    return res.status(201).json(qualification)
  } catch (error) {
    return handleError(res, error)
  }
}

async function list(req, res) {
  try {
    const qualifications = await Qualification.find()
    return res.status(200).json(qualifications)
  } catch (error) {
    return handleError(res, error)
  }
}

async function read(req, res) {
  if (!validId(req, res)) return

  try {
    const qualification = await Qualification.findById(req.params.id)

    if (!qualification) {
      return res.status(404).json({
        error: 'Qualification not found.',
      })
    }

    return res.status(200).json(qualification)
  } catch (error) {
    return handleError(res, error)
  }
}

async function update(req, res) {
  if (!validId(req, res)) return

  try {
    const qualification = await Qualification.findById(req.params.id)

    if (!qualification) {
      return res.status(404).json({
        error: 'Qualification not found.',
      })
    }

    Object.assign(qualification, qualificationData(req.body ?? {}))
    await qualification.save()

    return res.status(200).json(qualification)
  } catch (error) {
    return handleError(res, error)
  }
}

async function remove(req, res) {
  if (!validId(req, res)) return

  try {
    const qualification = await Qualification.findByIdAndDelete(
      req.params.id
    )

    if (!qualification) {
      return res.status(404).json({
        error: 'Qualification not found.',
      })
    }

    return res.status(200).json({
      message: 'Qualification deleted.',
    })
  } catch (error) {
    return handleError(res, error)
  }
}

async function removeAll(req, res) {
  try {
    const result = await Qualification.deleteMany({})

    return res.status(200).json({
      message: 'All qualifications deleted.',
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