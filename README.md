# `Votesecure`

![Votesecure voting process](/src/Vote_Secure_frontend/public/assets/votingsteps.png)

## 🧑🏽‍💻 Team Introduction

We’re a focused, experienced team from Tesseract Studios, bringing together backend devs, frontend engineers, UI/UX designers, and Web3 builders — all aligned around real-world problem-solving with decentralized tech.

### Core team members include:

- Benjamin John – Team Lead / Backend (Motoko)

Amarachi Uvere – Backend Developer / Smart Contracts

Olamide – UI/UX Design Lead

Precious Oyedeji – Frontend Engineer

Sharon – Frontend Support


## 🧩 Motivation / Problem Statement

Many elections — from DAOs to student governments — still depend on insecure, centralized platforms or basic Google Forms to collect votes.

This leads to:

- Low voter trust due to unverifiable results

- No transparency or tamper-proof audit trails

- Poor scalability for decentralized teams, schools, and communities

VoteSecure was created to solve this.


---


#### VoteSecure is a fully on-chain, decentralized voting platform built on the Internet Computer Protocol (ICP).

It provides:

- Admin-created elections with full access control
- Secure CSV-based voter database upload
- Automatic generation of anonymous voter IDs
- Email delivery of credentials
- Real-time voting and transparent result viewing
- No gas fees or centralized backend

It’s fast, accessible, and tamper-proof — everything a secure election platform should be.

## Running the project locally

If you want to run this project locally,

  - Clone this repository
  - Make sure dfx is installed on your system (preferably Linux)
    ```sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"```
  - Run `npm install` to install all the necessary dependencies
  - Start the replica
    ```dfx start --background```
  - Deploy the app canisters locally
    ```dfx deploy```
  - Navigate to your browser and enter the links generated. The application will be available at `http://localhost:4943?canisterId={asset_canister_id}`
