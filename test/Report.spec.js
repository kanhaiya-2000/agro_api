let should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:5000'),
    faker = require('faker')

let reportId


describe('Token', function () {
    before(function (done) {
        api.post('/reports')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
                "reportDetails": {
                    "userID": "user-1",
                    "marketID": "market-1",
                    "marketName": "Mg road khagaria",
                    "cmdtyID": "cmdty-1",
                    "marketType": "Mandi",
                    "cmdtyName": "Cabbage",
                    "priceUnit": "Quintol",
                    "convFctr": 100,
                    "price": 1700
                }
            }
            )
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                // const t = await res.json();
                //console.log(res)
                reportId = res.body.reportID;
                done()
            })
    })

    it('should return a 200 response', function (done) {
        api.get(`/reports/?reportID=${reportId}`)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                console.log("reportData received from GET request", res.body);
                done();
            })
    })

    it('should return a 400 response', function (done) {
        api.get('/reports/?reportID=hello')
            .set('Accept', 'application/json')
            .expect(400, done)
    })
})