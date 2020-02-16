# Serverless-OIDC

Serverless tencent fastify component.

Install
global install serverless
npm install -g serverless
install fastify
npm i --save fastify
Configure
create app.js file:
const fastify = require('fastify');

const app = fastify();
app.get('/', (request, reply) => reply.send({ hello: 'world' }));

if (require.main === module) {
  // called directly i.e. "node app"
  app.listen(3000, (err) => {
    if (err) console.error(err);
    console.log('server listening on 3000');
  });
} else {
  module.exports = app;
}
create serverless configure file:
# serverless.yml

fastify:
  component: '@twn39/tencent-fastify'
  inputs:
    region: ap-shanghai
Deploy
sls --debug
Have fun !