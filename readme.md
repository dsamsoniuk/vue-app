
## Wstepne działania:

`npm i`

## Proces stawiania testowej aplikacji Electron

1. wchodzimy w test-server-z-aplikacja/ a tam uruchamiamy dockera, to jest serwer testowy gdzie sa build-y aplikacju umieszczone.

2. dodajemy zmiany jakies w kodzie np. zmiana napisu. W package.json zmieniamy wersje na wyzsza i robimy znowu build-a a nastepnie kopiujemy do naszego magazynu (serwera)

3. jezeli wczesniej skopiowalismy aplikacje do innego katalogu to ja uruchamiamy i ona automatycznie zajrzy do serwera-magazyn gdzie jest wyzsza wersja i sie zaktualizuje.


## Zaktualizowany projekt do Electron +  Vite + Vue

Dodawanie build-a z vite

- pierw odpalamy `npm run package` aby opublikowac zmiany lokalnie do katalogu .vite i out/ wejda
- a nastepnie `npm run dist` w katalogu dist/ pojawi sie aplikacja


## Dodatkowe informacje

- aby zbudowac aplikacje na windows a korzystasz z linux-a musisz miec Wine zainstalowane na PC


electron-forge make	Tworzy finalne pliki aplikacji (.exe, .dmg, .AppImage itp.), ale bez publikowania ich.
electron-forge package	Pakietuje aplikację do folderu bez tworzenia instalatora (np. out/ z your-app.exe).
electron-forge publish	Wysyła aplikację na serwer (np. GitHub Releases, S3) po wcześniejszym wykonaniu make.