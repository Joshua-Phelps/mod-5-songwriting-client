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
  return fetch(`${API_ROOT}/current_user`, {
    headers: headers()
  }).then(res => {
    return res.json();
  });
};

const getSongVersions = songId => {
    return fetch(`${API_ROOT}/songs/${songId}`, {
        headers: headers()
    })
}

const addCollection = (collectionName, userId) => {
    return fetch(`${API_ROOT}/collections`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({collection_name: collectionName, user_id:userId })
    }).then(res => res.json());
}

const addSong = (songTitle, collectionId) => {
    return fetch(`${API_ROOT}/songs`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({collection_id: collectionId, song_title: songTitle })
    }).then(res => res.json());
}

const editSong = (songTitle, collectionId, songId) => {
  return fetch(`${API_ROOT}/songs/${songId}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify({collection_id: collectionId, song_title: songTitle })
  }).then(res => res.json());
}

// const createNewVersion = songId => {
//     return fetch(`${API_ROOT}/versions`, {
//         method: 'POST',
//         headers: headers(),
//         body: 
//     })
// }

export const api = {
  auth: {
    login,
    getCurrentUser,
    signup
  },
  collections: {
    getUserCollections,
    addCollection
  },
  versions: {
      getSongVersions 
  },
  songs: {
      addSong,
      editSong
  }
};