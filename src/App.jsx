import Header from './components/Header'
import initialEmails from './data/emails'
import { useState } from 'react'

import './styles/App.css'

function App() {
const [emails, setEmails] = useState(initialEmails);
const [hideRead, setHideRead] = useState(false);
const [unreadEmails, setUnreadEmails] = useState(() => {const unreadEmails = initialEmails.filter((email) => email.read === false); return unreadEmails});

  const toggleRead = (id) => {
    const updatedEmails = emails.map((email) => 
      email.id === id ? { ...email, read: !email.read } : email
    );
    setEmails(updatedEmails);
  }

  const toggleStarred = (id) => {
    const updatedEmails = emails.map((email) => 
      email.id === id ? { ...email, starred: !email.starred } : email
    );
    setEmails(updatedEmails);
  }

  const toggleHideReadCheckbox = () => {
    if (hideRead === true) {
      const unreadEmails = getUnreadEmails();
      setUnreadEmails(unreadEmails);
    } 
    setHideRead(!hideRead);
  }

  const getUnreadEmails = () => {
    return emails.filter((email) => email.read === false);
  } 

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              onChange={toggleHideReadCheckbox}
            />
          </li>
          
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {hideRead === false ?
          emails.map((email) => (
            <EmailItem
              key={email.id}
              email={email}
              toggleRead={() => toggleRead(email.id)}
              toggleStarred={() => toggleStarred(email.id)}
            />
          )) : 
          unreadEmails.map((email) => (
            <EmailItem
              key={email.id}
              email={email}
              toggleRead={() => toggleRead(email.id)}
              toggleStarred={() => toggleStarred(email.id)}
            />
          ))}
        </ul>
      </main>
    </div>
  )
}

function EmailItem({ email, toggleRead, toggleStarred }) {
  return ( 
  <li className={`email ${email.read ? 'read' : 'unread'}`}>
    <div className="select">
        <input
          className="select-checkbox"
          type="checkbox"
          onClick={toggleRead}/>
    </div>

    <div className="star">
        <input
        className="star-checkbox"
        type="checkbox"
        onClick={toggleStarred}
      />
    </div>
    <span className="sender">{email.sender}</span>
    <span className="title">{email.title}</span>
  </li>
  );
}






export default App;
