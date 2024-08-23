// import { DbServiceInterface} from '$lib/services/db/db.service.interface'
import { HeapDbService, heapDbService } from '$lib/services/db/Heap.db.service.js'

export const local = {
  signInSuccessUrl: 'http://127.0.0.1:5173',
  uiUrl: 'http://localhost:3000/',
}
export const defaultDbService = heapDbService
export const online = true
export const config = local
