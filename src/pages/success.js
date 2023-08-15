import Header from "../components/Header";

export default function success(){
    return (
        <div className=" bg-gray-100">
            <Header />
            <div className='flex flex-col m-5 bg-white z-40 p-10'>
                <p className='top-2 right-2 text-xl italic text-gray-400'>success</p>
            </div>
        </div>
    )
}