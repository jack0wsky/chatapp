import styled from "styled-components"
import { motion } from "framer-motion"

const StyledWrapper = styled.section`
  background-color: transparent;
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  top: 0;
  left: 0;
  transform: translateX(50%);
  position: absolute;
  width: 50%;
`
const StyledContainer = styled.div`
  background-color: #ddd;
  border-radius: 10px;
  height: 100px;
  padding: 30px;
  width: 100%;
`
const StyledName = styled.h4``

type Props = {
  toggleModal: boolean
  closeModal: () => void
}

const CreateRoom: ({ toggleModal, closeModal }: Props) => JSX.Element = ({
  toggleModal,
  closeModal,
}: Props) => {
  const variants = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0 },
  }
  return (
    <StyledWrapper>
      <motion.div animate={toggleModal ? "open" : "closed"} variants={variants}>
        <StyledContainer>
          <StyledName>Create Chat</StyledName>
          <button onClick={closeModal}>close</button>
        </StyledContainer>
      </motion.div>
    </StyledWrapper>
  )
}

export default CreateRoom
