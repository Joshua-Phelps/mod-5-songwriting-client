const API_ROOT = `http://localhost:3000/api/v1`;

const token = () => localStorage.getItem("token");

const headers = () => {
  return {
    "Content-Type": "application/json",
    Accepts: "application/json",
    Authorization: token()
  };
};

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

const signup = (username, password, password2) => {
  return fetch(`${API_ROOT}/users`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({username: username, password: password, password2: password2})
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

const editCollection = (collectionName, collectionId) => {
    return fetch(`${API_ROOT}/collections/${collectionId}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify({collection_name: collectionName})
  }).then(res => res.json());
}

const deleteCollection = id => {
    return fetch(`${API_ROOT}/collections/${id}`,{
      method: "DELETE"
    }).then(res => res.json())
}

const addSong = (songTitle, collectionId) => {
    return fetch(`${API_ROOT}/songs`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify( {song: {collection_id: collectionId, title: songTitle }})
    }).then(res => res.json());
}

const editSong = (songTitle, collectionId, songId) => {
  return fetch(`${API_ROOT}/songs/${songId}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify({collection_id: collectionId, title: songTitle })
  }).then(res => res.json());
}

const editLyrics = (songId, lyrics) => {
  return fetch(`${API_ROOT}/songs/${songId}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({id: songId, lyrics: lyrics})
  })
}

const deleteSong = (songId) => {
  return fetch(`${API_ROOT}/songs/${songId}`,{
    method: "DELETE"
  }).then(res => res.json())
}

const addVersion = (data) => {
  return fetch(`${API_ROOT}/versions`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data)
  }).then(res => res.json())
}

const deleteVersion = (id) => {
  return fetch(`${API_ROOT}/versions/${id}`, {
    method: "DELETE"
  }).then(res => res.json())
}

const editVersion = (id, title) => {
  return fetch(`${API_ROOT}/versions/${id}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({id: id, title: title})
  }).then(res => res.json())
}

const deleteAccount = id => {
  return fetch(`${API_ROOT}/users/${id}`, {
    method: "DELETE"
  }).then(res => res.json())
}


const synonyms = word => {
    return fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": "ad3a1c7fa9mshaa9f927e3a26915p18212cjsnf354076fa9bb"
    }
  }).then(res => res.json())
}

const rhymes = word => {
  return fetch(`https://api.datamuse.com/words?rel_rhy=${word}`)
  .then(res => res.json())
}

const dictionary = word => {
  return fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": "ad3a1c7fa9mshaa9f927e3a26915p18212cjsnf354076fa9bb"
    }
  }).then(res => res.json())
}

export const api = {
  auth: {
    login,
    getCurrentUser,
    signup
  },
  collections: {
    getUserCollections,
    addCollection,
    editCollection,
    deleteCollection
  },
  versions: {
      getSongVersions,
      deleteVersion,
      editVersion,
      addVersion
  },
  songs: {
      addSong,
      editSong,
      deleteSong,
      editLyrics 
  },
  words: {
    synonyms,
    rhymes,
    dictionary
  },
  account: {
    deleteAccount
  }
};