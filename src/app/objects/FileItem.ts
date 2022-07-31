import { FileInfo } from '../../shared/types/FileInfo';

class FileItem {
  private _name: string;
  private readonly _path: string;
  private _audioBase64Src: string = '';

  private constructor(name: string, path: string, audioBase64Src: string) {
    this._name = name;
    this._path = path;
    this._audioBase64Src = audioBase64Src;
  }

  public static fromFile(file: File) {
    const { name, path } = file;
    if (path === '') throw new Error('File has no path.');

    return new FileItem(name, path, '');
  }

  public static fromFileItemAndSource(file: FileItem, src: string) {
    return new FileItem(file.name, file.path, src);
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get path(): string {
    return this._path;
  }

  get audioBase64Src(): string {
    return this._audioBase64Src;
  }

  set audioBase64Src(value: string) {
    this._audioBase64Src = value;
  }

  public getInfo(): FileInfo {
    return { name: this._name, path: this._path };
  }
}

export default FileItem;
