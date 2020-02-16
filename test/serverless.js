const { Component } = require('@serverless/core')

class myFirstComponent extends Component {
    async default() {
      const ServerlessOIDC = await this.load('../')
      const oidcUrl = await ServerlessOIDC({
        client_id: '5d3ab8f461ec9c8bbbb4fd2b',
        redirect_uri: 'http://localhost:4577/redirect',
        domain: 'rabbit.authing.cn',
        scope: 'unionid email phone offline_access openid',
        response_type: 'code',
        state: 'xxx',
        nonce: 'xxxx',
        prompt: 'consent', // 后文需要测试 refresh_token，此处需要 prompt 指定为 consent
      });

      // 1. 引导用户在浏览器中访问此 URL
      console.log(oidcUrl);

      // 2. 用户登录完成后会在回调 URL 中得到 code，将 Code 作为填到下列参数中：
      const code2Token = await ServerlessOIDC.getTokenByCode({
        code: 'tTSXi~rc_3LtocXC0vMAYE_yVIj',
        client_secret: 'd767fe4dc4c3f48f0697f0ccbb00dd5c',
        grant_type: 'authorization_code',
      })
      console.log(code2Token);

      // 3. 检验 token 合法性 
      const checkToken = await ServerlessOIDC.checkToken(code2Token.id_token);
      console.log(checkToken);

      // 4. 使用 token 换取用户信息
      const userInfo = await ServerlessOIDC.getUserInfoByAccessToken(code2Token.access_token);
      console.log(userInfo);

      // 5. 刷新 token
      const refreshToken = await ServerlessOIDC.refreshToken({
        client_secret: 'd767fe4dc4c3f48f0697f0ccbb00dd5c',
        refresh_token: code2Token.refresh_token,
      }); 
      console.log(refreshToken);///
    }
}

module.exports = myFirstComponent