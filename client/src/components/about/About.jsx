import React from 'react';
import { styled } from '@mui/material';

const Container = styled('div')({
  padding: '20px',
});

const Heading = styled('h1')({
  fontSize: '36px',
  marginBottom: '20px',
  borderBottom: '2px solid #333',
});

const SubHeading = styled('h2')({
  fontSize: '24px',
  marginBottom: '10px',
  color: '#333',
});

const Paragraph = styled('p')({
  fontSize: '18px',
  marginBottom: '20px',
  lineHeight: '1.5',
});

const Description = styled('p')({
  fontSize: '20px',
  marginBottom: '20px',
});

const Image = styled('img')({
  width: '100%',
  height: 'auto',
  marginBottom: '20px',
  maxWidth: '600px',
});

const About = () => {
  return (
    <Container>
      <Heading>About Us</Heading>
      <Paragraph>
        <strong>EJY Health (Easy Journey of Your Health)</strong>
      </Paragraph>
      <Paragraph>
        Building an AI-powered world’s most verified & gamified health networking platform. We believe that access to reliable health information should not be a privilege, but a right, that is accessible with just one click.
      </Paragraph>
      <SubHeading>Our Supporters</SubHeading>
      <Paragraph>
        EJY Health is establishing a global platform where doctors, nurses, patients, and the general public can seamlessly interact and benefit from one another’s expertise. We’re addressing gaps in the Health & wellness industry on a large scale, connecting people from diverse backgrounds and professions to foster collective growth and learning.
      </Paragraph>
      <Paragraph>
        EJY Health envisions a world where credible health information is universally accessible. We’re more than an information hub – we’re a community-driven movement. Our platform is a journey toward informed well-being, where health education becomes a shared endeavor and empowerment through knowledge leads to healthier lives.
      </Paragraph>
      <SubHeading>Vision And Mission</SubHeading>
      <Paragraph>
        Add your vision and mission statement here.
      </Paragraph>
      <Description>
        EJY Health is a leading healthcare provider committed to delivering high-quality medical services to its patients. With state-of-the-art facilities and a team of experienced healthcare professionals, we strive to promote health and wellness in the communities we serve.
      </Description>
      <Image src="https://ejyhealth.in/wp-content/uploads/2023/10/pexels-anna-shvets-3683040-683x1024.jpg" alt="EJY Health" />
      <Description>
        Our facilities include:
        <ul>
          <li>Advanced diagnostic services</li>
          <li>Specialized treatment units</li>
          <li>24/7 emergency care</li>
          <li>Rehabilitation services</li>
          <li>Wellness programs</li>
        </ul>
      </Description>
    </Container>
  );
};

export default About;
