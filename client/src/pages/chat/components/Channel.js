import React, { useEffect, useState, useRef } from 'react';
import firebase from 'firebase/app';
// import { useFirestoreQuery } from '../hooks';
// Components
import Message from './Message';
import { auth } from '../../../config/firebase';
import { BiArrowFromBottom } from "react-icons/bi";

const Channel = () => {

  const db = firebase.firestore();
  const messagesRef = db.collection('messages');
  const messages = useFirestoreQuery(
    messagesRef.orderBy('createdAt').limit(25)
  );

  const [newMessage, setNewMessage] = useState('');

  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleOnChange = e => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = e => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      messagesRef.add({
        displayName: auth.currentUser.email,
        text: trimmedMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      // Clear input field
      setNewMessage('');
    }
  };

  return (
    <>
      <div className="overflow-auto h-full">
        <ul className="max-w-screen-lg mx-auto">
          {messages?.map(message => (
            <li key={message.uid}>
              <Message {...message} />
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6 mx-4">
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-row bg-gray-200 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto"
        >
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent outline-none"
          />
          <button
            type="submit"
            disabled={!newMessage}
            className="uppercase font-semibold text-sm tracking-wider text-gray-500 hover:text-gray-900 transition-colors"
          >
            < BiArrowFromBottom /> 
          </button>
        </form>
      </div>
    </>
  );
};

function useFirestoreQuery(query) {
  const [docs, setDocs] = useState([]);

  // Store current query in ref
  const queryRef = useRef(query);

  // Compare current query with the previous one
  useEffect(() => {
    // Use Firestore built-in 'isEqual' method
    // to compare queries
    if (!queryRef?.curent?.isEqual(query)) {
      queryRef.current = query;
    }
  });

  // Re-run data listener only if query has changed
  useEffect(() => {
    if (!queryRef.current) {
      return null;
    }

    // Subscribe to query with onSnapshot
    const unsubscribe = queryRef.current.onSnapshot(querySnapshot => {
      // Get all documents from collection - with IDs
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Update state
      setDocs(data);
    });

    // Detach listener
    return unsubscribe;
  }, [queryRef]);

  return docs;
}
export default Channel;