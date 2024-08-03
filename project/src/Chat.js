import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdChatBubble } from "react-icons/md";
import { LuSendHorizonal } from "react-icons/lu";
const Chatbot = () => {
    const [open, setOpen] = useState(false);

    const toggleChat = () => {
        setOpen(!open);
    };

    return (
        <div>
            {!open && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        backgroundColor: 'black',
                        color: '#fff',
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        fontSize: '24px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                    }}
                    onClick={toggleChat}
                >
                    <MdChatBubble />
                </div>
            )}

            {open && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        width: '320px',
                        maxHeight: '400px',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        fontFamily: 'Arial, Helvetica, sans-serif'
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'black',
                            color: 'white',
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Yaska Support</span>
                        <AiOutlineClose
                            style={{ cursor: 'pointer', fontSize: '20px' }}
                            onClick={toggleChat}
                        />
                    </div>

                    <div
                        style={{
                            flex: 1,
                            padding: '10px',
                            overflowY: 'auto',
                            backgroundColor: '#f5f8fb'
                        }}
                    >
                        {/* Admin message */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                marginBottom: '10px'
                            }}
                        >
                            <div>
                                <div style={{ fontSize: '12px', marginBottom: '2px', color: 'black' }}>Admin</div>
                                <div
                                    style={{
                                        backgroundColor: 'grey',
                                        color: 'white',
                                        padding: '10px',
                                        borderRadius: '12px',
                                        maxWidth: '80%',
                                        wordWrap: 'break-word',
                                        fontSize: '14px'
                                    }}
                                >
                                    Hi! Do you need some help?
                                </div>
                            </div>
                        </div>

                        {/* User message */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                marginBottom: '10px',
                                marginLeft: 'auto',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <div>
                                <div style={{ fontSize: '12px', marginBottom: '2px', textAlign: 'right', color: '#333' }}>User</div>
                                <div
                                    style={{
                                        backgroundColor: 'lightblue',
                                        color: 'white',
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        width: 'fit-content',
                                    }}
                                >
                                    Yes
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            borderTop: '1px solid #ccc',
                            padding: '10px',
                            backgroundColor: '#fff'
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Type the message ..."
                            style={{
                                flex: 1,
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '20px',
                                marginRight: '10px',
                                outline: 'none'
                            }}
                        />
                        <button
                            style={{
                                backgroundColor: '#6a1b9a',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px'
                            }}
                        >
                            <LuSendHorizonal /> {/* Replace text with icon */}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
