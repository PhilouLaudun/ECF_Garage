:: routine de démarrage automatique des serveurs Apache et MySQL avec le lancement du serveur backend de l'apli et du frontend
@echo off
:: Démarrage d'Apache en tant qu'administrateur
start /B "Démarrage d'Apache" "C:\xampp\apache\bin\httpd.exe"

:: Démarrage de MySQL en tant qu'administrateur
start /B "Démarrage de MySQL"  "C:\xampp\mysql\bin\mysqld.exe"