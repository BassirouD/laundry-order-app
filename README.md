# Gestion des commandes de blanchisserie

# 🧺 Blanchisserie App

Application de gestion de blanchisserie avec un **frontend Angular** et un **backend ASP.NET Core**.  
Le projet est divisé en deux parties :
- **Blanchisserie.Api** → Backend (.NET 9, Web API, EF Core, SQL Server)
- **blanchisserie-ui** → Frontend (Angular 17 + PrimeNG)

---

# 👤 Gestion des utilisateurs
###   Compte administrateur (créé automatiquement)
Lors du premier lancement de l’API, un compte administrateur est créé automatiquement s’il n’existe pas déjà dans la base :
- **Email**: admin@amc.fr
- **Password**: password123
- **Rôle**: ADMIN

Ce compte permet d’accéder à l’interface d’administration (valider/rejeter les commandes).

### Comptes utilisateurs (création manuelle)
Les utilisateurs classiques doivent s’inscrire via le frontend à partir de la page d’inscription.

Ils pourront ensuite créer des commandes, qui seront en attente de validation par un administrateur.

---

## 🚀 Prérequis

Avant de commencer, assurez-vous d’avoir installé :

- [.NET 9 SDK](https://dotnet.microsoft.com/fr-fr/download/dotnet/9.0)
- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.dev/cli) (`npm install -g @angular/cli`)
- [SQL Server](https://www.microsoft.com/sql-server) ou Docker avec SQL Server
## Lancement


---

## ⚙️ Lancer le backend (API)

1. Aller dans le dossier du backend :
   ```bash
   cd Blanchisserie.Api
    ```
2. Restaurer les dépendances :
   ```bash
   dotnet restore
    ```
3. Appliquer les migrations et créer la base de données :
    ```bash
    dotnet ef database update
    ```
4. Démarrer l’API :
    ```bash
   dotnet run
   ```
