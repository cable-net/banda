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
      const res = await request(app).post('/api/colaborador').set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTVmZDEzODJlYWMwMmQ3NWI4ZGE3NCIsImlhdCI6MTY1OTIzOTcwMH0.AV5WVSIY63cRGMDcJEHFFHVuPiALwcJAJuSt3oS962o').send(colaborador)
      expect(res.status).to.equal(201)
      expect(res.body).to.have.include.keys('_id')
    })

    it('deberia retornar un error porque el email ya existe', async () => {
      const colaborador = {
        nombre: 'Lola',
        segundoNombre: 'Regina',
        paterno: 'Diaz',
        materno: 'Conde',
        email: 'perla082003@gmail.com',
        telefono: '017722841163',
        telefonoExtra: '017788558882',
        fechaNacimiento: '2000-07-18 00:00:00',
        tipoColaborador: 'SUPERVISOR',
        curp: 'PEHT860817MHGGRN06',
        rfc: 'PEC711225544',
        genero: 'FEMENINO',
        calleNumero: 'Francisco MUJICA 39',
        referencia: 'entre Av.16 deseptiembre y Av. Hidalgo',
        estado: 'HIDALGO',
        municipio: 'Mixquiahuala',
        colonia: 'El Bondho',
        codigoPostal: '42700'
      }
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTVmZDEzODJlYWMwMmQ3NWI4ZGE3NCIsImlhdCI6MTY1OTIzOTcwMH0.AV5WVSIY63cRGMDcJEHFFHVuPiALwcJAJuSt3oS962o'
      await request(app).post('/api/colaborador').set('auth-token', token).send(colaborador)
      const res = await request(app).post('/api/colaborador').set('auth-token', token).send(colaborador)
      expect(res.status).to.equal(400)
      expect(res.body.error).to.equal('Este email ya existe')
    })

    it('deberia retornar un error porque el segundo nombre no cumple con el formato', async () => {
      const colaborador = {
        nombre: 'Roman',
        segundoNombre: 'A',
        paterno: 'Lima',
        materno: 'Conde',
        email: 'roman12@gmail.com',
        telefono: '7722841163',
        telefonoExtra: '7788558882',
        fechaNacimiento: '2000-07-18 00:00:00',
        tipoColaborador: 'SUPERVISOR',
        curp: 'ROHT860817MHGGRN06',
        rfc: 'ROEC711225544',
        genero: 'FEMENINO',
        calleNumero: 'Francisco MUJICA 56',
        referencia: 'a dos cuadras de la Secundaria David Noble ',
        estado: 'HIDALGO',
        municipio: 'Mixquiahuala',
        colonia: 'El Bondho',
        codigoPostal: '42700'
      }
      const res = await request(app).post('/api/colaborador').set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTVmZDEzODJlYWMwMmQ3NWI4ZGE3NCIsImlhdCI6MTY1OTIzOTcwMH0.AV5WVSIY63cRGMDcJEHFFHVuPiALwcJAJuSt3oS962o').send(colaborador)
      expect(res.status).to.equal(400)
      expect(res.body.error).to.equal('"segundoNombre" length must be at least 2 characters long')
    })

    it('deberia retornar un error porque el tipo de colaborador no existe', async () => {
      const colaborador = {
        nombre: 'Alejandra',
        segundoNombre: 'Regina',
        paterno: 'Diaz',
        materno: 'Conde',
        email: 'alejandra082003@gmail.com',
        telefono: '017725841163',
        telefonoExtra: '017758558882',
        fechaNacimiento: '2009-07-18 00:00:00',
        tipoColaborador: 'OTRO',
        curp: 'ALHT860817MHGGRN06',
        rfc: 'ALC711225544',
        genero: 'FEMENINO',
        calleNumero: 'Francisco MUJICA 39',
        referencia: 'entre Av.16 deseptiembre y Av. Hidalgo',
        estado: 'HIDALGO',
        municipio: 'Mixquiahuala',
        colonia: 'El Bondho',
        codigoPostal: '42700'

      }
      const res = await request(app).post('/api/colaborador').set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTVmZDEzODJlYWMwMmQ3NWI4ZGE3NCIsImlhdCI6MTY1OTIzOTcwMH0.AV5WVSIY63cRGMDcJEHFFHVuPiALwcJAJuSt3oS962o').send(colaborador)
      expect(res.status).to.equal(400)
      expect(res.body.error).to.equal('"tipoColaborador" must be one of [VENTAS, TECNICOS, SUPERVISOR, GERENTE, CONTADOR]')
    })
  })
})
