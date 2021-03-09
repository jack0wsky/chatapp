import { useRouter } from "next/router"
import styled from "styled-components"

type Props = {
  welcome: string
  theme: boolean
  chatStatus: string
}

type StyledProps = {
  themeStatus: boolean
}

const StyledWrapper = styled.div`
  background-color: ${({ theme }) => theme.dark.background};
  box-shadow: 0 11.4px 10px rgba(0, 0, 0, 0.035),
    0 91px 80px rgba(0, 0, 0, 0.07);
  align-items: center;
  display: flex;
  grid-area: header;
  height: 80px;
  justify-content: space-between;
  padding: 0 5vw;
  width: 100%;
`
const StyledName = styled.h2<StyledProps>`
  color: ${({ theme, themeStatus }) =>
    themeStatus ? theme.dark.text : theme.light.text};
  font-size: 2em;
`
const StyledStatus = styled.p<StyledProps>`
  color: ${({ theme, themeStatus }) =>
    themeStatus ? theme.dark.text : theme.light.text};
`
const StyledReturnLink = styled.button`
  border-radius: 50%;
  height: 50px;
  margin: 0 20px 0 0;
  width: 50px;
`

const ChatHeader = ({ welcome, theme: themeStatus, chatStatus }: Props) => {
  const { push } = useRouter()

  const handleReturn = () => {
    push("/dashboard")
  }
  return (
    <StyledWrapper>
      <StyledReturnLink onClick={handleReturn} />
      <StyledName themeStatus={themeStatus}>{welcome}</StyledName>
      <StyledStatus themeStatus={themeStatus}>{chatStatus}</StyledStatus>
    </StyledWrapper>
  )
}

export default ChatHeader
