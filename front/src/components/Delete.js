import { useState, useRef } from "react";
import toast from 'react-hot-toast';
export default function Delete() {
    const [open, setOpen] = useState();
    const nomePers = useRef(null);
    function postDelete() {
        fetch('http://127.0.0.1:3001/deletepersonagem',
            {
                method: "POST",
                body: JSON.stringify({ "nome": nomePers.current.value }),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
            .then((data) => data.json())
            .then((json) => {
                if (json.erro) {
                    toast.error(json.erro, { position: "top-center", style: { backgroundColor: "black", color: "white" } });
                }
                else {
                    nomePers.current.value = null;
                    toast.success(json, { position: "top-center", style: { backgroundColor: "black", color: "white" } });
                }
            })


    }

    return (

        <>
            {open ? <>
                <div className="mt-3 p-2 bg-zinc-300 border border-solid border-white">
                    <div className="flex flex-col">
                        <h4 className='text-center mb-2 font-bold'>Deletar Personagem</h4>
                        <div className="flex mb-4 gap-3">
                            <input type="text" placeholder="Nome do Personagem" ref={nomePers} className="px-1 border border-solid border-black" />
                            <button className="ms-3 p-1 bg-red-500 border border-solid border-black" onClick={postDelete}>Deletar</button>
                        </div>
                        <div className="">


                            <button className="bg-zinc-700 mt-1 p-1 border border-solid border-black text-white" onClick={() => setOpen(undefined)}>Fechar</button>
                        </div>
                    </div>
                </div>
            </>
                :
                <button className="h-10 mt-4 mb-4 p-1 bg-white border border-solid rounded-3xl" onClick={() => setOpen(true)}>Deletar Personagem</button>
            }
        </>

    );
}