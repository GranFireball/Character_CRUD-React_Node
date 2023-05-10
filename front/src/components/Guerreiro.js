import { useState } from 'react';
import Personagem from './Personagem';
import HeaderList from './HeaderList';
export default function Guerreiro() {
    const [open, setOpen] = useState();
    const [guer, setGuer] = useState();

    function getGuer() {
        fetch('http://127.0.0.1:3001/classe/guer',
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
                    setGuer(undefined);
                }
                else {
                    setGuer(json);
                }
            })
        setOpen(true);
    }

    return (

        <>
            <button className="h-10 mt-4 p-1 bg-red-400 border border-solid rounded-3xl" onClick={() => { open ? setOpen(undefined) : getGuer() }}>Guerreiros</button>
            {open &&
                <div className='p-1 mt-1 border-2 border-red-800'>
                    {guer ?
                        <>
                            <HeaderList />
                            {guer.map((item, index) => {
                                return <Personagem key={index} index={index + 1} nome={item.nome} poderTot={item.poderTot} />
                            })}
                        </>
                        :
                        <h1 className='font-bold p-1'>Não Existe Guerreiro</h1>}
                </div>


            }
        </>

    );
}