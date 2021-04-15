# JwtFrontendTemplate

L'applicazione e' stata generata con [JHipster 7.0.1](https://www.jhipster.tech/documentation-archive/v7.0.1).
Il comando usato per generare il progetto di partenza e'
```bash
jhipster --skip-cache --skip-server --auth=oauth2 --jhi-prefix=arpa
```

Dopo di che' e' stata configurata la security per permettere l'autenticazione da frontend secondo l'OpenID Connect.

Nella cartella [environment](https://dev.tai.it/gogs/mbasile/jwt-frontend-template/src/master/src/main/webapp/app/environment) e' possibile trovare i file di configurazione esternalizzata.
Al momento sono previsti tre configurazioni:
- [environment.ts](https://dev.tai.it/gogs/mbasile/jwt-frontend-template/src/master/src/main/webapp/app/environment/environment.ts): configurazione di default
- [environment.staging.ts](https://dev.tai.it/gogs/mbasile/jwt-frontend-template/src/master/src/main/webapp/app/environment/environment.staging.ts): configurazione per l'ambiente di ARPA Staging
- [environment.produzione.ts](https://dev.tai.it/gogs/mbasile/jwt-frontend-template/src/master/src/main/webapp/app/environment/environment.produzione.ts): configurazione per l'ambiente di ARPA Produzione

Nel codice dell'applicazione e' sufficiente fare riferimento all'oggettto ```ENV``` della configurazione di default, che poi a compilazione verra' sostituita dalla conf corrispondente all'ambiente selezionato da profilo.

## Sviluppo
Per la fase di sviluppo e' possibile lanciare il server in locale con hot reload alla modifica dei file con il comando ```npm run start```.

## Compilazione ed esecuzione
Sono disponibili script per la compilazione per i due ambienti di deploy (staging e produzione) oltre all'esecuzione in locale:
- staging:
    - compilazione ```npm run webapp:staging```
    - esecuzione in locale ```npm run server-staging```
- produzione:
    - compilazione ```npm run webapp:produzione```
    - esecuzione in locale ```npm run server-produzione```


## Aspetto
Sono gia' configurati l'header (la navbar) e il footer secondo lo stile adottato per le SPA per Regione Toscana del progetto ARPA.
