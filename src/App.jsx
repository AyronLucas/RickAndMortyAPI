
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { useEffect, useState } from 'react'


function App() {
  const [conteudo, setConteudo] = useState(<>Carregando</>)

  async function PegarConteudo() {
    // vai realizae o Fetch para api do Rick and Morty - usando AXIOS
    //get(pega), put(altera), post(add), delete
    const requestOptions = {
      method: 'GET'
    }

    const response = await fetch(
      'https://rickandmortyapi.com/api/character',
      requestOptions 
    )

    if(!response.ok) {
      return []
    }

    const data = await response.json()
    
    return data.results
  }

  async function TransformaEmLista() {
    const todosPersonagens = await PegarConteudo()

    return todosPersonagens.map(personagem =>
      <div className='card char' key={personagem.id}>
        <img src={personagem.image} alt={`Foto de ${personagem.name}`} />
        <h2>{personagem.name}</h2>
        <div className='char-info'>
          <span><b>Espécie: </b> {personagem.species} </span>
          <span><b>Gênero: </b> {personagem.gender} </span>
        </div>

        <div>
          <div className='lista-secundaria'>
            <b>Participacões: </b>
          </div>
          <h5><b>Status: </b> {personagem.status}</h5>
        </div>
      </div>
    )
  }

  useEffect(() => {
    async function carregar() {
      setConteudo(
        await TransformaEmLista()
      )
    }
    carregar()
  }, [])

  return (
    <>
      <Header />
      <main>
        {/* Filtros */}
        <div className='lista-principal'>
          {conteudo}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
