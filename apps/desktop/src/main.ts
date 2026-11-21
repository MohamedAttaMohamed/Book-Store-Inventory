/**
 * Electron main process — Phase 1 skeleton.
 *
 * Responsibilities:
 *  1. Enforce single-instance lock.
 *  2. Start the backend server (child process or inline).
 *  3. Wait for /health to respond.
 *  4. Open BrowserWindow pointing at the web UI.
 *  5. Minimal typed preload API.
 *
 * Full features (backup scheduler, silent print, tray) come in later phases.
 */
import { app, BrowserWindow, dialog } from 'electron';
import { spawn } from 'node:child_process';
import { join } from 'node:path';
import http from 'node:http';

const SERVER_PORT = 3001;
const SERVER_HOST = '127.0.0.1';
const HEALTH_URL = `http://${SERVER_HOST}:${SERVER_PORT}/api/v1/health`;
const MAX_HEALTH_RETRIES = 30;
const HEALTH_RETRY_MS = 500;

// ─── Single Instance ───
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
}

let mainWindow: BrowserWindow | null = null;
let serverProcess: ReturnType<typeof spawn> | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 600,
    title: 'نقطة بيع القرطاسية — Stationery POS',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: join(__dirname, 'preload.js'),
    },
  });

  // In development, load from Vite dev server; in production, load built files
  const isDev = !app.isPackaged;
  if (isDev) {
    void mainWindow.loadURL('http://localhost:5173');
  } else {
    void mainWindow.loadFile(join(__dirname, '..', 'web', 'dist', 'index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function startServer(): void {
  const serverPath = join(__dirname, '..', 'server', 'dist', 'main.js');
  serverProcess = spawn(process.execPath, [serverPath], {
    env: {
      ...process.env,
      NODE_ENV: 'production',
      PORT: String(SERVER_PORT),
      HOST: SERVER_HOST,
      DATABASE_URL: `file:${join(app.getPath('userData'), 'stationery-pos.db')}`,
    },
    stdio: 'pipe',
  });

  serverProcess.stdout?.on('data', (data: Buffer) => {
    process.stdout.write(`[server] ${data.toString()}`);
  });

  serverProcess.stderr?.on('data', (data: Buffer) => {
    process.stderr.write(`[server:err] ${data.toString()}`);
  });

  serverProcess.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      dialog.showErrorBox(
        'Server Error',
        `The backend server exited unexpectedly (code ${code}). The app will close.`,
      );
      app.quit();
    }
  });
}

async function waitForHealth(): Promise<void> {
  for (let i = 0; i < MAX_HEALTH_RETRIES; i++) {
    try {
      await new Promise<void>((resolve, reject) => {
        const req = http.get(HEALTH_URL, (res) => {
          if (res.statusCode === 200) resolve();
          else reject(new Error(`Health check returned ${res.statusCode}`));
          res.resume();
        });
        req.on('error', reject);
        req.setTimeout(1000, () => {
          req.destroy();
          reject(new Error('timeout'));
        });
      });
      return; // success
    } catch {
      await new Promise((r) => setTimeout(r, HEALTH_RETRY_MS));
    }
  }
  throw new Error('Server did not become healthy in time');
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on('window-all-closed', () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
  app.quit();
});

void app.whenReady().then(async () => {
  try {
    startServer();
    await waitForHealth();
    createWindow();
  } catch (err) {
    dialog.showErrorBox(
      'Startup Error',
      `Could not start the application: ${err instanceof Error ? err.message : String(err)}`,
    );
    app.quit();
  }
});
