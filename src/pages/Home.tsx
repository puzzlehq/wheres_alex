
function Home() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-yellow-300">
            <div className="max-w-xs w-full px-4 py-8 bg-yellow-400">
                <div className="flex justify-between items-center mb-4">
                    <button className="bg-orange-500 p-3 rounded-full text-white">New Game</button>
                    <button className="flex items-center ml-2 bg-white text-black p-2 rounded-full">
                        <div className="bg-black rounded-full w-3 h-3 mr-2"></div>
                        ...Alice
                    </button>
                </div>
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-black">Total Winnings</h2>
                    <p className="bg-gray-300 p-2 rounded-full mt-2 text-black text-xl">10 Puzzle Pieces</p>
                </div>
                <h3 className="mb-4 text-center text-xl font-bold text-black">Notifications</h3>
                    <div className="mb-6 overflow-y-auto notifications-scrollbar" style={{ maxHeight: '200px' }}>
                    {["Bob", "Matt", "Darv", "Stef"].map(name => (
                        <div className="flex items-center justify-between bg-white p-4 rounded-lg mb-2">
                            <div className="flex items-center flex-grow">
                                <div className="bg-blue-500 rounded-full w-10 h-10"></div>
                                <span className="ml-2 text-blue-500 text-sm">{name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="bg-green-500 p-2 rounded-full text-sm w-24">{name === "Stef" ? "Delete" : name === "Matt" ? "Start" : "Finish"}</button>
                                <span className="text-blue-500 text-sm w-12 text-right">{name === "Matt" ? "25 P" : name === "Darv" ? "50 P" : "10 P"}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <h3 className="mb-4 text-center text-xl font-bold text-black">Live Games</h3>
                <div className="grid gap-2 overflow-y-auto custom-scrollbar" style={{ maxHeight: '250px' }}>
                    {[...Array(2)].map(() => (
                        ["Alice", "Luke", "Veda"].map((name, index) => (
                            <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                                <div className="flex items-center flex-grow">
                                    <div className="bg-blue-500 rounded-full w-10 h-10"></div>
                                    <span className="ml-2 text-blue-500 text-sm">{name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="bg-red-500 p-1 rounded-full text-xs">Reneg</button>
                                    <button className="bg-gray-400 p-1 rounded-full text-xs">Ping</button>
                                    <span className="text-blue-500 text-sm w-12 text-right">{index === 0 ? '10 P' : index === 1 ? '100 P' : '69 P'}</span>
                                </div>
                            </div>
                        ))
                    ))}
                </div>
                <div className="text-center mt-4">
                    <button className="items-center bg-orange-500 p-2 rounded-full text-xs">Past Games</button>
                </div>
            </div>
        </div>
    );
}

export default Home;