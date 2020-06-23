@echo off
setlocal enabledelayedexpansion

echo.Configurando Git Flow...
echo.Recomenda-se usar valor padrao para tudo.

set TAG_PREFIX=
if exist pom.xml (
    for %%I in (.) do set DIR_NAME=%%~nxI
    set TAG_PREFIX=!DIR_NAME!-
    echo.Prefixo de tag Maven: !TAG_PREFIX!
)
if exist package.json (
    set TAG_PREFIX=v
    echo.Prefixo de tag npm: !TAG_PREFIX!
)

git config --local gitflow.branch.develop develop
git config --local gitflow.prefix.versiontag "!TAG_PREFIX!"
git flow init --defaults --force --local

if %0 == "%~0" pause
