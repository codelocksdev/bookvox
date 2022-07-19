import { IpcRequest } from '../../../shared/IpcRequest';

export default class IpcService {
  private ipcRenderer?: any;

  public send<T>(channel: string, request: IpcRequest = {}): Promise<T> {
    // If the ipcRenderer is not available try to initialize it
    if (!this.ipcRenderer) {
      this.initializeIpcRenderer();
    }
    // If there's no responseChannel let's auto-generate it
    if (!request.responseChannel) {
      request.responseChannel = `${channel}_response_${new Date().getTime()}`;
    }

    const { ipcRenderer } = this;
    if (!ipcRenderer) return Promise.reject();

    ipcRenderer.sendMessage(channel, request);

    // This method returns a promise which will be resolved when the response has arrived.
    return new Promise((resolve) => {
      ipcRenderer.once(request.responseChannel as string, (response: T) =>
        resolve(response)
      );
    });
  }

  private initializeIpcRenderer() {
    if (!window || !window.electron) {
      throw new Error(`Unable to require renderer process`);
    }
    this.ipcRenderer = window.electron.ipcRenderer;
  }
}
