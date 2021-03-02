import {
  StyledContainer,
  StyledModeButton,
  StyledIcon,
} from "@/components/header/header.styled"
import withThemeContext from "@/context/themeContext"

const Header = ({ handleTheme, state: { light } }) => {
  return (
    <StyledContainer currentTheme={light}>
      <StyledModeButton onClick={handleTheme} size="50px">
        {light ? (
          <StyledIcon src="/sun-light.svg" alt="dark mode icon" />
        ) : (
          <StyledIcon src="/half-moon.svg" alt="light mode icon" />
        )}
      </StyledModeButton>
    </StyledContainer>
  )
}

export default withThemeContext(Header)
