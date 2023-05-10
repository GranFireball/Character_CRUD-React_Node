import { useState } from 'react';
import Personagem from './Personagem';
import HeaderList from './HeaderList';
export default function Mago() {
    const [open, setOpen] = useState();
    const [mago, setMago] = useState();

    function getMago() {
        fetch('http://127.0.0.1:3001/classe/mago',
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
                    setMago(undefined);
                }
                else {
                    setMago(json);
                }
            })
        setOpen(true);
    }

    return (

        <>
            <button className="h-10 mt-4 p-1 bg-blue-400 border border-solid rounded-3xl" onClick={() => { open ? setOpen(undefined) : getMago() }}>Magos</button>
            {open &&
                <div className='p-1 mt-1 border-2 border-blue-800'>
                    {mago ?
                        <>
                            <HeaderList />
                            {mago.map((item, index) => {
                                return <Personagem key={index} index={index + 1} nome={item.nome} poderTot={item.poderTot} />
                            })}
                        </>
                        :
                        <h1 className='font-bold p-1'>Não Existe Mago</h1>}
                </div>


            }
        </>

    );
}