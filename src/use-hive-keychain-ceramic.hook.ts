import { atom, useAtom } from 'jotai'
import { CERAMIC_HOST, HIVE_HOSTS } from './constants'
import { HiveKeychainCeramicConnector } from './hive-keychain-ceramic.connector'

const InnerConnectorAtom = atom<HiveKeychainCeramicConnector | null>(null)

export function useHiveKeychainCeramic(ceramicHost: string, hiveHosts: string[]) {
  const [instance, setInstance] = useAtom(InnerConnectorAtom)

  if (!instance) {
    const newInstance = new HiveKeychainCeramicConnector(ceramicHost, hiveHosts)
    void setInstance(newInstance)
    return newInstance
  }

  return instance
}
