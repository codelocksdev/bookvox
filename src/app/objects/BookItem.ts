import FileItem from './FileItem';

interface BookItem {
  name: string;
  destination: string;
  files: FileItem[];
}

export default BookItem;
