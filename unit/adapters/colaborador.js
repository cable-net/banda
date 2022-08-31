const chai = require('chai')
const expect = chai.expect
const adapter = require('../../adapters/colaborador')

describe('Pruebas para el adapter de colaborador: ', () => {
  describe('Adapter para post endpoint: ', () => {
    it('Deberia retornar un modelo de tipo colaborador', () => {
      const body = {
        nombre: 'Adriadne',
        segundoNombre: 'Victoria',
        paterno: 'Olvera',
        materno: 'Alcazar',
        email: 'adriadnevoa@gmail.com',
        telefono: '771122336699',
        telefonoExtra: '336699885511',
        fechaNacimiento: '2000-07-18 00:00:00',
        tipoColaborador: 'SUPERVISOR',
        curp: 'AROA860817MHGGRN06',
        rfc: 'AROC71122554',
        genero: 'FEMENINO',
        calleNumero: 'Francisco MUJICA 56',
        referencia: 'a dos cuadras de la Secundaria David Noble ',
        estado: 'HIDALGO',
        municipio: 'Mixquiahuala',
        colonia: 'El Bondho',
        codigoPostal: '42700'
      }
      const [error, model] = adapter.bodyToModel(body)
      expect(error).to.equal(undefined)
      expect(model).to.deep.equal({
        nombre: 'Adriadne',
        segundoNombre: 'Victoria',
        paterno: 'Olvera',
        materno: 'Alcazar',
        email: 'adriadnevoa@gmail.com',
        telefono: '771122336699',
        telefonoExtra: '336699885511',
        fechaNacimiento: '2000-07-18 00:00:00',
        tipoColaborador: 'SUPERVISOR',
        curp: 'AROA860817MHGGRN06',
        rfc: 'AROC71122554',
        genero: 'FEMENINO',
        calleNumero: 'Francisco MUJICA 56',
        referencia: 'a dos cuadras de la Secundaria David Noble ',
        estado: 'HIDALGO',
        municipio: 'Mixquiahuala',
        colonia: 'El Bondho',
        codigoPostal: '42700'
      })
    })
    it('Deberia retornar un error porque el rfc no cumple con el formato', () => {
      const body = {
        nombre: 'Adriadne',
        segundoNombre: 'Victoria',
        paterno: 'Olvera',
        materno: 'Alcazar',
        email: 'adriadnevoa@gmail.com',
        telefono: '771122336699',
        telefonoExtra: '336699885511',
        fechaNacimiento: '2000-07-18 00:00:00',
        tipoColaborador: 'SUPERVISOR',
        curp: 'AROA860817MHGGRN06',
        rfc: 'OC71',
        genero: 'FEMENINO',
        calleNumero: 'Francisco MUJICA 56',
        referencia: 'a dos cuadras de la Secundaria David Noble ',
        estado: 'HIDALGO',
        municipio: 'Mixquiahuala',
        colonia: 'El Bondho',
        codigoPostal: '42700'
      }
      const [error, model] = adapter.bodyToModel(body)
      expect(model).to.equal(undefined)
      expect(error.details[0].message).to.equal('"rfc" length must be at least 12 characters long')
    })
  })
})
