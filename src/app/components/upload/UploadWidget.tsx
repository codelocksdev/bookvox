import { useRef, useState } from 'react';
import { Button } from '@blueprintjs/core';

import BookItem from '../../objects/BookItem';
import BookUploadItem from './BookUploadItem';
import AddBookDialog from './add-book-dialog/AddBookDialog';
import { UploadWidgetContainer, UploadWidgetCard, ButtonBar } from '../styled';

const UploadWidget = () => {
  const [runConvert, setRunConvert] = useState(false);
  const [bookList, setBookList] = useState<BookItem[]>([]);
  const [showWizard, setShowWizard] = useState(false);
  const numConverted = useRef(0);

  const handleConvert = () => {
    numConverted.current = 0;
    setRunConvert(true);
  };

  const handleDone = () => {
    numConverted.current += 1;
    if (numConverted.current === bookList.length) {
      setRunConvert(false);
    }
  };

  const addBook = (book: BookItem) => {
    setBookList((prevState) => [...prevState, book]);
  };

  const removeBook = (book: BookItem) => {
    setBookList((prevState) => prevState.filter((item) => item !== book));
  };

  const handleCardClick = () => {
    if (bookList.length === 0) {
      setShowWizard(true);
    }
  };

  return (
    <UploadWidgetContainer>
      <UploadWidgetCard
        onClick={handleCardClick}
        listEmpty={bookList.length === 0}
      >
        {bookList.map((book) => (
          <BookUploadItem
            key={`book-upload-item-${book.name}`}
            book={book}
            runConvert={runConvert}
            convertDone={handleDone}
            removeBook={removeBook}
          />
        ))}
        {bookList.length === 0 && (
          <>Click to add a book to the convert queue!</>
        )}
      </UploadWidgetCard>
      <ButtonBar>
        <Button
          icon={'plus'}
          text={'Add Book'}
          onClick={() => setShowWizard(true)}
          large
        />
        <Button
          icon={'refresh'}
          text={'Convert'}
          onClick={handleConvert}
          large
        />
      </ButtonBar>
      <AddBookDialog
        addBook={addBook}
        setShow={setShowWizard}
        show={showWizard}
      />
    </UploadWidgetContainer>
  );
};

export default UploadWidget;
