import { useState, useRef } from "react";
import toast from 'react-hot-toast';
export default function Edit() {
    const [open, setOpen] = useState();
    const [busca, setBusca] = useState();
    const nomePers = useRef(null);
    const [poderTot, setPoderTot] = useState(0);
    const classe = useRef(null);
    const ataque = useRef(0);
    const defesa = useRef(0);
    const magia = useRef(0);
    const agil = useRef(0);

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
                    toast.error(json.erro, { position: "top-center", style: { backgroundColor: "black", color: "white" } });
                }
                else {
                    setBusca(json.nome);
                    classe.current.value = json.classe;
                    ataque.current.value = json.ataque;
                    defesa.current.value = json.defesa;
                    magia.current.value = json.magia;
                    agil.current.value = json.agil;
                    setPoderTot(json.poderTot);
                    nomePers.current.value = null;
                }
            })


    }

    function postEdit() {
        if (!busca) {
            toast.error("Escolha o Personagem que Deseja Editar", { position: "top-center", style: { backgroundColor: "black", color: "white" } });
            return;
        }
        if (ataque.current.value === '' || defesa.current.value === '' || magia.current.value === '' || agil.current.value === '') {
            toast.error("Preencha Todos os Dados", { position: "top-center", style: { backgroundColor: "black", color: "white" } });
            return;
        }
        fetch('http://127.0.0.1:3001/editpersonagem',
            {
                method: "POST",
                body: JSON.stringify({ "nome": busca, "classe": classe.current.value, "ataque": ataque.current.value, "defesa": defesa.current.value, "magia": magia.current.value, "agil": agil.current.value, "poderTot": poderTot }),
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
                    setBusca(undefined);
                    ataque.current.value = null;
                    defesa.current.value = null;
                    magia.current.value = null;
                    agil.current.value = null;
                    toast.success(json, { position: "top-center", style: { backgroundColor: "black", color: "white" } });
                }
            })
    }

    function somaPoder() {
        let total = parseInt(ataque.current.value) + parseInt(defesa.current.value) + parseInt(magia.current.value) + parseInt(agil.current.value);
        setPoderTot(total);
    }

    return (

        <>
            {open ? <>
                <div className="mt-3 p-2 bg-zinc-300 border border-solid border-white">
                    <div className="flex flex-col">
                        <h4 className='text-center mb-2 font-bold'>Editar Personagem</h4>
                        <div className="flex mb-4 gap-3">
                            <input type="text" placeholder="Nome do Personagem" ref={nomePers} className="px-1 border border-solid border-black" />
                            <button className="ms-3 p-1 bg-yellow-400 border border-solid border-black" onClick={getSearch}>Buscar</button>
                        </div>
                        <div className="flex flex-col">
                            <div className="bg-zinc-400 p-2">
                                <span className="flex justify-center mb-6 bg-white border border-solid border-red-800">Nome: {busca && busca}</span>
                                <div className="flex flex-col gap-7 mb-2">

                                    <div className='flex items-center'>
                                        <span className='me-2'>Classe: </span>
                                        <select ref={classe} className="bg-white p-1 border border-solid border-black rounded-lg">
                                            <option>Guerreiro</option>
                                            <option>Mago</option>
                                            <option>Tanque</option>
                                        </select>
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='me-2'>Ataque: </span>
                                        <input type='number' ref={ataque} placeholder='Valor de Ataque' className="bg-white p-1 border border-solid border-black rounded-lg" onChange={somaPoder} />
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='me-2'>Defesa: </span>
                                        <input type='number' ref={defesa} placeholder='Valor de Defesa' className="bg-white p-1 border border-solid border-black rounded-lg" onChange={somaPoder} />
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='me-2'>Magia: </span>
                                        <input type='number' ref={magia} placeholder='Valor de Magia' className="bg-white p-1 border border-solid border-black rounded-lg" onChange={somaPoder} />
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='me-2'>Agilidade: </span>
                                        <input type='number' ref={agil} placeholder='Valor de Agilidade' className="bg-white p-1 border border-solid border-black rounded-lg" onChange={somaPoder} />
                                    </div>
                                </div>

                            </div>
                            <div className='flex justify-between'>
                                <button className="bg-zinc-800 mt-1 p-1 border border-solid border-black text-white" onClick={() => { setOpen(undefined); setBusca(undefined) }}>Fechar</button>
                                <button className="bg-blue-500 mt-1 p-1 border border-solid border-black" onClick={postEdit}>Editar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
                :
                <button className="h-10 mt-4 mb-4 p-1 bg-white border border-solid rounded-3xl" onClick={() => setOpen(true)}>Editar Personagem</button>
            }
        </>

    );
}