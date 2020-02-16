# Serverless-oidc

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

serverless-oidc:
  component: '@authing/serverless-oidc'
  inputs:
    client_id: YOUR_OIDC_CLIENT_ID
    redirect_uri: YOUR_OIDC_REDIRECT_URI

## Deploy

```shell
$ sls --debug
```

Have fun !  