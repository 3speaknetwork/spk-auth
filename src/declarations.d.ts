import { HiveKeychain } from './types'

declare global {
  interface Window {
    hive_keychain?: HiveKeychain
  }
}
