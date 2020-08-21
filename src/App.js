import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('repositories');
      setRepositories(response.data);
    }

    loadRepositories();
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
        title: `Novo Repositório ${Date.now()}`,
        url: 'https://github.com.br/Gabriel-Teixeira',
        techs: ['React', 'React Native', 'Node.JS']
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if (repositoryIndex < 0) {
      return;
    }

    const repositoriesUpdate = repositories.filter((repository, index) => {
        return index !== repositoryIndex;
    });

    setRepositories(repositoriesUpdate);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

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
