import { atom, useAtom } from 'jotai'
import { HiveKeychainCeramicConnector } from '@spknetwork/hive-keychain-ceramic'

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
