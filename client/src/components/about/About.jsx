import React from 'react';
import { styled } from '@mui/material';

const Container = styled('div')({
  padding: '20px',
  backgroundColor: 'transparent',
  fontFamily: 'Arial, sans-serif',
});

const Heading = styled('h1')({
  fontSize: '36px',
  marginBottom: '20px',
  borderBottom: '2px solid #fff',
  paddingBottom: '10px',
  color: '#fff',
  textAlign: 'center',
  fontStyle: 'italic',
});

const SubHeading = styled('h2')({
  fontSize: '24px',
  marginBottom: '10px',
  color: '#fff',
  textAlign: 'center',
  fontStyle: 'italic',
});

const Paragraph = styled('p')({
  fontSize: '18px',
  marginBottom: '20px',
  lineHeight: '1.5',
  color: '#fff',
  fontStyle: 'italic',
});

const SkillList = styled('ul')({
  listStyleType: 'none',
  padding: '0',
  fontSize: '18px',
  color: '#fff',
});

const SkillItem = styled('li')({
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  fontStyle: 'italic',
});

const SkillIcon = styled('span')({
  fontSize: '24px',
  marginRight: '10px',
  color: '#fff',
});

const About = () => {
  return (
    <Container>
      <Heading>About Me</Heading>
      <SubHeading>My Skills</SubHeading>
      <Paragraph>
        I am proficient in web development, with a strong command over MERN and Next.js frameworks. Additionally, I have a solid understanding of the C++ programming language, which I have utilized to solve competitive programming problems. My knowledge extends to data structures and algorithms, including but not limited to graphs and linked lists, enabling me to tackle real-world problems effectively. Furthermore, I have honed my skills in graphic design, mastering tools such as Adobe Photoshop and Lightroom.
      </Paragraph>
      <SkillList>
        <SkillItem><SkillIcon>💻</SkillIcon>Web Development: MERN, Next.js</SkillItem>
        <SkillItem><SkillIcon>🔧</SkillIcon>Programming Languages: C++</SkillItem>
        <SkillItem><SkillIcon>📊</SkillIcon>Data Structures & Algorithms: Graphs, Linked Lists, Arrays, etc</SkillItem>
        <SkillItem><SkillIcon>🎨</SkillIcon>Graphic Design: Adobe Photoshop, Lightroom</SkillItem>
      </SkillList>
    </Container>
  );
};

export default About;
