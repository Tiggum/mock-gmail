import React from 'react'

const AllEmail = ({emails, onClick}) => {
    return (
      <ol>
        {emails.map(email => {
          return (
          <li key={`${email.id}-${email.message}`} value={email.id} onClick={onClick}>
            {email.subject}
            <br/>
            {email.sender}
          </li>)
        })}
      </ol>
    )
}

export default AllEmail