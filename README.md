# `Vote_Secure`

![Votesecure voting process](/Vote_Secure/blob/main/src/Vote_Secure_frontend/public/assets/votingsteps.png)

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
