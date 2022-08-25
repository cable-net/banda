const express = require('express')
const router = express.Router()
const httpOut = require('../http-out/auth')
const Colaborador = require('../models/colaborador')
const adapter = require('../adapters/colaborador')

router.post('/', async (req, res) => {
  const [error, model] = adapter.bodyToModel(req.body)
  if (error) {
    return res.status(400).json(
      { error: 'Datos invalidos' }
    )
  }

  const isEmailExist = await Colaborador.findOne({ email: req.body.email })
  if (isEmailExist) {
    return res.status(400).json(
      { error: 'Este email ya existe' }
    )
  }

  const isEmailExistOut = await httpOut.emailRegistered(req.body.email, req.header('auth-token'))
  if (isEmailExistOut) {
    return res.status(400).json(
      { error: 'Este email ya tiene un usuario' }
    )
  }

  const colaborador = new Colaborador(model)    
  try {
    const savedColaborador = await colaborador.save()
    res.status(201).json(savedColaborador)
  } catch (error) {
    res.status(400).json({ error })
  }
})

module.exports = router
