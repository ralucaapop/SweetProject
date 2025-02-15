# SWEET SERENITY

Aplicația Sweet Serenity este concepută pentru a facilta gestionarea activiăților organizatoriale din cadrul unei cofetării, cât și pentru a simplifica procesul de plasare a unei comenzi din perspectiva clientului. Aplicația oferă fiecărui tip de utilizator (administrator sau client) funcționalități specifice. 

## Arhitectura Aplicatiei:
Aplicația este construită folosind arhitectura 3-layer (trei straturi), fiecare strat având o responsabilitate specifică:
  - **Presentation Layer**: în cadrul aplicației acest nivel îl reprezintă interfața cu utilizatorul (construită folosind framwork-ul React)
  - **Business Logic Layer**: responsabil pentru implementarea regulilor și proceselor care definesc modul în care funcționează sistemul (pentru aplicația “DentHelp” acest strat este implementat folosind limbajul 
 de programare Java împreună cu SpringBoot)
  - **Data Access Layer**: responsabil pentru interacțiunea cu baza de date (baza de date folosită în aplicație este de tip MySql)

## Usecase
  ![diagrama uc](doc/userUC.png)   ![diagrama uc](doc/userUC.png)
  
## Functionalitati

  ### Administrator 
  - Gestionarea stocului de produse
  - Adaugarea de produse noi
  - Vizualizarea comenzilor și precomenzior plasate.
  - Gestionarea programărilor pentru degustări.

  ### Client
  - Plasarea unei precomenzi.
  - Plasarea unei comenzi.
  - Solicitarea unei degustări.
  - Crearea unei liste de favorite.

