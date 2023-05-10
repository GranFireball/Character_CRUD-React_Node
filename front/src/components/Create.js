import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
export default function Create() {
    const [open, setOpen] = useState();
    const [poderTot, setPoderTot] = useState();
    const nome = useRef(null);
    const classe = useRef(null);
    const ataque = useRef(0);
    const defesa = useRef(0);
    const magia = useRef(0);
    const agil = useRef(0);

    function postCreate() {
        if (nome.current.value === '' || ataque.current.value === '' || defesa.current.value === '' || magia.current.value === '' || agil.current.value === '') {
            toast.error("Preencha Todos os Dados", { position: "top-center", style: { backgroundColor: "black", color: "white" } });
            return;
        }
        fetch('http://127.0.0.1:3001/createpersonagem',
            {
                method: "POST",
                body: JSON.stringify({ "nome": nome.current.value, "classe": classe.current.value, "ataque": ataque.current.value, "defesa": defesa.current.value, "magia": magia.current.value, "agil": agil.current.value, "poderTot": poderTot }),
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
                    nome.current.value = null;
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
                <div className="mt-3 p-2  bg-zinc-300 border border-solid border-white">
                    <div className="flex flex-col">
                        <h4 className='text-center mb-2 font-bold'>Criar Personagem</h4>
                        <div className="bg-zinc-400 p-2">

                            <div className="flex flex-col gap-7 mb-2">
                                <div className='flex items-center'>
                                    <span className='me-2'>Nome: </span>
                                    <input type='text' ref={nome} placeholder='Nome do Personagem' className="bg-white p-1 border border-solid border-black rounded-lg" />
                                </div>
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
                            <button className="bg-zinc-800 mt-1 p-1 border border-solid border-black text-white" onClick={() => setOpen(undefined)}>Fechar</button>
                            <button className="bg-green-500 mt-1 p-1 border border-solid border-black" onClick={postCreate}>Criar</button>
                        </div>
                    </div>
                </div>
            </>
                :
                <button className="h-10 mt-4 mb-4 p-1 bg-white border border-solid rounded-3xl" onClick={() => setOpen(true)}>Criar Personagem</button>
            }
        </>
    );
}