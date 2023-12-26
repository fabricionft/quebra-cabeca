import styles from './Jogo.module.css'

//Assets
import imageCompleta from './assets/p9.png';
import iconInterrogacao from './assets/interrogacao.png';
import iconFechar from './assets/iconFechar.png';
import mascote from './assets/mascote.png';

//Hooks
import useJogo from './hooks/useJogo';


function Jogo() {

  const {
    jogo, setJogo,
    iniciarJogo, reiniciarJogo, moverPeca,
    visibilidadeDica, setVisibilidadeDica
  } = useJogo();

  return (
    <>
      <div className={styles.circulo}></div>

      <main className={styles.containerPrincipal}>
        {
          jogo.iniciou ? (
            <div className={styles.containerJogo}>
              {
                jogo.iniciou && (
                  <img
                  onClick={() => setVisibilidadeDica((visibilidadeDica) ? false : true)}
                  src={iconInterrogacao}
                  className={styles.iconDica}
                />
                )
              }

              <div className={styles.telaJogo}>
                {
                  jogo.cards.map((card, index) => (
                    <img
                      key={index}
                      className={styles.card}
                      onClick={() => {
                        if(jogo.iniciou && jogo.movimentosValidos.includes(index)) moverPeca(index, card)
                      }}
                      src={card}
                    />
                  ))
                }
              </div>

              <button  onClick={(jogo.iniciou) ? reiniciarJogo : iniciarJogo}>
                {
                  !jogo.iniciou ? "Iniciar" 
                  : !jogo.ganhou ? "Reiniciar"
                  : "Jogar novamente"
                }
              </button>
            </div>
          ) : (
            <div className={styles.inicio}>
              <div className={styles.div1}>
                <img src={mascote} alt="Mascote" className={styles.mascote}/>
              </div>

              <div className={styles.div2}>
                <h1>Vamos lá, escolha a dificuldade e clique para iniciar!!</h1>

                <div className={styles.btns}>
                  <button  onClick={(jogo.iniciou) ? reiniciarJogo : iniciarJogo}>
                    {
                      !jogo.iniciou ? "Iniciar" 
                      : !jogo.ganhou ? "Reiniciar"
                      : "Jogar novamente"
                    }
                  </button>

                  <select
                    onChange={(e) => setJogo({...jogo, dificuldade: e.target.value})}
                    disabled={jogo.iniciou}
                    className={styles[(jogo.dificuldade == "dificil") && "dificil"]}
                  >
                    <option value="facil">Fácil</option>
                    <option value="dificil">Difícil</option>
                  </select>
                </div>
              </div>
            </div>
          )
        }

        {
          visibilidadeDica && (
            <div className={styles.containerDica}>
              <img 
                src={iconFechar} 
                alt="Icon fechar" 
                className={styles.iconFechar}
                onClick={() => setVisibilidadeDica((visibilidadeDica) ? false : true)}
              />

              <img 
                src={imageCompleta} 
                alt="Imagem completa" 
                className={styles.imagemDica}
              />
            </div>
          )
        }

        {jogo.ganhou && (
          <div className={styles.containerGanhou}>
            <div className={styles.ganhou}>
              <h1>Parabéns</h1>

              <p>Você completou o desafio!!<br></br> {jogo.dificuldade == "facil" && "Agora tente no difícil."}</p>

              <button
                onClick={reiniciarJogo}
              >
                Jogar novamente
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default Jogo;
