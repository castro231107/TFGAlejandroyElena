import TarjetaHome from "../../components/TarjetaHome/TarjetaHome";
import FAQItem from "../../components/FAQ/FAQ";
import { useNavigate } from "react-router-dom";
import imagen1 from "../../../src/assets/imagenes/imagen1.jpg";
import './Inicio.css';


function Inicio() {
    const navigate = useNavigate();



    const irRegistro = () => {
        navigate('/login');
    };

    return (
        <div className="body-home">
            <div className="info-home">
                <div className="eslogan-home">
                    <h1>Tu dinero, bajo control.</h1>
                </div>
            </div>

            <div className="Preguntas-home">
                <p className='pregunta-home'>¿QUÉ ES NEBRIMATCH?</p>
            </div>

            <div className='DistribucionTarjetas'>
                <TarjetaHome
                    title="Controla tus presupuestos"
                    text="Establece metas, registra tus gastos y visualiza tu progreso de forma clara y sencilla."
                />

                <TarjetaHome
                    title="Visualiza tus gastos"
                    text="Identifica patrones de consumo,categorías y recibe alertas inteligentes para mantener tus finanzas en orden."
                />

                <TarjetaHome
                    title="Mantente informado"
                    text="Accede a noticias y actualidad financiera que te ayudan a tomar mejores decisiones con tu economía personal."
                />
            </div>

            <div className="filaImagen2-home">
                <img className='imagen2-home' src={imagen1} alt="Estudiantes de NebriMatch" />

                <div className='unete-home'>
                    <h3>ÚNETE A LA FAMILIA NEBRIMATCH</h3>
                    <div className='botones-home'>

                        <button onClick={irRegistro}>Registrarse o iniciar</button>
                    </div>
                </div>
            </div>

            <div className="Preguntas-home">
                <p className='pregunta-home'>¿Cómo funciona?</p>
            </div>

            <div className='DistribucionTarjetas'>
                <TarjetaHome
                    title="Crea tu perfil."
                    text="Di qué estudias, qué sabes y qué buscas."
                />

                <TarjetaHome
                    title="Haz match"
                    text="Te conectamos con personas afines."
                />

                <TarjetaHome
                    title="Aprended juntos"
                    text="Chat, videollamada o sesiones de estudio."
                />
            </div>

            <div className="faq-home">
                <div className="Preguntas-home">
                    <p className='pregunta-home'>Preguntas frecuentes</p>
                </div>

                <div className='distribuccionFAQ-home'>
                    <FAQItem
                        question="¿Es gratis?"
                        answer="Sí. NebriMatch es completamente gratis. Puedes crear tu perfil, hacer match con otras personas y estudiar juntos sin ningún coste."
                    />

                    <FAQItem
                        question="¿Necesito experiencia previa?"
                        answer="No. Puedes usar NebriMatch tanto si estás empezando desde cero como si ya tienes conocimientos y quieres ayudar a otros. La plataforma está pensada para todos los niveles."
                    />

                    <FAQItem
                        question="¿Cómo funciona?"
                        answer="Primero creas tu perfil indicando qué estudias, qué sabes y qué quieres aprender. A partir de ahí, NebriMatch te conecta con personas compatibles para que podáis estudiar o enseñar juntos."
                    />

                    <FAQItem
                        question="¿Cómo hago match?"
                        answer="El sistema de match se basa en la información de tu perfil y tus intereses. Te proponemos a personas que tienen objetivos similares a los tuyos, y vas decidiendo con quien quieres trabajar o de quien quieres aprender"
                    />

                    <FAQItem
                        question="¿Hay sesiones grupales?"
                        answer="Sí. Puedes unirte a sesiones grupales para estudiar con varias personas al mismo tiempo y compartir conocimientos."
                    />
                </div>
            </div>
        </div>
    );
}

export default Inicio;