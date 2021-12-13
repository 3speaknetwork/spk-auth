export interface HiveKeychain {
  requestSignBuffer: any
  requestBroadcast: any
}

export interface HiveSignResponse {
  success: boolean
  error?: string
  result: any
  message: string
  data: any
  request_id: any
}

export interface ThreeIdPermissionRequest {
  type: string
  origin?: string | null
  payload: Record<string, any>
}
