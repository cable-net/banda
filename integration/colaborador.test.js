const chai = require('chai')
const expect = chai.expect
const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const Colaborador = require('../models/colaborador')

describe('Pruebas para la autenticacion en la plataforma', () => {
  before(async () => {
    // before each test delete all users table data
    await Colaborador.deleteMany({})
  })

  after(async () => {
    mongoose.disconnect()
  })

  describe('Endpoint de colaboarador', () => {
    it('deberia retornar un colaborador con su id', async () => {
      const colaborador = {
        nombre: 'Dany',
        segundoNombre: 'Regina',
        paterno: 'Garcia',
        materno: 'Conde',
        email: 'dany082003@gmail.com',
        telefono: '017722841133',
        telefonoExtra: '017788558887',
        fechaNacimiento: '2000-08-18 00:00:00',
        tipoColaborador: 'SUPERVISOR',
        curp: 'DAHT860817MHGGRN05',
        rfc: 'DAC711225544',
        genero: 'FEMENINO',
        calleNumero: 'Francisco Villa 39',
        referencia: 'entre Av.16 deseptiembre y Av. Hidalgo',
        estado: 'HIDALGO',
        municipio: 'Mixquiahuala',
        colonia: 'El Bondho',
        codigoPostal: '42700'
      }
      const res = await request(app).post('/api/colaborador').send(colaborador)
      expect(res.status).to.equal(201)
      expect(res.body).to.have.include.keys('_id')      
    })
  })
})
