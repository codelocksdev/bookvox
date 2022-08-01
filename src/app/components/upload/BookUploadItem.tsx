import { useMemo } from 'react';
import styled from 'styled-components';
import { Button, EditableText, Icon, Intent, Spinner } from '@blueprintjs/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

import FileUploadItem from './FileUploadItem';
import useBook from '../../hooks/useBook';
import { BookUploadItemProps } from './BookUploadItemProps';
import FileItem from '../../objects/FileItem';
import {
  BookUploadContainer,
  SideColumn,
  MiddleColumn,
  FlexRow,
} from '../styled';

const FileContainer = styled(PerfectScrollbar)`
  border-radius: 8px;
  background-color: #1c2127;
  box-shadow: inset 0 3px 10px rgb(0 0 0 / 0.1);
  overflow: hidden;
  max-height: 200px;
`;

const getIcon = (processing: boolean, converted: boolean) => {
  if (converted) return <Icon icon={'tick'} intent={Intent.SUCCESS} />;
  return processing ? <Spinner /> : <Icon icon={'square'} />;
};

const BookUploadItem = (props: BookUploadItemProps) => {
  const {
    book: { files, destination },
    removeBook,
  } = props;
  const { sources, processing, bookName, setName, converted, convert, book } =
    useBook(props);
  const fileItems = useMemo(
    () =>
      files.map((file, index) => (
        <FileUploadItem
          file={FileItem.fromFileItemAndSource(file, sources[index])}
          index={index}
        />
      )),
    [files, sources]
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
              defaultValue={bookName}
              onConfirm={setName}
            />
          </h2>
        </FlexRow>
        <FlexRow>
          <b>Save location:</b>
          {`${destination}${bookName}`}
        </FlexRow>
        <FileContainer>{fileItems}</FileContainer>
      </MiddleColumn>
      <SideColumn>
        <Button icon={'refresh'} minimal onClick={convert} />
        <Button
          icon={'trash'}
          intent={Intent.DANGER}
          minimal
          onClick={() => removeBook(book)}
        />
      </SideColumn>
    </BookUploadContainer>
  );
};

export default BookUploadItem;
