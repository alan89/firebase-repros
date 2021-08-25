# firebase-repros

## General
### Purpose
This repository will be used to implement the different quickstarts, so it will contain code for different platforms.

The firebase project used is:
- ProjectID: _reproductions-de25b_
- Project number: _425447949131_

### Owners:
- @alan44 : Alan Escobar Martínez

## Structure

### functions folder
This folder will store the different kind of cloud functions used in the projects:
- `sendVerificationEmail`: This cloud function is used to send a verification email immediately after the creation of the account (`onCreate()`). There are a couple of additional validations, if the created account does not contain an email, or if the account is already considered as verified, the email is not sent.

### public folder
Used for Hosting, this folder will store the files to be presented in the webpage. At this moment, a [custom domain](https://epamfrbs.xyz) is configured.
- **Auth**: At this moment the quickstart for web is being used as the base, but only the following clients are configured:
	- Anonymous
	- Email-link
	- Email-password
	- Phone
	- Google (using @alan44's personal account)
	- Twitter (using @alan44's test app)

### root folder
All the files listed here are used for different kinds of configurations:
- `database.rules.json` and `firestore.rules` are used to define the rules for both databases.
- `firebase.json` is the file used for general configurations over the project, including hosting behavior, emulators and files used to define the rules for both databases.
- `firestore.indexes.json` is used to define the indexes to be used in the firestore database.
