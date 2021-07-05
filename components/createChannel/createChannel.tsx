import { FC, useContext, useState } from "react"
import styles from "~/styles/createChannel.module.scss"
import Context from "~/context/context"

interface IProps {
  handleForm: () => void
}

const CreateChannel: FC<IProps> = ({ handleForm }) => {
  const { wrapper, input, button, inputWrapper } = styles
  const ctx = useContext(Context)
  const [channelName, setChannelName] = useState("")
  const [members, setMembers] = useState([])

  const addChannel = () => {
    const db = ctx.firebase.firestore()
    db.collection("channels")
      .doc("test")
      .set({
        name: channelName,
        members,
      })
      .then(() => {
        console.log("channel added")
        handleForm()
      })
      .catch(e => console.log(e))
  }

  return (
    <div className={wrapper}>
      <label className={inputWrapper}>
        Channel name
        <input
          className={input}
          type="text"
          value={channelName}
          onChange={e => setChannelName(e.target.value)}
        />
      </label>
      <button onClick={addChannel} className={button}>
        Create channel
      </button>
    </div>
  )
}

export default CreateChannel
