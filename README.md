# Codering's public website

## Local

To work on the project locally:

``` sh
docker-compose up
```

To deploy a static (production) build on a local Minikube cluster:

``` sh
./deploy.sh
```

## About SSL certificates

The FaaS cluster runs on OpenWhisk, exposing an API at https://172.17.0.1/ for instance. This local domain is certified with a self-signed certificate which one has to enable in the browser before the client may issue requests. The exact process depends on the browser:

- [for Firefox & IE](https://www.ibm.com/support/knowledgecenter/SSYMRC_5.0.0/com.ibm.rational.rrdi.admin.doc/topics/t_browser_ss_cert.html)
- [for Chromium/Chrome](https://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate)

> There's a "limitation" in Chromium v58+ that's preventing the website's cross-domain requests (CORS) from reaching the backend (see https://github.com/webpack/webpack-dev-server/issues/854). For now, the easiest and kind-of-only solution is to use Firefox. OpenWhisk could generate a certificate with the missing AltNames (TODO: file an issue about that on GitHub).