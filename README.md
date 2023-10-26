# Build-A-Token full stack zk-dApp
Simple token aleo full stack dApp to create your own token and control minting of your token with your deployed wallet address.

## Getting started with an Aleo Account & Wallet
1. Download the Puzzle Wallet (alpha) from the Chrome store
[here](https://chrome.google.com/webstore/detail/puzzle-wallet/fdchdcpieegfofnofhgdombfckhbcokj)
2. Follow the instructions in the wallet to create an Aleo address

## Getting started developing with Aleo by downloading Rust and Leo
1. Follow the instructions [here](https://developer.aleo.org/leo/installation) for downloading Rust & Leo

## Build-A-Token Aleo Program (the private smart contract)
1. Clone this repo
```bash
gh repo clone puzzlehq/build-a-token
```
2. Cd into the program folder
3. Rename the program to the name of your choice (must be more than 9 characters)
4. Update name of the inputs file with the new name
5. Update name of the program in the program.json with the new name
6. Hardcode your wallet address for deploying in the fields marked OWNER_ADDRESS 
7. Delete .env.example and replace with a .env with the same fields
8. Replace the private key field with the private key of the address you are using to deploy
9. Clean any existing build and outputs files by running:
```bash
leo clean
```
10. Create a new main.aleo file for your token aleo program by running a function with Leo cli like:
```bash
leo run mint_private aleo1726dd49l5u7tcqaqxksrk6pw5kfcdxvevvkas4j3lmns882frcxqp45h9j 100u64
```
The new main.aleo will be in the build folder under program now -- you will need this to deploy the program to the Aleo network.

## Build-A-Token Aleo Program Deployment
1. Fund the aleo address you are using for deployment via the faucet QR code in the faucet tab of the wallet
2. Deploy the `.aleo` program through [dev.puzzle.online](https://dev.puzzle.online)

## Build-A-Token Aleo Program Front-end
1. In `Dashboard.tsx`, change the program id in useRecords hook to the name of your deployed program
2. In `Dashboard.tsx`, change the program id in useExecute hook to the name of your deployed program
3. Hardcode your owner address in `Dashboard.tsx` at the bottom to unlock mint functionality in UI
4. In `Mint.tsx`, change the program id in useRecords hook to the name of your deployed program
5. In `Mint.tsx`, change the program id in useExecute hook to the name of your deployed program
4. Run `pnpm i && pnpm dev` (or your package manager of choice)
5. Connect your Puzzle wallet
6. When your owner account is connected, you'll be able to mint tokens
7. You can transfer tokens with any connected account that has a balance of these newly minted tokens
8. Create another wallet and try connecting your account -- you'll see that you can't mint token