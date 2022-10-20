import React, { useEffect, useState, useRef } from "react";
import ChatBox from "../../Components/ChatBox/ChatBox";
import Conversation from "../../Components/Conversation/Conversation";
import LogoSearch from "../../Components/LogoSearch/LogoSearch";
import "./Chat.css";
import { userChats } from "../../api/ChatRequest";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UilSetting } from "@iconscout/react-unicons";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  console.log(user);
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const [listChat, setListChat] = useState(true);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  useEffect(() => {
    // https://social-mediapp-socket.herokuapp.com/
    socket.current = io("https://social-mediapp-socket.herokuapp.com");
    // socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      // console.log(onlineUsers);
    });
  }, [user]);

  //sending message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  //receive Message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setRecieveMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  const handleclick = () => {
    setListChat((prev) => !prev);
    console.log(listChat);
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <button
            className={
              listChat ? "button fc-button UnfollowButton" : "button fc-button"
            }
            onClick={handleclick}
          >
            {listChat ? "Close list chat" : "Open list chat"}
          </button>
          {listChat && (
            <div className="Chat-list">
              {chats.map((chat, id) => (
                <div
                  key={id}
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                >
                  <Conversation
                    data={chat}
                    currentUserId={user._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Right Side */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <div className="navIcons">
            <Link to="../home">
              <img src={Home} alt="" />
            </Link>
            <UilSetting />
            <img src={Noti} alt="" />
            <Link to="../chat">
              <img src={Comment} alt="" />
            </Link>
          </div>
        </div>{" "}
        {/* chat body */}
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          recieveMessage={recieveMessage}
        />
      </div>
    </div>
  );
};

export default Chat;

// import React, { useRef, useState } from "react";
// import ChatBox from "../../Components/ChatBox/ChatBox";
// import Conversation from "../../Components/Conversation/Conversation";
// import LogoSearch from "../../Components/LogoSearch/LogoSearch";
// // import NavIcons from "../../Components/NavIcons/NavIcons";
// import "./Chat.css";
// import { useEffect } from "react";
// import { userChats } from "../../api/ChatRequest";
// import { useDispatch, useSelector } from "react-redux";
// import { io } from "socket.io-client";

// const Chat = () => {
//   const dispatch = useDispatch();
//   const socket = useRef();
//   const { user } = useSelector((state) => state.authReducer.authData);

//   const [chats, setChats] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [sendMessage, setSendMessage] = useState(null);
//   const [receivedMessage, setReceivedMessage] = useState(null);
//   // Get the chat in chat section
//   useEffect(() => {
//     const getChats = async () => {
//       try {
//         const { data } = await userChats(user._id);
//         setChats(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getChats();
//   }, [user._id]);

//   // Connect to Socket.io
//   useEffect(() => {
//     socket.current = io("ws://localhost:8801");
//     socket.current.emit("new-user-add", user._id);
//     socket.current.on("get-users", (users) => {
//       setOnlineUsers(users);
//     });
//   }, [user]);

//   // Send Message to socket server
//   useEffect(() => {
//     if (sendMessage !== null) {
//       socket.current.emit("send-message", sendMessage);
//     }
//   }, [sendMessage]);

//   // Get the message from socket server
//   useEffect(() => {
//     socket.current.on("recieve-message", (data) => {
//       console.log(data);
//       setReceivedMessage(data);
//     });
//   }, []);

//   const checkOnlineStatus = (chat) => {
//     const chatMember = chat.members.find((member) => member !== user._id);
//     const online = onlineUsers.find((user) => user.userId === chatMember);
//     return online ? true : false;
//   };

//   return (
//     <div className="Chat">
//       {/* Left Side */}
//       <div className="Left-side-chat">
//         <LogoSearch />
//         <div className="Chat-container">
//           <h2>Chats</h2>
//           <div className="Chat-list">
//             {chats.map((chat) => (
//               <div
//                 onClick={() => {
//                   setCurrentChat(chat);
//                 }}
//               >
//                 <Conversation
//                   data={chat}
//                   currentUser={user._id}
//                   online={checkOnlineStatus(chat)}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Right Side */}

//       <div className="Right-side-chat">
//         <div style={{ width: "20rem", alignSelf: "flex-end" }}>
//           {/* <NavIcons /> */}
//         </div>
//         <ChatBox
//           chat={currentChat}
//           currentUser={user._id}
//           setSendMessage={setSendMessage}
//           receivedMessage={receivedMessage}
//         />
//       </div>
//     </div>
//   );
// };

// export default Chat;
