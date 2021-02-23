import styled from "styled-components"
import React from "react"

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: auto;
  max-width: 300px;
  width: auto;
`
const StyledLabel = styled.label`
  margin: 0 0 5px 10px;
`

const StyledInput = styled.input`
  border: none;
  border-radius: 8px;
  font-size: 1em;
  padding: 10px;

  &:focus {
    outline: none;
  }
`

interface Props {
  label: string
  value: string
  type: string
  name: string
  onChange: () => any
}

const Input: React.FC<Props> = ({ label, value, type, name, onChange }) => {
  return (
    <StyledWrapper>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput
        value={value}
        type={type}
        name={name}
        id={name}
        onChange={e => onChange(e)}
      />
    </StyledWrapper>
  )
}

export default Input
