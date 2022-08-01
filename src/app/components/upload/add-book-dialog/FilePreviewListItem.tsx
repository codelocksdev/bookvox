import { Button, EditableText, Intent } from '@blueprintjs/core';
import { ListItem } from '../../styled';
import FileItem from '../../../objects/FileItem';

interface FilePreviewListItemProps {
  file: FileItem;
  isEven: boolean;
  onTextConfirm(file: FileItem, input: string): void;
  remove(file: FileItem): void;
}

const FilePreviewListItem = ({
  isEven,
  file,
  onTextConfirm,
  remove,
}: FilePreviewListItemProps) => {
  return (
    <ListItem key={`add-book-file-item-${file.path}`} isEven={isEven}>
      <EditableText
        defaultValue={file.name.replace('.txt', '')}
        onConfirm={(input) => onTextConfirm(file, input)}
      />
      <Button
        icon={'trash'}
        onClick={() => remove(file)}
        intent={Intent.DANGER}
        minimal
      />
    </ListItem>
  );
};

export default FilePreviewListItem;
