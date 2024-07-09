import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  height: 100vh;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
`;

const LinkItem = styled.a`
  display: block;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  color: #0073e6;
  text-align: center;
  border: 1px solid #0073e6;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #0073e6;
    color: #fff;
  }
`;

export const Home = () => {
  return (
    <Container>
      <Title>Home here, hi there</Title>
      <LinkList>
        <LinkItem href="/course">Add course</LinkItem>
        <LinkItem href="/addEmployee">Add employee</LinkItem>
        <LinkItem href="/addCourseType">Add course type</LinkItem>
        <LinkItem href="/addLocation">Add location</LinkItem>
        <LinkItem href="/addBooking">Add Booking</LinkItem>
        <LinkItem href="/addCourseFee">Add Course Fee</LinkItem>
        <LinkItem href="/addInvoice">Add Invoice</LinkItem>
        <LinkItem href="/addRegistration">Add Registration</LinkItem>
        <LinkItem href="/addPayment">Add Payment method</LinkItem>
      </LinkList>
    </Container>
  );
};
