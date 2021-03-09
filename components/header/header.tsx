import {
  StyledContainer,
  StyledModeButton,
  StyledIcon,
} from "@/components/header/header.styled"
import withThemeContext from "@/context/themeContext"

const Header = ({ handleTheme, state }) => {
  return (
    <StyledContainer currentTheme={state}>
      <StyledModeButton onClick={handleTheme} size="50px">
        {state ? (
          <StyledIcon src="/sun-light.svg" alt="dark mode icon" />
        ) : (
          <StyledIcon src="/half-moon.svg" alt="light mode icon" />
        )}
      </StyledModeButton>
    </StyledContainer>
  )
}

export default withThemeContext(Header)
