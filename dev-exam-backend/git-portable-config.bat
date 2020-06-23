@echo off

echo.

set /p USER="Nome curto do desenvolvedor (ex: Bob): "
set /p EMAIL="Email do desenvolvedor: "
echo.

echo.Configurando desenvolvedor...
git config --global user.name "%USER%"
git config --global user.email "%EMAIL%"

echo.Desabilitando conversao de linhas...
git config --system core.autocrlf false

echo.Definindo Google Chrome como navegador...
git config --system help.browser chrome
git config --system browser.chrome.path "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"

echo.Aceitando certificados auto assinados...
git config --global --bool http.sslVerify false

echo.
echo.OK
echo.

pause
