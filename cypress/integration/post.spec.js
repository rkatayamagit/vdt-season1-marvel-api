

describe('POST /characters', function () {
    before(function () {
        cy.back2ThePast()
        cy.setToken()
    })


    it('deve cadastrar um personagem', function () {

        const character = {
            name: 'Wanda Maximof',
            alias: 'Feiticeira Escarlate',
            team: ['vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)
            })

    })

    context('quando o personagem já existe', function () {

        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: [
                'vingadores da costa oeste',
                'irmandade de mutantes'
            ],
            active: true
        }

        before(function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(201)
            })
        })

        it('não deve cadastrar duplicado', function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
            })

        })

    })

    context('quando os campos obrigatórios não são enviados na requisição', function () {

        it('Erro ao tentar cadastrar sem nome', function () {
            const character = {
                alias: 'Mercurio',
                team: [
                    'vingadores da costa oeste',
                    'irmandade de mutantes'
                ],
                active: true
            }
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Bad Request')
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('"name" is required')

            })
        })
        
        it('Erro ao tentar cadastrar sem alias', function () {
            const character = {
                name: 'Pietro Maximoff',
                team: [
                    'vingadores da costa oeste',
                    'irmandade de mutantes'
                ],
                active: true
            }
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Bad Request')
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('"alias" is required')

            })
        })

        it('Erro ao tentar cadastrar sem time', function () {
            const character = {
                name: 'Pietro Maximoff',
                alias: 'Mercurio',
                active: true
            }
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Bad Request')
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('"team" is required')

            })
        })

        it('Erro ao tentar cadastrar sem status de active', function () {
            const character = {
                name: 'Pietro Maximoff',
                alias: 'Mercurio',
                team: [
                    'vingadores da costa oeste',
                    'irmandade de mutantes'
                ]
            }
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Bad Request')
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('"active" is required')

            })
        })

        it('Erro ao tentar cadastrar passando somente idade', function () {
            const character = {
                idade: '40',
            }
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Bad Request')
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('"name" is required')

            })
        })
    })

    context('quando os campos obrigatórios são enviados em branco', function () {

        it('Erro ao tentar cadastrar com campo nome em branco', function () {
            const character = {
                name: '',
                alias: 'Mercurio',
                team: [
                    'vingadores da costa oeste',
                    'irmandade de mutantes'
                ],
                active: true
            }
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Bad Request')
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('"name" is not allowed to be empty')

            })
        })
        
        it('Erro ao tentar cadastrar com o campo alias em branco', function () {
            const character = {
                name: 'Pietro Maximoff',
                alias: '',
                team: [
                    'vingadores da costa oeste',
                    'irmandade de mutantes'
                ],
                active: true
            }
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Bad Request')
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('"alias" is not allowed to be empty')

            })
        })

        it('Erro ao tentar cadastrar com o campo time em branco', function () {
            const character = {
                name: 'Pietro Maximoff',
                alias: 'Mercurio',
                team: [''],
                active: true
            }
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Bad Request')
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('"team[0]" is not allowed to be empty')

            })
        })

        it('Erro ao tentar cadastrar com status de active em branco', function () {
            const character = {
                name: 'Pietro Maximoff',
                alias: 'Mercurio',
                team: [
                    'vingadores da costa oeste',
                    'irmandade de mutantes'
                ],
                active: ''
            }
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Bad Request')
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('"active" must be a boolean')

            })
        })

        it('Erro ao tentar cadastrar quando todos os campos obrigatórios em branco mas idade preenchida', function () {
            const character = {
                name: '',
                alias: 'Mercurio',
                idade: '40',
                team: [''
                ],
                active: ''
            }
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Bad Request')
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('"name" is not allowed to be empty')

            })
        })
    })
})