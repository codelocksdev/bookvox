import styled from 'styled-components';
import { Button } from '@blueprintjs/core';
import { useRef, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import BookItem from '../../objects/BookItem';
import BookUploadItem from './BookUploadItem';
import AddBookWizard from './AddBookWizard';

const Container = styled.div`
  margin: auto;
  padding: 32px;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  gap: 8px;
`;

const StyledCard = styled(PerfectScrollbar)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  border-color: #abb3bf;
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  padding: 16px;
`;

const ButtonBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 16px;
`;

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

  return (
    <Container>
      <StyledCard>
        {bookList.map((book) => (
          <BookUploadItem
            book={book}
            runConvert={runConvert}
            convertDone={handleDone}
          />
        ))}
      </StyledCard>
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
      <AddBookWizard
        addBook={addBook}
        setShow={setShowWizard}
        show={showWizard}
      />
    </Container>
  );
};

export default UploadWidget;
