import { atom, useAtom } from 'jotai'
import {
  DEFAULT_CERAMIC_HOST,
  DEFAULT_HIVE_HOSTS,
  HiveKeychainCeramicConnector,
} from '@spknetwork/hive-keychain-ceramic'

const InnerConnectorAtom = atom<HiveKeychainCeramicConnector | null>(null)

export function useHiveKeychainCeramic(
  ceramicHost: string = DEFAULT_CERAMIC_HOST,
  hiveHosts: string[] = DEFAULT_HIVE_HOSTS,
) {
  const [instance, setInstance] = useAtom(InnerConnectorAtom)

  if (!instance) {
    const newInstance = new HiveKeychainCeramicConnector(ceramicHost, hiveHosts)
    void setInstance(newInstance)
    return newInstance
  }

  return instance
}
