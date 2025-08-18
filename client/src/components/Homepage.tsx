import React from 'react'
import Sidebar from '../home/sidebar/Sidebar';
import ChatWindow from '../home/window/Windox';

const Homepage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar></Sidebar>
      <ChatWindow></ChatWindow>
    </div>
  );
}

export default Homepage
