# @spknetwork/auth-react

A react library for authenticating with Ceramic.

# Hive Keychain Authentication 

## Usage

Using the `useHiveKeychainCeramic` hook will cause a service singleton to be created on the first hook usage and memoized so that the same instance is returned for all subsequent uses of the hook.

```ts
import { useHiveKeychainCeramic } from 'spk-auth-react'

const connector = useHiveKeychainCeramic(ceramicHost, hiveHosts)
```
