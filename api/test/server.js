const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');

chai.use(chaiHttp);
chai.should();

describe('Health Check', function () {
    it('returns status 200', function (done) {
        chai.request(app)
            .get('/health')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('returns message "OK"', function (done) {
        chai.request(app)
            .get('/health')
            .end((err, res) => {
                chai.expect(res.body.message).to.equal('OK');
                done();
            });
    });
});
