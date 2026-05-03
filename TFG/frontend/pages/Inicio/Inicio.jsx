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
                <p className='pregunta-home'>CONOCE SAFEPOCKET</p>
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
                    <h3>ÚNETE A LA FAMILIA SAFEPOCKET</h3>
                    <div className='botones-home'>

                        <button onClick={irRegistro}>Registrarse o iniciar</button>
                    </div>
                </div>
            </div>


            {/* Yo preguntas home lo quitaba porque es basicmente como las 3 de arriba */}

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
                        question="¿Cómo puedo crear una cuenta?"
                        answer="Puedes registrarte desde la app introduciendo tus datos personales básicos. Una vez completado el registro, podrás acceder a tu cuenta y empezar a gestionar tus finanzas."
                    />

                    <FAQItem
                        question="¿Cómo puedo realizar una transferencia?"
                        answer="Para hacer una transferencia, accede a la sección de pagos, introduce el número de cuenta del destinatario, el importe y confirma la operación."
                    />

                    <FAQItem
                        question="¿Es segura mi información bancaria?"
                        answer="Sí, utilizamos medidas de seguridad como encriptación de datos y autenticación de usuarios para proteger tu información personal y financiera."
                    />

                    <FAQItem
                        question="¿Cómo puedo consultar mi saldo y movimientos?"
                        answer="Puedes ver tu saldo actualizado y el historial de movimientos desde el panel principal de tu cuenta en cualquier momento."
                    />

                    <FAQItem
                        question="¿Qué hago si detecto una operación sospechosa?"
                        answer="Si ves una transacción que no reconoces, contacta inmediatamente con soporte desde la app para que podamos revisar y asegurar tu cuenta."
                    />
                </div>
            </div>
        </div>
    );
}

export default Inicio;