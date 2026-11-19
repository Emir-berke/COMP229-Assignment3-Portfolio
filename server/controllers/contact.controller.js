
import mongoose from "mongoose";
import Contact from "../models/contact.model.js";

function handleError(res, error) {
  if (
    error.name === "ValidationError" ||
    error.name === "CastError"
  ) {
    return res.status(400).json({
      error: error.message,
    });
  }

  return res.status(500).json({
    error: "Unable to complete the contact request.",
  });
}

function validId(req, res) {
  if (!mongoose.isObjectIdOrHexString(req.params.id)) {
    res.status(400).json({
      error: "Invalid contact ID.",
    });
    return false;
  }

  return true;
}

// CREATE - Save a new contact message
async function create(req, res) {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      message,
    } = req.body ?? {};

    const contact = await Contact.create({
      firstname,
      lastname,
      email,
      phone,
      message,
    });

    return res.status(201).json(contact);
  } catch (error) {
    return handleError(res, error);
  }
}

// READ - Get all contact messages
async function list(req, res) {
  try {
    const contacts = await Contact.find();
    return res.status(200).json(contacts);
  } catch (error) {
    return handleError(res, error);
  }
}

// READ - Get one contact message
async function read(req, res) {
  if (!validId(req, res)) return;

  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        error: "Contact not found.",
      });
    }

    return res.status(200).json(contact);
  } catch (error) {
    return handleError(res, error);
  }
}

// UPDATE - Edit a contact message
async function update(req, res) {
  if (!validId(req, res)) return;

  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        error: "Contact not found.",
      });
    }

    const body = req.body ?? {};

    // Only allow these fields to be updated
    const allowedFields = [
      "firstname",
      "lastname",
      "email",
      "phone",
      "message",
    ];

    for (const field of allowedFields) {
      if (Object.hasOwn(body, field)) {
        contact[field] = body[field];
      }
    }

    await contact.save();

    return res.status(200).json(contact);
  } catch (error) {
    return handleError(res, error);
  }
}

// DELETE - Remove one contact message
async function remove(req, res) {
  if (!validId(req, res)) return;

  try {
    const contact = await Contact.findByIdAndDelete(
      req.params.id
    );

    if (!contact) {
      return res.status(404).json({
        error: "Contact not found.",
      });
    }

    return res.status(200).json({
      message: "Contact deleted.",
    });
  } catch (error) {
    return handleError(res, error);
  }
}

// DELETE ALL - Remove all contact messages
async function removeAll(req, res) {
  try {
    const result = await Contact.deleteMany({});

    return res.status(200).json({
      message: "All contacts deleted.",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    return handleError(res, error);
  }
}

export default {
  create,
  list,
  read,
  update,
  remove,
  removeAll,
};
