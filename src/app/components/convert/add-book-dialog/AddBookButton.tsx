import { Tooltip2 } from '@blueprintjs/popover2';

import { FullWidthButton } from '../../styled';

interface AddBookButtonProps {
  allowAdd: boolean;
  addBook(): void;
}

const AddBookButton = ({ allowAdd, addBook }: AddBookButtonProps) => {
  return (
    <Tooltip2
      content={
        'You must enter a book name and add at least one chapter file to add a book.'
      }
      disabled={allowAdd}
      placement={'bottom-end'}
    >
      <FullWidthButton
        icon={'tick'}
        text={'Add Book'}
        onClick={addBook}
        disabled={!allowAdd}
        large
      />
    </Tooltip2>
  );
};

export default AddBookButton;
