const API_ROOT = `http://localhost:3000/api/v1`;

const token = () => localStorage.getItem("token");

const headers = () => {
  return {
    "Content-Type": "application/json",
    Accepts: "application/json",
    Authorization: token()
  };
};

// const getPaintings = () => {
//   return fetch(`${API_ROOT}/paintings/`, { headers: headers() }).then(res =>
//     res.json()
//   );
// };

const getUserCollections = (id) => {
  return fetch(`${API_ROOT}/users/${id}`, { headers: headers() }).then(res =>
    res.json()
  );
};

const login = data => {
  return fetch(`${API_ROOT}/auth`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const signup = data => {
  return fetch(`${API_ROOT}/users`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data)
  }).then(res => res.json());
}

const getCurrentUser = () => {
  // console.log("getting current user", headers);
  return fetch(`${API_ROOT}/current_user`, {
    headers: headers()
  }).then(res => {
    // console.log(res)
    return res.json();
  });
};

const getSongVersions = songId => {
    return fetch(`${API_ROOT}/songs/${songId}`, {
        headers: headers()
    })
}

export const api = {
  auth: {
    login,
    getCurrentUser,
    signup
  },
  collections: {
    getUserCollections
  },
  versions: {
      getSongVersions 
  }
};