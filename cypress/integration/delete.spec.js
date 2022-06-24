describe('DELETE /characters/id', function () {

    const tochaHumana = {
        name: 'Johnny Storm',
        alias: 'Tocha Humana',
        team: ['Quarteto Fantástico'],
        active: true
    }

    context('quando tenho um personagem cadastrado', function () {

        before(function () {
            cy.postCharacter(tochaHumana).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('deve remover personagem pelo id', function () {
            const id = Cypress.env('characterId')
            cy.deleteCharacterById(id).then(function (response) {
                expect(response.status).to.eql(204)
            })
        })

        after(function () {
            const id = Cypress.env('characterId')
            cy.getCharacterById(id).then(function (response) {
                expect(response.status).to.eql(404)
            })
        })
    })
    it('deve retornar 404 ao remover por id não cadastrado', function () {
        const id = '62b222a60dfb0019bf047090'
        cy.getCharacterById(id).then(function (response) {
            expect(response.status).to.eql(404)
        })
    })
})