import { Button, EditableText, Intent } from '@blueprintjs/core';
import { ListItem } from '../../styled';
import FileItem from '../../../objects/FileItem';

interface FilePreviewListItemProps {
  file: FileItem;
  isEven: boolean;
  onFileInputTextConfirm(file: FileItem, input: string): void;
  removeFile(file: FileItem): void;
}

const FilePreviewListItem = ({
  isEven,
  file,
  onFileInputTextConfirm,
  removeFile,
}: FilePreviewListItemProps) => {
  return (
    <ListItem key={`add-book-file-item-${file.path}`} isEven={isEven}>
      <EditableText
        defaultValue={file.name.replace('.txt', '')}
        onConfirm={(input) => onFileInputTextConfirm(file, input)}
      />
      <Button
        icon={'trash'}
        onClick={() => removeFile(file)}
        intent={Intent.DANGER}
        minimal
      />
    </ListItem>
  );
};

export default FilePreviewListItem;
