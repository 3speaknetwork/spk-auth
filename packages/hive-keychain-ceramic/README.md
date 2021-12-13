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

## Logout

Remove the ceramic secret from local storage so that a user must sign a message again to re-enter the app.

```ts
logout(): void
```

## Get basic profile

Retrieve basic profile information from IDX for the logged in user.

```ts
async getIdxProfile(): Promise<BasicProfile>
```

## Write basic profile

Write basic profile information to IDX for the logged in user.

```ts
async setIdxProfile(profile: BasicProfile): Promise<void>
```

# Recommended hive and ceramic hosts

Here are some recommended hosts

## Hive

https://api.hive.blog
https://api.hivekings.com
https://anyx.io
https://api.openhive.network

## Ceramic

### Mainnet

Ceramic mainnet is live but not currently available to all users.  Check for updates here https://developers.ceramic.network/learn/welcome/.

### Testnet

While mainnet is becoming available, the ceramic clay testnet is:

https://ceramic-clay.3boxlabs.com


