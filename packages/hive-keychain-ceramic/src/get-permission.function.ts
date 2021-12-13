import { ThreeIdPermissionRequest } from './types'

export async function getPermission(req: ThreeIdPermissionRequest): Promise<Array<string>> {
  return ['/']
}
