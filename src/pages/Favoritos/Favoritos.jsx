import { useState, useEffect } from 'react';

//components
import ListFavoritos from '../../components/ListFavoritos.jsx/ListFavoritos';
import Erro from '../../components/Erro/erro.jsx';
import ReactLoading from 'react-loading';
import LoaderSlice from '../../components/LoaderSlice/loaderSlice.jsx';

const Favoritos = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erroServidor, setErroServidor] = useState(false);
  const [erro, setErro] = useState(false);
  const [erroTempo, setErroTempo] = useState(false);

  const fetchWithTimeOut = (url, options, duration) => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchPromise = fetch(url, { ...options, signal });
    const timeoutPromise = new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        controller.abort();
        reject(new Error('Tempo limite excedido'));
      }, duration);
    });

    return Promise.race([fetchPromise, timeoutPromise])
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          return res.json();
        } else {
          throw new Error('Erro na requisição');
        }
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          throw new Error('Tempo limite excedido');
        } else {
          throw error;
        }
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchWithTimeOut(
      'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data',
      {
        headers: {
          'dev-email-address': 'gabriellacsilva2002@gmail.com',
        },
      },
      5000
    )
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.message === 'Tempo limite excedido') {
          setErroTempo(true);
        } else {
          setErro(true);
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <LoaderSlice/>
    );
  }

  if (erroTempo) {
    return (
      <Erro erro={'O servidor demorou para responder, tente mais tarde!'} />
    );
  }

  if (erroServidor) {
    return (
      <Erro erro={'O servidor falhou em responder, tente recarregar a página!'} />
    );
  }

  if (erro) {
    return (
      <Erro
        erro={'O servidor não conseguirá responder por agora, tente voltar novamente mais tarde!'}
      />
    );
  }

  return <ListFavoritos games={games} />;
};

export default Favoritos;
