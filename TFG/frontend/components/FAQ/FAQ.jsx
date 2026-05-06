import { useState } from "react";
import "./FAQ.css"

const FAQItem = ({ pregunta, respuesta }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="elemento-faq" onClick={() => setOpen(!open)}>
            <div className="pregunta-faq">
                <span>{pregunta}</span>
                <span>{open ? "−" : "+"}</span>
            </div>

            {open && <p className="respuesta-faq">{respuesta}</p>}
        </div>
    );
};

export default FAQItem;
