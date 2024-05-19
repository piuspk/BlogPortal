import React from 'react';
import { styled } from '@mui/material';

const Container = styled('div')({
  padding: '20px',
});

const Heading = styled('h1')({
  marginBottom: '20px',
  borderBottom: '2px solid #333',
});

const SubHeading = styled('h2')({
  marginBottom: '10px',
});

const Paragraph = styled('p')({
  marginBottom: '20px',
});

const Contact = () => {
  return (
    <Container>
      <Heading>Contact Us</Heading>
      <div>
        <SubHeading>Email:</SubHeading>
        <Paragraph>
          hello@ejyhealth.in <br />
          officialejyhealth@gmail.com
        </Paragraph>
      </div>
      <div>
        <SubHeading>Corporate Office Address:</SubHeading>
        <Paragraph>
          Room No – H, IC – IIT Patna, <br />
          801106 – India.
        </Paragraph>
      </div>
      <div>
        <SubHeading>Registered Address:</SubHeading>
        <Paragraph>
          Salah, PO – Govindganj, <br />
          Purbi Champaran, 845419 – India.
        </Paragraph>
      </div>
    </Container>
  );
};

export default Contact;
