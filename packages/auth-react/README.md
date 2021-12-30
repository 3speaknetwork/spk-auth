# @spknetwork/auth-react

A react library for authenticating with Ceramic.

# Hive Keychain Authentication 

## Hooks

### useHiveKeyChainCeramic

Using the `useHiveKeychainCeramic` hook will cause a service [HiveKeychainCeramicConnector](https://www.npmjs.com/package/@spknetwork/hive-keychain-ceramic) singleton to be created on the first hook usage and memoized so that the same instance is returned for all subsequent uses of the hook.  The memoization works globally (across components) using a [jotai](https://www.npmjs.com/package/jotai) [atom](https://jotai.org/docs/basics/primitives).

The `ceramicHost` and `hiveHosts` are optional parameters.  If not specified, they will default to commonly used hosts.  See [here](https://github.com/3speaknetwork/spk-auth/blob/main/packages/hive-keychain-ceramic/src/constants.ts) for details.

```ts
import { useHiveKeychainCeramic } from 'spk-auth-react'

const connector = useHiveKeychainCeramic(ceramicHost?, hiveHosts?)
```
