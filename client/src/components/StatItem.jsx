function StatItem ({count, title, icon, color}){

    return (
        <div
            className="h-36 bg-dark-blue text-cream rounded-lg"
            style={{ borderBottomColor: color, borderBottomWidth: '4px' }}
        >
            <h1 className="text-center font-semibold text-xl mt-4">{title}</h1>
            <header
                className="flex justify-around mx-8 my-4 p-4 text-4xl"
                style={{ color: color, borderTopColor: color, borderTopWidth: '2px' }}
            >
                <span className="font-bold font-sans">{count}</span>
                <span>{icon}</span>
            </header>
        </div>
    );
}

export default StatItem