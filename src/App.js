import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
console.log(repositories)
  useEffect(()=>{
    api.get('repositories').then(response=>{
      setRepositories(response.data)
    })
  },[])
  async function handleAddRepository() {
   const response = await api.post('repositories', {
      title:"Desafio ReactJS",
      url:"https://github.com/josepholiveira",
      techs:["React", "Node.js"]
     })
     
     setRepositories([ ...repositories, response.data ])
  }

  async function handleRemoveRepository(id) {
   await api.delete(`repositories/${id}`)
   const repositoryIndex = repositories.findIndex(reposository => reposository.id === id)
   repositories.splice(repositoryIndex, 1)

   setRepositories(repositories.splice(repositoryIndex, 1))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>(
          <li key={repository.id}>
          { repository.title }

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
