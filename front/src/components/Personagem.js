export default function Personagem({ index, nome, poderTot }) {
    return (
        <>
            {index === 1 ?
                <div className="bg-yellow-600 flex justify-between text-white p-2 mx-auto border rounded my-1">
                    <span className="flex justify-center w-20">{index}</span>
                    <span className="flex justify-center max-w-screen-lg">{nome}</span>
                    <span className="flex justify-center w-20">{poderTot}</span>
                </div>
                :
                index === 2 ?
                    <div className="bg-gray-500 flex justify-between text-white p-2 mx-auto border rounded my-1">
                        <span className="flex justify-center w-20">{index}</span>
                        <span className="flex justify-center max-w-screen-lg">{nome}</span>
                        <span className="flex justify-center w-20">{poderTot}</span>
                    </div>
                    :
                    index === 3 ?
                        <div className="bg-orange-900 flex justify-between text-white p-2 mx-auto border rounded my-1">
                            <span className="flex justify-center w-20">{index}</span>
                            <span className="flex justify-center max-w-screen-lg">{nome}</span>
                            <span className="flex justify-center w-20">{poderTot}</span>
                        </div>
                        :
                        <div className="bg-zinc-700 flex justify-between text-white p-2 mx-auto border rounded my-1">
                            <span className="flex justify-center w-20">{index}</span>
                            <span className="flex justify-center max-w-screen-lg">{nome}</span>
                            <span className="flex justify-center w-20">{poderTot}</span>
                        </div>
            }


        </>
    );
}