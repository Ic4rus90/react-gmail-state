import Header from './components/Header'
import initialEmails from './data/emails'
import { useState } from 'react'

import './styles/App.css'

function App() {
const [emails, setEmails] = useState(initialEmails);
const [hideRead, setHideRead] = useState(false);

  const toggleRead = (id) => {
    const updatedEmails = emails.map((email) => 
      /*
      The spread operator copies all the properties from the email object, and overrides the read property.
      Mutating the object directly is not recommended in React. It is better to keep the object immutable. 
      By creating new objects with updated values, React can detect changes and re-render components easier.
      */
      
      email.id === id ? { ...email, read: !email.read } : email
    );
    setEmails(updatedEmails);
  }

  const toggleStarred = (id) => {
    const updatedEmails = emails.map((email) =>
      // See spread syntax explanation above  
      email.id === id ? { ...email, starred: !email.starred } : email
    );
    setEmails(updatedEmails);
  }


  // Filters out the read emails if the hideRead state is set to true
  const displayedEmails = hideRead ? emails.filter(email => !email.read) : emails

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
              className="select-checkbox"
              type="checkbox"
              checked={hideRead}
              onChange={() => setHideRead(!hideRead)}
            />
          </li>
          
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {
          /*
          displayedEmails.map iterates over each email in the email array.
          displayedEmails contains emails based on the status of the hideReadCheckbox
          */
          displayedEmails.map((email) => (
            // Email Itemm returns a JSX element for each mail.
            <EmailItem 
              // The key prop helpt React identify which items have changed, are added, or removed.
              key={email.id}
              // Passes the email object as a prop to the EmailItem component.
              email={email}
              // Provides a function that calls toggleRead with the specific email.id when executed.
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
