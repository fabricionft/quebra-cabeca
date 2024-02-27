//Assets
import imageP0 from '../assets/p0.png';
import imageP1 from '../assets/p1.png';
import imageP2 from '../assets/p2.png';
import imageP3 from '../assets/p3.png';
import imageP4 from '../assets/p4.png';
import imageP5 from '../assets/p5.png';
import imageP6 from '../assets/p6.png';
import imageP7 from '../assets/p7.png';
import soundAction from '../assets/action.mp3';

//Hooks
import { useEffect, useState } from 'react';


const useJogo = () => {

  const [visibilidadeDica, setVisibilidadeDica] = useState(false);
  
  const [jogo, setJogo] = useState({
    cards: [
      imageP0, imageP1, imageP2, imageP3, imageP4,
      imageP5, imageP6, imageP7, ''
    ],
    indiceVazio: 8,
    iniciou: false,
    ganhou: false,
    dificuldade: "facil",
    movimentosValidos: []
  });
  
  useEffect(() => {
    let indiceVazio = jogo.cards.findIndex((card) => card === '');

    setJogo({...jogo, movimentosValidos: (jogo.dificuldade == "facil") 
    ? [0, 1, 2, 3, 4, 5, 6, 7, 8] 
    : [
        (![0, 3, 6].includes(indiceVazio)) && indiceVazio -1, //Horizontal anterior
        (![2, 5, 8].includes(indiceVazio)) && indiceVazio+1, //Horizontal posterior
        indiceVazio-3, //Vertical anterior
        indiceVazio+3  //Horizontal posterior
    ]});
  }, [jogo.dificuldade, jogo.cards]);

  const pegarCards = () => {
    let cardsTransferencia = [];

    jogo.cards.map((card) => {
      cardsTransferencia.push(card);
    })

    return cardsTransferencia;
  }

  const iniciarJogo = () => {
    let cardsTransferencia = pegarCards();

    for (let i = cardsTransferencia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsTransferencia[i], cardsTransferencia[j]] = [cardsTransferencia[j], cardsTransferencia[i]];
    }
   
    setJogo({...jogo, 
      cards: cardsTransferencia,
      iniciou: true,
      indiceVazio: cardsTransferencia.findIndex((card) => card === '')
    })
  }

  const reiniciarJogo = () => {
    setJogo({...jogo, 
      cards: [
        imageP0, imageP1, imageP2, imageP3, imageP4,
        imageP5, imageP6, imageP7, ''
      ],
      indiceVazio: 8,
      iniciou: false,
      ganhou: false,
      dificuldade: "facil",
      movimentosValidos: 0
    })
  };

  const moverPeca = (indiceASerMovido, card) => {
    let cardsTransferencia = pegarCards();

    new Audio(soundAction).play();

    cardsTransferencia[indiceASerMovido] = '';
    cardsTransferencia[jogo.indiceVazio] = card

    setJogo({...jogo, 
      cards: cardsTransferencia,
      indiceVazio: indiceASerMovido,
      ganhou: (verificarSeVenceu(cardsTransferencia)) && true
    });
  }

  const verificarSeVenceu = (cards) => {
    let acertos = [];

    cards.map((card, index) => {
      if(card.replace(".png", "").split("/src/assets/p")[1] == index) acertos.push("acertou");
    })

    if(acertos.length == 8) return true;
    else return false;
  }


  return{
    jogo, setJogo,
    iniciarJogo, reiniciarJogo,
    moverPeca, 
    visibilidadeDica, setVisibilidadeDica
  }
}

export default useJogo;