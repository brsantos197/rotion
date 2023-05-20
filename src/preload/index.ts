import { contextBridge, ipcRenderer } from 'electron'
import { IPC } from '@shared/constants/ipc'
import {
  CreateDocumentsResponse,
  DeleteDocumentRequest,
  FetchAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentResponse,
  SaveDocumentRequest,
} from '../shared/types/ipc'

declare global {
  export interface Window {
    api: typeof api
  }
}

const api = {
  fetchDocuments: async (): Promise<FetchAllDocumentsResponse> =>
    ipcRenderer.invoke(IPC.DOCUMENTS.FETCH_ALL),
  fetchDocument: async (
    req: FetchDocumentRequest,
  ): Promise<FetchDocumentResponse> =>
    ipcRenderer.invoke(IPC.DOCUMENTS.FETCH, req),
  createDocument: async (): Promise<CreateDocumentsResponse> =>
    ipcRenderer.invoke(IPC.DOCUMENTS.CREATE),
  saveDocument: async (req: SaveDocumentRequest): Promise<void> =>
    ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, req),
  deleteDocument: async (req: DeleteDocumentRequest): Promise<void> =>
    ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, req),
  onNewDocumentRequest: (callback: () => void) => {
    ipcRenderer.on('new-document', callback)
    return () => {
      ipcRenderer.off('new-document', callback)
    }
  },
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api
}
