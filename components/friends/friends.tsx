import styled from "styled-components"
import React from "react"
import { RoomName, StyledRoom, StyledRoomImage } from "@/pages/dashboard"
import { StyledTitle } from "@/pages/chat/[slug]"

const StyledContainer = styled.section<StyledProps>`
  align-items: center;
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: repeat(${({ arrayLength }) => arrayLength}, 100px);
  height: 100px;
  margin: 30px 0;
  width: 50%;
`

type Props = {
  friends: any
  themeState: boolean
}
type StyledProps = {
  arrayLength: number
}

const Friends = ({ friends, themeState }: Props) => {
  return (
    <StyledContainer arrayLength={friends.length}>
      {friends.map(({ name }) => {
        return (
          <StyledRoom key={name}>
            <StyledRoomImage />
            <RoomName themeState={themeState}>{name}</RoomName>
          </StyledRoom>
        )
      })}
    </StyledContainer>
  )
}

export default Friends
