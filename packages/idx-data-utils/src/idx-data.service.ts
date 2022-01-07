import { CeramicApi } from '@ceramicnetwork/common'
import { DIDDataStore, DIDDataStoreParams } from '@glazed/did-datastore'
import {
  model as basicProfileModel,
  BasicProfile,
  ModelTypes,
  model,
} from '@datamodels/identity-profile-basic'
import { ModelManager } from '@glazed/devtools'

export class IdxDataService {
  private basicProfileDatastore: DIDDataStore<ModelTypes>
  private initialized = false
  private initFunctionCalled = false

  constructor(private readonly ceramic: CeramicApi) {}

  public async init() {
    if (this.initialized || this.initFunctionCalled) {
      throw new Error(`Init function should only be called once!`)
    }
    this.initFunctionCalled = true

    const manager = ModelManager.fromJSON(this.ceramic, basicProfileModel)
    const published = await manager.toPublished()

    const params: DIDDataStoreParams = {
      ceramic: this.ceramic,
      model: published,
    }
    this.basicProfileDatastore = new DIDDataStore(params)

    this.initialized = true
  }

  private throwIfNotInit() {
    if (!this.initialized) {
      throw new Error(`IdxDataService is not initialized!  Must call async function .init()`)
    }
  }

  /**
   * Get profile for the authenticated user
   */
  public async getOwnProfile(): Promise<BasicProfile | null> {
    this.throwIfNotInit()
    return await this.basicProfileDatastore.get('basicProfile')
  }

  /**
   * Set profile for the authenticated user
   */
  public async writeOwnProfile(profile: BasicProfile) {
    this.throwIfNotInit()
    await this.basicProfileDatastore.set('basicProfile', profile)
  }

  /**
   * Get profile for any user
   * @param userDid - DID of the user to retrieve
   */
  public async getUserProfile(userDid: string) {
    return await this.basicProfileDatastore.get('basicProfile', userDid)
  }
}
