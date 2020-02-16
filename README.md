# Serverless-oidc

![serverless-authing](https://github.com/Authing/serverless-oidc/blob/master/static/serverless-oidc.png?raw=true)

Serverless Authing OIDC(OpenID Connect) Process.

## Install

1. global install serverless
```shell
$ npm install -g serverless
```
2. install serverless-oidc
```shell
$ npm i --save @authing/serverless-oidc
```

## serverless.yml

```yaml
serverless-oidc:
  component: '@authing/serverless-oidc'
  inputs:
    client_id: YOUR_OIDC_CLIENT_ID
    redirect_uri: YOUR_OIDC_REDIRECT_URI
    domain: YOUR_DOMAIN # DOAMIN_NAME.authing.cn
    scope: SCOPE_U_NEED
    response_type: OIDC_RESPONSE_TYPE
    prompt: login
    state: RAMDOM_STRING_FOR_CSRF
    nonce: RANDOM_STRING_FOR_REPALY
```

## Deploy

```shell
$ sls --debug
```

Have fun !  