import React, { useState } from 'react';
import { Collapse, Icon } from '@blueprintjs/core';

import {
  AccordionContainer,
  AccordionHeader,
  AccordionContent,
  StyledDivider,
} from './styled';

interface AccordionItemProps {
  headerText: string;
  children: React.ReactNode;
}

const AccordionItem = ({ headerText, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <AccordionContainer>
      <AccordionHeader onClick={toggleAccordion}>
        <b>{headerText}</b>
        <Icon icon={isOpen ? 'caret-up' : 'caret-down'} />
      </AccordionHeader>
      <Collapse isOpen={isOpen}>
        <StyledDivider />
        <AccordionContent>{children}</AccordionContent>
      </Collapse>
    </AccordionContainer>
  );
};

export default AccordionItem;
