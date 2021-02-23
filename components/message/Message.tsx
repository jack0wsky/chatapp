import styled from "styled-components"

interface iProps {
  isUser: string
}

const StyledContainer = styled.div<iProps>`
  background-color: #18b5ff;
  display: flex;
  flex-flow: column;
  align-self: ${({ isUser }) =>
    isUser === "Jack" ? "flex-end" : "flex-start"};
  height: max-content;
  padding: 10px;
  min-height: 50px;
  width: auto;
  min-width: 10vw;
  max-width: 20vw;
`

const StyledMessage = styled.p`
  color: #fff;
`
const StyledUser = styled.p`
  color: #fff;
  margin: 0 0 10px;
`

const Message = ({ message, user, isUser }) => {
  return (
    <StyledContainer isUser={isUser}>
      <StyledUser>{user}</StyledUser>
      <StyledMessage>{message}</StyledMessage>
    </StyledContainer>
  )
}

export default Message
