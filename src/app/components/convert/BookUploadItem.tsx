import { useMemo } from 'react';
import { Button, EditableText, Icon, Intent, Spinner } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';

import FileUploadItem from './FileUploadItem';
import { BookUploadItemProps } from './BookUploadItemProps';
import {
  BookUploadContainer,
  FileContainer,
  FlexRow,
  MiddleColumn,
  SideColumn,
} from '../styled';
import useOutputInfo from '../../hooks/useOutputInfo';

const getIcon = (processing: boolean, converted: boolean) => {
  if (converted) return <Icon icon={'tick'} intent={Intent.SUCCESS} />;
  return processing ? (
    <Tooltip2
      content={'AWS Polly is processing this book. This may take some time.'}
    >
      <Spinner />
    </Tooltip2>
  ) : null;
};

const BookUploadItem = ({
  book,
  convert,
  update,
  remove,
}: BookUploadItemProps) => {
  const { name, files, processing, converted } = book;

  const destination = useOutputInfo(name);
  const fileItems = useMemo(
    () =>
      Array.from(files.values()).map((file, index) => (
        <FileUploadItem file={file} index={index} />
      )),
    [files]
  );
  const indicator = useMemo(
    () => getIcon(processing, converted),
    [processing, converted]
  );

  return (
    <BookUploadContainer>
      <SideColumn>{indicator}</SideColumn>
      <MiddleColumn>
        <FlexRow>
          <h2>
            <EditableText
              placeholder={'Book name...'}
              defaultValue={name}
              onConfirm={(input) => update({ name: input })}
            />
          </h2>
        </FlexRow>
        <FlexRow>
          <b>Save location:</b>
          {destination}
        </FlexRow>
        <FileContainer>{fileItems}</FileContainer>
      </MiddleColumn>
      <SideColumn>
        <Tooltip2 content={'Convert this book.'}>
          <Button icon={'refresh'} minimal onClick={convert} />
        </Tooltip2>
        <Tooltip2 content={'Remove this book from queue.'}>
          <Button
            icon={'trash'}
            intent={Intent.DANGER}
            minimal
            onClick={remove}
          />
        </Tooltip2>
      </SideColumn>
    </BookUploadContainer>
  );
};

export default BookUploadItem;
