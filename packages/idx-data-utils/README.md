# @spknetwork/idx-data-utils

A convenience library for common interactions with user data on ceramic using the IDX protocol over [glaze](https://developers.ceramic.network/tools/glaze/overview/).

# Usage

```ts
import { IdxDataService } from '@spknetwork/idx-data-utils'

const service = new IdxDataService(ceramic) // Pass your ceramic client instance

await service.init() // Required to initialize datamodels

// Get profile for the current logged in user
const profile = await service.getOwnProfile()

// Set profile for the current logged in user
await service.writeOwnProfile(profile)

// Get profile for any user by their DID
const profile = await service.getUserProfile(did)
```

## Helper functions

```ts
IdxDataService.isInitialized: () => boolean // will return true if the service instance has been initialized
```

## Note on changes to the IDX protocol and tools

See this recent blog post from ceramic on `datamodels` and `glaze`.

https://blog.ceramic.network/the-next-architecture-for-building-web3-data-applications/




