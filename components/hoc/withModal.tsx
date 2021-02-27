import styled from "styled-components"

const StyledModalWrapper = styled.div`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

const Modal = ({ children }) => {
  return <StyledModalWrapper>{children}</StyledModalWrapper>
}

export default Modal
