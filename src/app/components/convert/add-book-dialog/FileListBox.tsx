import FileItem from '../../../objects/FileItem';
import { ListBox } from '../../styled';
import FilePreviewListItem from './FilePreviewListItem';

interface FileListBoxProps {
  files: FileItem[];
  onFileInputTextConfirm(file: FileItem, input: string): void;
  removeFile(file: FileItem): void;
}

const FileListBox = (props: FileListBoxProps) => {
  const { files } = props;
  return (
    <ListBox>
      {files.map((file, index) => (
        <FilePreviewListItem file={file} isEven={index % 2 === 0} {...props} />
      ))}
    </ListBox>
  );
};

export default FileListBox;
