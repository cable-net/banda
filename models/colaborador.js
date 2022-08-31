const mongoose = require('mongoose')

const colaboradorSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    min: 2,
    max: 20
  },
  segundoNombre: {
    type: String,
    min: 2,
    max: 20
  },
  paterno: {
    type: String,
    require: true,
    min: 2,
    max: 20
  },
  materno: {
    type: String,
    require: true,
    min: 2,
    max: 20
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  telefono: {
    type: String,
    required: true,
    min: 12,
    max: 12
  },
  telefonoExtra: {
    type: String,
    required: true,
    min: 12,
    max: 12
  },
  fechaNacimiento: {
    type: Date,
    required: true
  },
  tipoColaborador: {
    type: String,
    required: true,
    enum: ['TECNICO', 'CAJERO', 'SUPERVISOR']
  },
  curp: {
    type: String,
    required: true,
    min: 18,
    max: 18
  },
  rfc: {
    type: String,
    required: true,
    min: 12,
    max: 12
  },
  genero: {
    type: String,
    required: true,
    enum: ['MASCULINO', 'FEMENINO']
  },
  calleNumero: {
    type: String,
    required: true,
    min: 13,
    max: 50
  },
  referencia: {
    type: String,
    required: true,
    min: 13,
    max: 100
  },
  estado: {
    type: String,
    required: true,
    enum: ['AGUASCALIENTES', 'BAJA CALIFORNIA', 'BAJA CALIFORNIA SUR', 'CAMPECHE', 'CHIAPAS', 'CHIHUAHUA', 'CIUDAD DE MÉXICO', 'COAHUILA', 'COLIMA', 'DURANGO', 'ESTADO DE MÉXICO', 'GUANAJUATO', 'GUERRERO', 'HIDALGO', 'JALISCO', 'MICHOACÁN', 'MORELOS', 'NAYARIT', 'NUEVO LEÓN', 'OAXACA', 'PUEBLA', 'QUERÉTARO', 'QUINTANA ROO', 'SAN LUIS POTOSÍ', 'SINALOA', 'SONORA', 'TABASCO', 'TAMAULIPAS', 'TLAXCALA', 'VERACRUZ', 'YUCATÁN', 'ZACATECAS']
  },
  municipio: {
    type: String,
    required: true,
    min: 5,
    max: 100
  },
  colonia: {
    type: String,
    required: true,
    min: 5,
    max: 100
  },
  codigoPostal: {
    type: String,
    required: true,
    min: 5,
    max: 5
  }
})

module.exports = mongoose.model('Colaborador', colaboradorSchema)
