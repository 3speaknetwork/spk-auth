# @spknetwork/hive-keychain-ceramic

A library for authenticating with ceramic using Hive Keychain and interacting with IDX for user profile data.

# Usage

```ts
import { HiveKeychainCeramicConnector } from 'spk-auth-react'

const connector = new HiveKeychainCeramicConnector(ceramicHost?, hiveHosts?)
```

# Service method usage for HiveKeychainCeramicConnector

## Login

Access the hive keychain browser extension and ask the user to sign a message with their Hive identity.  The output is used to generate a secret seed for ceramic.  The function logs into ceramic using the secret and returns an instance of CeramicClient.

The secret is cached in local storage and re-used on browser refreshes until the `logout` message is called.

```ts
async login(): Promise<CeramicClient>
```

### Recording a user's `did` to its `posting_json_metadata` 

The first time a user authenticates with ceramic using Hive, the ceramic `did` (distributed identity) ID is written to the user's `posting_json_metadata` `did` attribute in their hive account.

## Logout

Remove the ceramic secret from local storage so that a user must sign a message again to re-enter the app.

```ts
logout(): void
```

# Accessing IDX data utils

An instance of [IdxDataService](https://www.npmjs.com/package/@spknetwork/idx-data-utils) is provided in connector property [connector.idxUtils] for convenient access to user data over the IDX protocol.

# Recommended hive and ceramic hosts

Here are some recommended hosts for both Hive and Ceramic.

## Hive

- https://api.hive.blog
- https://api.hivekings.com
- https://anyx.io
- https://api.openhive.network

## Ceramic

### Mainnet

Ceramic mainnet is live but not currently available to all users.  Check for updates here https://developers.ceramic.network/learn/welcome/.

### Testnet

While mainnet is becoming available, the ceramic clay testnet is:

https://ceramic-clay.3boxlabs.com


