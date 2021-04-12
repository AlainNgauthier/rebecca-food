import React, { useState, useEffect } from 'react';

function Horario() {
    
    const [aberto, setAberto] = useState(true);
    const [today, setDate] = useState(new Date());
    
   useEffect(() => {   
        const timer = setInterval(() => {
            //an interval wich will update
            //the current data every minute
            setDate(new Date());

        }, 60 * 1000);

        clearInterval(timer);
        const time = today.getHours();
        console.log(time);
        if(time < 18 || time > 23){
            setAberto(false);
        }

    }, []);
    
    console.log(today);
    
    return (
        <div className="content">
            {aberto ? 
                    "Aberto"
                    : 
                    "Fechado"
            }
        </div>
    )
}

export default Horario
