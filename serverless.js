const { Component } = require('@serverless/core')
const axios = require('axios')
const qs = require('querystring')

class ServerlessOIDC extends Component {
  async default(inputs) {
    this.inputs = inputs
    inputs.prompt = inputs.prompt || 'login'
    return await this.getAuthorzationURL(inputs)
  } // The default functionality to run/provision/update your Component

  async getAuthorzationURL(inputs) {
    let urlPostFix = ''
    for(const key in inputs) {
        if (key !== 'domain') {
            urlPostFix += `${key}=${inputs[key]}&`
        }
    }
    return `https://${inputs.domain}/oauth/oidc/auth?${urlPostFix}`;
  }

  async getTokenByCode(inputs) {
    let code2tokenResponse
    try {
      code2tokenResponse = await axios.post(
        "https://oauth.authing.cn/oauth/oidc/token",
        qs.stringify({
          code: inputs.code,
          client_id: this.inputs.client_id,
          client_secret: inputs.client_secret,
          grant_type: inputs.grant_type,
          redirect_uri: this.inputs.redirect_uri,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      return code2tokenResponse.data;
    } catch (error) {
      throw Error(error)
    }
  }

  async checkToken(access_token) {
    // oauth/oidc/validate_access_token
    let validateAccessTokenResult
    try {
      validateAccessTokenResult = await axios.get(`https://oauth.authing.cn/oauth/oidc/validate_access_token?access_token=${access_token}`);
      return validateAccessTokenResult.data;
    } catch (error) {
      throw Error(error)
    }
  }

  async getUserInfoByAccessToken(access_token) {
    ///oauth/oidc/user/userinfo
    let userInfo
    try {
      userInfo = await axios.get(`https://oauth.authing.cn/oauth/oidc/user/userinfo?access_token=${access_token}`);
      return userInfo.data;
    } catch (error) {
      throw Error(error)
    }
  }

  async refreshToken(inputs) {        
    let refreshTokenResponse
    try {
        refreshTokenResponse = await axios.post(
        "https://oauth.authing.cn/oauth/oidc/token",
        qs.stringify({
          client_id: this.inputs.client_id,
          client_secret: inputs.client_secret,
          grant_type: 'refresh_token',
          refresh_token: inputs.refresh_token,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      return refreshTokenResponse.data;
    } catch (error) {
      throw Error(error)
    }
  }
}

module.exports = ServerlessOIDC