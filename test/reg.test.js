const assert = require('assert');
const pg = require("pg");
const Pool = pg.Pool;
const registration = require("../reg")

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/reg_numbers_tests'

const pool = new Pool({
    connectionString

});



const regNum = registration(pool)
describe('Registration Numbers', function () {

    beforeEach(async function () {

        // clean the tables before each test run
        await pool.query("delete from registrations;");


    });

    it('should be able to add  registration numbers to the database', async () => {
        await regNum.addRegNumber('CL 123 321');
        await regNum.addRegNumber('CA 123-123');
        await regNum.addRegNumber('CJ 124-124');


        const regsList = await regNum.showReg()

        assert.deepEqual([
            {
                reg_number: 'CL 123 321',
                town_id: 3
            },
            {
                reg_number: 'CA 123-123',
                town_id: 2
            },
            {
                reg_number: 'CJ 124-124',
                town_id: 1
            }
        ]
            , regsList);

    });
    it("should not be able to add registration numbers that already exists  in the database", async () => {
        await regNum.addRegNumber('CL 123 321');
        await regNum.addRegNumber('CA 123-123');
        await regNum.addRegNumber('CJ 124-124');
        await regNum.addRegNumber('CA 123-123');
        await regNum.addRegNumber('CJ 124-124');

        const exists = await regNum.showReg()
        assert.deepEqual([
            {
                reg_number: 'CL 123 321',
                town_id: 3
            },
            {
                reg_number: 'CA 123-123',
                town_id: 2
            },
            {
                reg_number: 'CJ 124-124',
                town_id: 1
            }
        ]
            , exists);
    })

    it("should be able to filter registrations from  cape town ", async () => {
        await regNum.addRegNumber('CL 123 321');
        await regNum.addRegNumber('CA 123');
        await regNum.addRegNumber('CJ 124-124');
        await regNum.addRegNumber('CA 123-123');
        await regNum.addRegNumber('CA 124-124');

        const filterCapeTown = await regNum.filter('CA');
        const result = filterCapeTown.length
        assert.equal(3, result);

    });
    it("should be able to filter registrations from  Paarl ", async () => {
        await regNum.addRegNumber('CL 123 321');
        await regNum.addRegNumber('CA 123');
        await regNum.addRegNumber('CJ 124-124');
        await regNum.addRegNumber('CA 123-123');
        await regNum.addRegNumber('CA 124-124');

        const filterPaarl = await regNum.filter('CJ');
        const result = filterPaarl.length
        assert.equal(1, result);

    });
    it("should be able to filter registrations from  Stellenbosch", async () => {
        await regNum.addRegNumber('CL 123 321');
        await regNum.addRegNumber('CA 123');
        await regNum.addRegNumber('CJ 124-124');
        await regNum.addRegNumber('CA 123-123');
        await regNum.addRegNumber('CA 124-124');

        const filterStellenbosch = await regNum.filter('CJ');
        const result = filterStellenbosch.length
        assert.equal(1, result);

    });
    it("should be able to filter all registration numbers entered", async () => {
        await regNum.addRegNumber('CL 123 321');
        await regNum.addRegNumber('CA 123');
        await regNum.addRegNumber('CJ 124-124');
        await regNum.addRegNumber('CA 123-123');
        await regNum.addRegNumber('CA 124-124');

        const filterAllTOwns = await regNum.filter('all');

        assert.deepEqual([{
            reg_number: 'CL 123 321'
        },
        {
            reg_number: 'CA 123'
        },
        {
            reg_number: 'CJ 124-124'
        },
        {
            reg_number: 'CA 123-123'
        },
        {
            reg_number: 'CA 124-124'
        }
        ]
            , filterAllTOwns);

    });
    it ("should be able to delete from database ", async ()=>{
        await regNum.addRegNumber('CL 123 321');
        await regNum.addRegNumber('CA 123');
        await regNum.addRegNumber('CJ 124-124');
        await regNum.addRegNumber('CA 123-123');
        await regNum.addRegNumber('CA 124-124');

        
        await regNum.resetData()
    const reset=await regNum.showReg()
        assert.deepEqual([],reset);
    })






    after(function () {
        pool.end();
    })

});



