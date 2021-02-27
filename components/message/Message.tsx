import styled from "styled-components"
import { is } from "@babel/types"

interface iProps {
  isUser: string
}

const StyledContainer = styled.div<iProps>`
  align-items: flex-end;
  background-color: transparent;
  display: flex;
  flex-flow: ${({ isUser }) => !isUser && "row-reverse"};
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  height: max-content;
  padding: 10px;
  min-height: 50px;
  width: auto;
  min-width: 30px;
`
const StyledMessageContainer = styled.div`
  display: flex;
  flex-flow: column;
  height: auto;
  width: auto;
`

const StyledMessage = styled.p`
  background-color: blue;
  border-radius: 50px;
  color: #fff;
  height: max-content;
  padding: 10px 20px;
  min-width: 20px;
  max-width: 85ch;
  width: max-content;
`
const StyledUser = styled.p<iProps>`
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  display: flex;
  color: #a4a4a4;
  font-size: 0.7em;
  margin: ${({ isUser }) => (isUser ? "0 15px 5px 0" : "0 0 5px 15px")};
`
const StyledUserImg = styled.div<iProps>`
  display: flex;
  background-color: #ddd;
  border-radius: 50px;
  margin: ${({ isUser }) => (isUser ? "0 0 0 10px" : "0 10px 0 0")};
  width: 24px;
  height: 24px;
`

const Message = ({ message, user, isUser }) => {
  return (
    <StyledContainer isUser={isUser}>
      <StyledMessageContainer>
        <StyledUser isUser={isUser}>{user}</StyledUser>
        <StyledMessage>{message}</StyledMessage>
      </StyledMessageContainer>
      <StyledUserImg isUser={isUser} />
    </StyledContainer>
  )
}

export default Message
