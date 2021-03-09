import styled from "styled-components"

type StyledProps = {
  toggle: boolean
}

type Props = {
  handleSideMenu: () => any
  toggleSideMenu: boolean
}

const StyledContainer = styled.section<StyledProps>`
  background-color: ${({ theme }) => theme.dark.lightBg};
  grid-area: side-menu;
  height: 100%;
  width: 100%;
`
const StyledToggleButton = styled.button`
  height: 40px;
  width: 40px;
`

const SideMenu = ({ handleSideMenu, toggleSideMenu }: Props) => {
  return (
    <StyledContainer toggle={toggleSideMenu}>
      <StyledToggleButton onClick={handleSideMenu} />
    </StyledContainer>
  )
}

export default SideMenu
