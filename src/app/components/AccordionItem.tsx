import React, { useState } from 'react';
import { Card, Collapse, Divider, Icon } from '@blueprintjs/core';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  width: 100%;
  padding: 0;
  margin-top: 16px;
  margin-bottom: 16px;
`;

const Header = styled.div`
  cursor: pointer;
  color: #8abbff;
  font-weight: 400;
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;

const StyledContent = styled.div`
  padding: 16px;
`;

const StyledDivider = styled(Divider)`
  margin-left: 16px;
  margin-right: 16px;
`;

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
    <StyledCard>
      <Header onClick={toggleAccordion}>
        <b>{headerText}</b>
        <Icon icon={isOpen ? 'caret-up' : 'caret-down'} />
      </Header>
      <Collapse isOpen={isOpen}>
        <StyledDivider />
        <StyledContent>{children}</StyledContent>
      </Collapse>
    </StyledCard>
  );
};

export default AccordionItem;
