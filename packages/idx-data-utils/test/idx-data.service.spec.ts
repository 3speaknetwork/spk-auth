import { CeramicClient } from '@ceramicnetwork/http-client'
import { BasicProfile } from '@datamodels/identity-profile-basic'
import { IdxDataService } from '../src/idx-data.service'
import { getTestCeramicClient } from './util/get-test-ceramic-client.function'

jest.setTimeout(20000)

// jest runner issue https://github.com/firsttris/vscode-jest-runner/issues/119
describe('idx data service should operate: ', () => {
  let service: IdxDataService
  let ceramic: CeramicClient
  let loggedInDid = ''
  const CERAMIC_HOST = process.env.CERAMIC_HOST || ''
  beforeAll(async () => {
    ceramic = global.ceramic as CeramicClient
    if (!ceramic) {
      throw new Error('ceramic session not available in the global namespace')
    }
    loggedInDid = ceramic?.did?.id as any
    service = new IdxDataService(ceramic)
    await service.init()
  })

  it('should be defined', async () => {
    expect(service).toBeDefined()
  })

  it('should write basic profile', async () => {
    const profile: BasicProfile = {
      name: 'testname',
    }

    await service.writeOwnProfile(profile)

    const fetched = await service.getOwnProfile()

    expect(profile).toEqual(fetched)
  })

  it("should get others' basic profile", async () => {
    const ceramicAcct2 = await getTestCeramicClient(CERAMIC_HOST)
    const service2 = new IdxDataService(ceramicAcct2)
    await service2.init()
    const profile: BasicProfile = {
      name: 'user2 name',
    }
    await service2.writeOwnProfile(profile)

    const fetched = await service.getUserProfile(ceramicAcct2?.did?.id || '')

    console.log(`got others profile`, fetched)
    expect(fetched).toEqual(profile)
  })
})
