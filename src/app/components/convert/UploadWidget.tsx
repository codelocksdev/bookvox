import { useMemo, useState } from 'react';
import { Button } from '@blueprintjs/core';

import { BookItem } from '../../objects/BookItem';
import AddBookDialog from './add-book-dialog/AddBookDialog';
import {
  ButtonBar,
  Label,
  UploadWidgetCard,
  UploadWidgetContainer,
} from '../styled';
import {
  useAppDispatch,
  useAppSelector,
} from '../../common/state/typedReduxMethods';
import ControlledBookItem from './ControlledBookItem';
import { convertQueue } from '../../common/state/thunks';

const UploadWidget = () => {
  const dispatch = useAppDispatch();
  const { bookList } = useAppSelector((state) => state.library);
  const bookItems = useMemo<BookItem[]>(
    () => Object.values(bookList),
    [bookList]
  );
  const [showWizard, setShowWizard] = useState(false);
  const listEmpty = useMemo(() => bookItems.length === 0, [bookItems]);

  const handleConvert = () => {
    dispatch(convertQueue());
  };

  const handleCardClick = () => {
    if (listEmpty) {
      setShowWizard(true);
    }
  };

  return (
    <UploadWidgetContainer>
      <Label>Book Queue</Label>
      <UploadWidgetCard onClick={handleCardClick} listEmpty={listEmpty}>
        {bookItems.map((book) => (
          <ControlledBookItem
            key={`book-upload-item-${book.name}`}
            book={book}
          />
        ))}
        {listEmpty && <>Click to add a book to the conversion queue!</>}
        <ButtonBar center={listEmpty}>
          <Button
            icon={'plus'}
            text={'Add Book'}
            onClick={() => setShowWizard(true)}
            large
            minimal
          />
        </ButtonBar>
      </UploadWidgetCard>
      <ButtonBar>
        <Button
          icon={'refresh'}
          text={'Convert All'}
          onClick={handleConvert}
          large
        />
      </ButtonBar>
      <AddBookDialog setShow={setShowWizard} show={showWizard} />
    </UploadWidgetContainer>
  );
};

export default UploadWidget;
