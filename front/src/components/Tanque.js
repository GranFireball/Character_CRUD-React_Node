import { useState } from 'react';
import Personagem from './Personagem';
import HeaderList from './HeaderList';
export default function Tanque() {
    const [open, setOpen] = useState();
    const [tanq, setTanq] = useState();

    function getTanq() {
        fetch('http://127.0.0.1:3001/classe/tanque',
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
            .then((data) => data.json())
            .then((json) => {
                if (json.erro) {
                    setTanq(undefined);
                }
                else {
                    setTanq(json);
                }
            })
        setOpen(true);
    }

    return (

        <>
            <button className="h-10 mt-4 p-1 bg-green-400 border border-solid rounded-3xl" onClick={() => { open ? setOpen(undefined) : getTanq() }}>Tanques</button>
            {open &&
                <div className='p-1 mt-1 border-2 border-green-800 '>
                    {tanq ?
                        <>
                            <HeaderList />
                            {tanq.map((item, index) => {
                                return <Personagem key={index} index={index + 1} nome={item.nome} poderTot={item.poderTot} />
                            })}
                        </>
                        :
                        <h1 className='font-bold'>Não Existe Tanque</h1>
                    }
                </div>
            }
        </>

    );
}