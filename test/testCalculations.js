import chai, {expect} from 'chai'
import {add, createStringObjectId, de} from "../src/services/calculations"
import {init} from "./setup"
import {ObjectID} from 'mongodb'

chai.should()

describe('Divers calculations', function () {

    beforeEach(init)

    it('add 2 quantities', function () {
        add({qt: 1, unit: "kg"}, {qt: 119, unit: "kg"}).should.be.deep.equal({qt: 120, unit: "kg"})
    })

    it('add 2 quantities differents units', function () {
        add({qt: 1000, unit: "g"}, {qt: 119, unit: "kg"}).should.be.deep.equal({qt: 120, unit: "kg"})
    })

    it('generate objectIds', function () {
        const count = 100000
        const objs = {}
        for (let i = 0; i < count; i++) {
            objs[createStringObjectId()] = true
        }
        Object.keys(objs).length.should.equal(count)
    })

    it('generer un string objectid au bon format', function () {
        expect(createStringObjectId().length).to.equal(24)
    })

    it('test objectId generation', function () {
        const strObjID = createStringObjectId()
        const objID = new ObjectID(strObjID)
        expect(objID.toString()).to.equals(strObjID)
    })

    it('dename', function(){
        expect(de("camenbert")).to.equals("de camenbert")
        expect(de("Camenbert")).to.equals("de Camenbert")

        expect(de("ail")).to.equals("d'ail")
        expect(de("Ail")).to.equals("d'Ail")
    })

})