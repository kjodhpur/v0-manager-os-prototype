// This file contains functions for making API requests related to user management.

// Function to ensure a user exists in the database. If the user does not exist, it will be created.
export function ensureUser(user: any) {
    if (!user) {
        return Promise.reject(new Error("No user provided"))
    }
    fetch('http://localhost:5000/api/user/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: user.id })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.exists) {
            // If the user does not exist, create it
            return createUser(user)
        }
    })
}

export function createUser(user: any) {
  return fetch('http://localhost:5000/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.user_metadata.full_name
    })
  })
}

export function updateUser(user: any, name: string, email: string, phone: string) {
  return fetch('http://localhost:5000/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: user.id,
      email: email,
      name: name,
      phone: phone
    })
  })
}