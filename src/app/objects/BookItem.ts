import FileItem from './FileItem';

export interface BookItem {
  uuid: string;
  name: string;
  files: Map<string, FileItem>;
  processing: boolean;
  converted: boolean;
  processingError?: string;
}

export interface BookItemFields {
  [key: string]: string | boolean | Map<string, FileItem>;
}
