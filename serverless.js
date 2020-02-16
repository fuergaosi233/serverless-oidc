const { Component } = require('@serverless/core')

class MyComponent extends Component {
  async default(inputs = {}) {
    console.log(this.context)
    return {}
  } // The default functionality to run/provision/update your Component
}

module.exports = MyComponent