const { Component } = require('@serverless/core')

class MyComponent extends Component {
  async default(inputs = {}) {
    console.log(this.context)
    return {}
  } // The default functionality to run/provision/update your Component

  async getAuthorzationURL() {

  }

  async getTokenByCode() {

  }

  async checkToken() {

  }

  async getUserInfoByAccessToken() {

  }

  async refreshToken() {

  }
}

module.exports = MyComponent