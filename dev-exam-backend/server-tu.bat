@echo off

REM Ambiente
set ENVIRONMENT=LOCAL
set BASE_PATH=https://10.191.1.200

REM URLs
set BRADESCO_INSTITUCIONAL=http://www.bradesco.com.br

set LOGIN_SERVICE=%BASE_PATH%/awb-login/sessions
set NPCC_SRV_ENVIO_CONFIRMACOES=%BASE_PATH%/npcc-srv-envio/confirmacoes
set NPCC_SRV_ENVIO_SOLICITACOES=%BASE_PATH%/npcc-srv-envio/solicitacoes
set NPCC_SRV_LIMITE_CONSULTA=%BASE_PATH%/npcc-srv-limite-consulta/limites
set NPCC_SRV_SWIFT_CONSULTA=%BASE_PATH%/npcc-srv-swift-consulta/swifts
set AGEX_SRV_LISTAR_REMESSA=%BASE_PATH%/agex-srv-listar-remessa/
set NPCC_SRV_SIMULACAO=%BASE_PATH%/npcc-srv-simulacao/simulacoes

REM set STATELESS_KEY={"kty": "EC","d": "16kHkEAe2Bq4jy6rb_lYUw-KPvO_x8InEdcvK06OOgA","crv": "P-256","kid": "0f4fc076-0583-438d-ad5d-2bd7dda615eb","x": "Uj2Q4UjjM0MT8UNV1zZV9pxvWjlA7PhW6fgL0zVN14I","y": "soioJzy7i8gj_WpTXWK1fomX9sahbgcBLlw47utT3Z4"}
REM Nao exibir STATELESS_KEY na saida
REM echo.STATELESS_KEY=0f4fc076-0583-438d-ad5d-2bd7dda615eb

REM Constantes
set DEBUG=true
set LOG_LEVEL=debug
set HYSTRIX_CIRCUIT_OPEN=false
set HYSTRIX_ERROR_THRESHOLD_PERCENTAGE=50
set HYSTRIX_SLEEP_TIME=30000
set HYSTRIX_TIMEOUT=20000
set HYSTRIX_VOLUME_THRESHOLD=2
set NODE_TLS_REJECT_UNAUTHORIZED=0
set PORTA_NODE=8081
set NODE_ENV=production

REM Bootstrap
nodemon ./app/server.js
