/**
 * Preload script — exposes a minimal typed API to the renderer.
 * contextIsolation: true, nodeIntegration: false.
 */
import { contextBridge, ipcRenderer } from 'electron';

const electronApi = {
  getAppVersion: (): Promise<string> => ipcRenderer.invoke('app:getVersion'),
  printReceipt: (invoiceId: string): Promise<boolean> =>
    ipcRenderer.invoke('print:receipt', invoiceId),
  selectFolder: (): Promise<string | null> =>
    ipcRenderer.invoke('dialog:selectFolder'),
  openBackupFolder: (): Promise<void> =>
    ipcRenderer.invoke('backup:openFolder'),
};

contextBridge.exposeInMainWorld('electronApi', electronApi);

export type ElectronApi = typeof electronApi;
