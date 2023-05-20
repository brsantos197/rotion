import { BrowserWindow, Menu, Tray } from 'electron'
import path from 'node:path'

export const createTray = (window: BrowserWindow) => {
  const tray = new Tray(
    path.resolve(__dirname, '..', '..', 'resources/rotionTemplate.png'),
  )

  const menu = Menu.buildFromTemplate([
    { label: 'Rotion', enabled: false },
    { type: 'separator' },
    {
      label: 'Criar novo documento',
      click: () => {
        window.webContents.send('new-document')
      },
    },
    { type: 'separator' },
    { label: 'Documentos Recentes', enabled: false },
    { label: 'Discover', click: () => {}, accelerator: 'CommandOrControl+1' },
    { label: 'Ignite', click: () => {}, accelerator: 'CommandOrControl+2' },
    { type: 'separator' },
    { label: 'Sair do Rotion', role: 'quit' },
  ])

  tray.setContextMenu(menu)
}
