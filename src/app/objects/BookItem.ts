import FileItem from './FileItem';

interface BookItem {
  uuid: string;
  name: string;
  destination: string;
  files: FileItem[];
  converted: boolean;
}

export default BookItem;
