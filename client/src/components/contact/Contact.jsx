import React from 'react';
import { styled } from '@mui/material';

const Container = styled('div')({
  padding: '20px',
  backgroundColor: 'transparent',
  fontFamily: 'Arial, sans-serif',
  color: '#fff',
});

const Heading = styled('h1')({
  marginBottom: '20px',
  borderBottom: '2px solid #fff',
  paddingBottom: '10px',
  fontSize: '36px',
  textAlign: 'center',
});

const SubHeading = styled('h2')({
  marginBottom: '10px',
  fontSize: '24px',
  textAlign: 'center',
  fontStyle: 'italic',
});

const Paragraph = styled('p')({
  marginBottom: '20px',
  fontSize: '18px',
  lineHeight: '1.5',
  fontStyle: 'italic',
});

const LinkContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  flexWrap: 'wrap',
});

const StyledLink = styled('a')({
  color: '#fff',
  textDecoration: 'none',
  fontStyle: 'italic',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
});

const Contact = () => {
  return (
    <Container>
      <Heading>Contact Me</Heading>
      <div>
        <SubHeading>📧 Piyush Kumar</SubHeading>
        <Paragraph>
          Email: <br /> 2021csb1123@iitrpr.ac.in <br />
          Personal Email: <br /> kumarchspiyush@gmail.com
        </Paragraph>
      </div>
      <div>
        <SubHeading>🎓 Education</SubHeading>
        <Paragraph>
          Pursuing B.Tech Degree in Computer Science and Engineering (2021-25) <br />
          Indian Institute Of Technology, Ropar
        </Paragraph>
      </div>
      <div>
        <SubHeading>🌐 Online Profiles</SubHeading>
        <LinkContainer>
          <StyledLink href="https://codeforces.com/profile/yourprofile">
            <span>💻</span> Codeforces
          </StyledLink>
          <StyledLink href="https://www.codechef.com/users/yourprofile">
            <span>👨‍🍳</span> Codechef
          </StyledLink>
          <StyledLink href="https://linkedin.com/in/yourprofile">
            <span>🔗</span> LinkedIn
          </StyledLink>
          <StyledLink href="https://yourwebsite.com">
            <span>🌐</span> myWEBSITE
          </StyledLink>
        </LinkContainer>
      </div>
    </Container>
  );
};

export default Contact;
