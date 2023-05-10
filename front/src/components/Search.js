import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function Search() {
    const [open, setOpen] = useState();
    const [busca, setBusca] = useState();
    const nomePers = useRef(null);

    function getSearch() {
        fetch('http://127.0.0.1:3001/getpersonagem',
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
                    setBusca(undefined);
                    toast.error(json.erro, { position: "top-center", style: { backgroundColor: "black", color: "white" } });
                }
                else {
                    setBusca(json);
                    nomePers.current.value = null;
                }
            })


    }

    return (

        <>
            {open ? <>
                <div className="mt-3 p-2 bg-zinc-300 border border-solid border-white">
                    <div className="flex flex-col">
                        <h4 className='text-center mb-2 font-bold'>Informações do Personagem</h4>
                        <div className="flex mb-4 gap-3">
                            <input type="text" placeholder="Nome do Personagem" ref={nomePers} className="px-1 border border-solid border-black" />
                            <button className="ms-3 p-1 bg-yellow-400 border border-solid border-black" onClick={getSearch}>Buscar</button>
                        </div>
                        <div className="bg-zinc-400 p-2">

                            <span className="flex justify-center mb-6 bg-white border border-solid border-red-800">Nome: {busca && busca.nome}</span>

                            <div className="grid grid-cols-2 gap-7 mb-6">
                                <span className="bg-white p-1 border border-solid border-black rounded-lg">Ataque: {busca && busca.ataque}</span>
                                <span className="bg-white p-1 border border-solid border-black rounded-lg">Defesa: {busca && busca.defesa}</span>
                                <span className="bg-white p-1 border border-solid border-black rounded-lg">Magia: {busca && busca.magia}</span>
                                <span className="bg-white p-1 border border-solid border-black rounded-lg">Agilidade: {busca && busca.agil}</span>
                            </div>
                            <span className="flex bg-white mb-2 p-1 border border-solid border-green-800">Classe: {busca && busca.classe}</span>
                            <span className="flex bg-white mb-2 p-1 border border-solid border-green-800">Poder Total: {busca && busca.poderTot}</span>

                        </div>
                        <div>
                            <button className="bg-zinc-800 mt-1 p-1 border border-solid border-black text-white" onClick={() => { setOpen(undefined); setBusca(undefined) }}>Fechar</button>
                        </div>
                    </div>
                </div>
            </>
                :
                <button className="h-10 mt-4 mb-4 p-1 bg-white border border-solid rounded-3xl" onClick={() => setOpen(true)}>Buscar Personagem</button>
            }
        </>

    );
}