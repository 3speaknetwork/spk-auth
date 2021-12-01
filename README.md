# SPK Auth React

A library for authenticating with ceramic using Hive Keychain and interacting with IDX for user profile data.

# Usage

The main service class is `HiveKeychainCeramicConnector`.  An instance of the service can be initialized directly, or a singleton imported by using a convenience react hook.

## Import with hooks

Using the `useHiveKeychainCeramic` hook will cause a service singleton to be created on the first hook usage and memoized so that the same instance is returned for all subsequent uses of the hook.

```ts
import { useHiveKeychainCeramic } from 'spk-auth-react'

const connector = useHiveKeychainCeramic(ceramicHost, hiveHosts)
```

## Initialize Directly

```ts
import { HiveKeychainCeramicConnector } from 'spk-auth-react'

const connector = new HiveKeychainCeramicConnector(ceramicHost, hiveHosts)
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


