import styled from "styled-components"

interface IProps {
  size: string
}
interface IContainerProps {
  currentTheme: string
}

export const StyledContainer = styled.header<IContainerProps>`
  align-items: center;
  background-color: ${({ theme, currentTheme }) =>
    currentTheme ? theme.dark.background : theme.light.background};
  display: flex;
  height: 80px;
  justify-content: flex-end;
  padding: 0 5vw;
  width: 100%;
`
export const StyledModeButton = styled.button<IProps>`
  align-items: center;
  background-color: transparent;
  display: flex;
  justify-content: center;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`
export const StyledIcon = styled.img``
