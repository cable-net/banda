const Joi = require('@hapi/joi').extend(require('@joi/date'))

const USER_TYPE_COLABORADOR = 'colaborador'
const PASSWORD_DEFAULT = 'D3fault#'

const colaboradorSchema = Joi.object({
  nombre: Joi.string().min(2).max(20).required(),
  segundoNombre: Joi.string().min(2).max(20).required(),
  paterno: Joi.string().min(2).max(20).required(),
  materno: Joi.string().min(2).max(20).required(),
  email: Joi.string().min(6).max(100).required().email(),
  telefono: Joi.string().min(12).max(12).required(),
  telefonoExtra: Joi.string().min(12).max(12).required(),
  fechaNacimiento: Joi.date().format('YYYY-MM-DD HH:mm:ss').utc().required(),
  tipoColaborador: Joi.string().valid('TECNICO', 'CAJERO', 'SUPERVISOR').required(),
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

module.exports.bodyToModel = function (body) {
  const { error } = colaboradorSchema.validate(body)
  if (error) {
    return [error]
  }
  const model = {
    nombre: body.nombre,
    segundoNombre: body.segundoNombre,
    paterno: body.paterno,
    materno: body.materno,
    email: body.email,
    telefono: body.telefono,
    telefonoExtra: body.telefonoExtra,
    fechaNacimiento: body.fechaNacimiento,
    tipoColaborador: body.tipoColaborador,
    curp: body.curp,
    rfc: body.rfc,
    genero: body.genero,
    calleNumero: body.calleNumero,
    referencia: body.referencia,
    estado: body.estado,
    municipio: body.municipio,
    colonia: body.colonia,
    codigoPostal: body.codigoPostal
  }
  return [error, model]
}

module.exports.colaboradorToUsuario = function (colaborador) {
  return {
    email: colaborador.email,
    password: PASSWORD_DEFAULT,
    user_id: colaborador._id,
    user_type: USER_TYPE_COLABORADOR,
    role: colaborador.tipoColaborador
  }
}
