const express = require('express')
const router = express.Router()
const Colaborador = require('../models/colaborador')
const Joi = require('@hapi/joi').extend(require('@joi/date'))

const colaboradorSchema = Joi.object({
  nombre: Joi.string().min(2).max(20).required(),
  segundoNombre: Joi.string().min(2).max(20).required(),
  paterno: Joi.string().min(2).max(20).required(),
  materno: Joi.string().min(2).max(20).required(),
  email: Joi.string().min(6).max(100).required().email(),
  telefono: Joi.string().min(12).max(12).required(),
  telefonoExtra: Joi.string().min(12).max(12).required(),
  fechaNacimiento: Joi.date().format('YYYY-MM-DD HH:mm:ss').utc().required(),
  tipoColaborador: Joi.string().valid('VENTAS', 'TECNICOS', 'SUPERVISOR', 'GERENTE', 'CONTADOR').required(),
  curp: Joi.string().min(18).max(18).required(),
  rfc: Joi.string().min(12).max(12).required(),
  genero: Joi.string().valid('MASCULINO', 'FEMENINO').required(),
  calleNumero: Joi.string().min(13).max(50).required(),
  referencia: Joi.string().min(13).max(100).required(),
  estado: Joi.string().valid('AGUASCALIENTES', 'BAJA CALIFORNIA', 'BAJA CALIFORNIA SUR', 'CAMPECHE', 'CHIAPAS', 'CHIHUAHUA', 'CIUDAD DE MÉXICO', 'COAHUILA', 'COLIMA', 'DURANGO', 'ESTADO DE MÉXICO', 'GUANAJUATO', 'GUERRERO', 'HIDALGO', 'JALISCO', 'MICHOACÁN', 'MORELOS', 'NAYARIT', 'NUEVO LEÓN', 'OAXACA', 'PUEBLA', 'QUERÉTARO', 'QUINTANA ROO', 'SAN LUIS POTOSÍ', 'SINALOA', 'SONORA', 'TABASCO', 'TAMAULIPAS', 'TLAXCALA', 'VERACRUZ', 'YUCATÁN', 'ZACATECAS').required(),
  municipio: Joi.string().min(5).max(100).required(),
  colonia: Joi.string().min(5).max(100).required(),
  codigoPostal: Joi.string().min(5).max(5).required()
})

router.post('/', async (req, res) => {
  const { error } = colaboradorSchema.validate(req.body)

  if (error) {
    return res.status(400).json(
      { error: error.details[0].message }
    )
  }
  const colaborador = new Colaborador({

    nombre: req.body.primerNombre,
    segundoNombre: req.body.segundoNombre,
    paterno: req.body.paterno,
    materno: req.body.materno,
    email: req.body.email,
    telefono: req.body.telefono,
    telefonoExtra: req.body.telefonoExtra,
    fechaNacimiento: req.body.fechaNacimiento,
    tipoColaborador: req.body.tipoColaborador,
    curp: req.body.curp,
    rfc: req.body.rfc,
    genero: req.body.genero,
    calleNumero: req.body.calleNumero,
    referencia: req.body.referencia,
    estado: req.body.estado,
    municipio: req.body.municipio,
    colonia: req.body.colonia,
    codigoPostal: req.body.codigoPostal
  })

  try {
    const saveColaborador = await colaborador.save()
    res.json({
      error: null,
      data: saveColaborador
    })
    console.log('colaborador guardado')
  } catch (error) {
    res.status(400).json({ error })
  }
})

module.exports = router
