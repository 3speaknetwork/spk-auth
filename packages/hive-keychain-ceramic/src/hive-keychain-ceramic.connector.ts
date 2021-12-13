import ThreeIdProvider from '3id-did-provider'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'
import { BasicProfile } from '@ceramicstudio/idx-constants'
import { Client as DHiveClient } from '@hiveio/dhive'
import { hash } from '@stablelib/sha256'
import { DID } from 'dids'
import { DEFAULT_HIVE_SIGNING_MESSAGE, HiveSignResponse } from '.'
import { DEFAULT_CERAMIC_HOST, DEFAULT_HIVE_HOSTS } from './constants'
import { getPermission } from './get-permission.function'

function normalizeAuthSecret(authSecret64: Uint8Array) {
  const authSecret = new Uint8Array(32)
  for (let i = 0; i < authSecret.length; i++) {
    authSecret[i] = authSecret64[i]
  }
  return authSecret
}

export class HiveKeychainCeramicConnector {
  provider: ThreeIdProvider | undefined
  DHive: DHiveClient
  ceramic: CeramicClient
  idx: IDX
  loggedIn = false

  constructor(
    ceramicHost: string = DEFAULT_CERAMIC_HOST,
    hiveHosts: string[] = DEFAULT_HIVE_HOSTS,
  ) {
    this.DHive = new DHiveClient(hiveHosts)
    this.ceramic = new CeramicClient(ceramicHost)
    this.idx = new IDX({ ceramic: this.ceramic, autopin: true })
  }

  get cachedSecret(): Uint8Array | null {
    const secretb64 = localStorage.getItem('hive.ceramic.secret')
    if (!secretb64) return null

    const buffer = Buffer.from(secretb64, 'base64')
    return new Uint8Array(buffer)
  }

  public async login(): Promise<CeramicClient> {
    if (this.cachedSecret) {
      // First try to use secret kept in local storage
      const did = await this.createAndLoginDid(this.cachedSecret, this.ceramic)
      await this.ceramic.setDID(did)
    } else {
      // Otherwise get secret from hive keychain
      const did = await this.loginWithKeychain(this.ceramic)
      await this.ceramic.setDID(did)
    }

    this.loggedIn = true
    return this.ceramic
  }

  private setAuthState(authId: string, authSecret: Uint8Array) {
    localStorage.setItem('hive.ceramic.id', authId)
    const buffer = Buffer.from(authSecret)

    localStorage.setItem('hive.ceramic.secret', buffer.toString('base64'))
  }

  private async createAndLoginDid(secret: Uint8Array, ceramic: CeramicClient): Promise<DID> {
    const authMethod = 'hiveKeychain'
    //     const provider = new Ed25519Provider(secret)
    const threeId = await ThreeIdProvider.create({
      getPermission: getPermission,
      authSecret: secret,
      authId: authMethod,
      ceramic,
    })

    const provider = threeId.getDidProvider()

    const resolver = ThreeIdResolver.getResolver(ceramic)
    const did = new DID({ provider, resolver })
    try {
      await did.authenticate()
    } catch (err) {
      console.error(`Error authenticating DID!`, err)
    }

    console.log(`did id is ${did.id}`)
    return did
  }

  /**
   * Login with hive keychain
   * For docs, see https://github.com/stoodkev/hive-keychain/blob/master/README.md
   */
  private async loginWithKeychain(ceramic: CeramicClient): Promise<DID> {
    if (!window.hive_keychain) {
      throw new Error(`Hive keychain not available!`)
    }

    const loginResult = await new Promise<HiveSignResponse>((resolve, reject) => {
      window.hive_keychain?.requestSignBuffer(
        undefined,
        DEFAULT_HIVE_SIGNING_MESSAGE,
        'Posting',
        (res: HiveSignResponse) => {
          if (res.success) {
            resolve(res)
          } else {
            return reject(res)
          }
        },
        'https://hive-api.3speak.tv',
        'Login to SPK network',
      )
    })

    const { username } = loginResult.data

    const authId = `hive:${username}`
    const ceramicSecret = normalizeAuthSecret(hash(Buffer.from(loginResult.result)))
    // log the DID
    this.setAuthState(authId, ceramicSecret)

    const did = await this.createAndLoginDid(ceramicSecret, ceramic)
    const accountInfo = (await this.DHive.database.getAccounts([username]))[0] as any
    const json_metadata = JSON.parse(accountInfo.posting_json_metadata)

    console.log(`json_metadata: `, json_metadata)

    if (!json_metadata?.did) {
      json_metadata.did = did.id
      window.hive_keychain?.requestBroadcast(
        username,
        [
          [
            'account_update2',
            {
              account: username,
              json_metadata: '',
              posting_json_metadata: JSON.stringify(json_metadata),
            },
          ],
        ],
        'Posting',
        (err) => console.log(err),
      )
    }

    return did
  }

  public logout() {
    localStorage.removeItem('hive.ceramic.id')
    localStorage.removeItem('hive.ceramic.secret')
  }

  public async getIdxProfile(): Promise<BasicProfile> {
    if (!this.idx) {
      throw new Error(`idx not initialized...cannot fetch basic profile`)
    }
    try {
      return (await this.idx.get('basicProfile')) as BasicProfile
    } catch (err) {
      throw new Error(`Error getting basic profile from IDX! ${err.message}`)
    }
  }

  public async setIdxProfile(profile: BasicProfile) {
    if (!this.idx) {
      throw new Error(`idx not initialized...cannot set basic profile`)
    }
    try {
      await this.idx.set('basicProfile', profile)
    } catch (err) {
      throw new Error(`Error setting basic profile in IDX! ${err.message}`)
    }
  }
}
