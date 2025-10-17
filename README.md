# Angular 13 Radio Button Group Demo

Questo repository contiene un semplice progetto Angular 13 (`radio-button-app`) che mostra
come creare un componente personalizzato per gestire un gruppo di pulsanti radio
stilizzati come pulsanti Bootstrap 3. Il componente supporta `[(ngModel)]` e implementa
`ControlValueAccessor` per integrarsi con i form di Angular.

## Contenuto principale

- **Componente**: `RadioButtonGroupComponent` espone la proprietà `options` e gestisce
  lo stato attivo applicando le classi `btn-primary` (selezionato) e `btn-default`
  (non selezionato) ai tag `<a>`.
- **Demo**: `AppComponent` mostra l'utilizzo del componente con `ngModel` e aggiorna
  l'interfaccia quando l'utente seleziona un'opzione.
- **Stili**: Bootstrap 3 viene importato tramite CDN in `src/index.html`.

- **Tooltip**: ogni opzione può definire `tooltip` per mostrare un
  suggerimento nativo del browser passando la proprietà nell'oggetto opzione
  (es. `{ label: 'Piccolo', value: 'S', tooltip: 'Taglia S: piccola' }`).

Per eseguire l'applicazione è sufficiente installare le dipendenze (`npm install`) e
lanciare `npm start` all'interno della cartella `radio-button-app`.

## Esempio di pubblicazione su Git remoto

Dopo aver installato le dipendenze ed eventualmente apportato modifiche, puoi pubblicare
il progetto su un repository remoto eseguendo i passaggi standard di Git:

```bash
git status               # verifica i file modificati
git add .                # prepara i file per il commit
git commit -m "Messaggio" # crea il commit con un messaggio significativo
git remote add origin <URL_DEL_REPO>  # solo se il remoto non è già configurato
git push -u origin <branch>          # invia il branch corrente al remoto
```

Assicurati di sostituire `<URL_DEL_REPO>` e `<branch>` con il repository e il branch
che vuoi utilizzare. Se il remoto è già configurato, i comandi `git remote add` e
l'opzione `-u` possono non essere necessari.
