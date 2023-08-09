

function Conversation({room} : any) {
  return (
    <div className="item"
      onClick={()=>{
        //join(room.roomId);
        //setUser(room?.roomName);
      }}
    >
        <div className="conversation">
            <div className="userNick">{room.roomName?room.roomName : "Pokój usunięty" }</div>
            <div className="messageText">{room.lastMessage!==null?room.lastMessage: "Brak wiadomości" }</div>
        </div>
    </div>
  )
}

export default Conversation