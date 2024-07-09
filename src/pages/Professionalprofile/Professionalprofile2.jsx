import React from 'react'
import Header from '../../components/Header2'
import PlayerCard from './Components/PlayerCard'
import RadarChart from './RadarChart'
import StatsD from './Components/Stats'

const Professionalprofile2 = () => {
    return (
        <>
            <div className='bg-slate-200'>
                <Header />
                {/* <div className="flex gap-5 justify-between items-center self-stretch px-12 py-6 w-full bg-white shadow-sm max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f184a3886f12ad73806b8f26e84e32795e360cf93795977400d5b762d7c5df63?apiKey=565f43eb1fcf430087160894dfb02980&"
                        className="shrink-0 self-stretch my-auto w-36 max-w-full aspect-[2.78]"
                    />
                    <div className="flex flex-col justify-center self-stretch my-auto text-base whitespace-nowrap text-neutral-500">
                        <div className="flex flex-col justify-center w-full bg-gray-100 border border-solid border-neutral-200 rounded-[30px]">
                            <div className="flex gap-5 justify-between px-4 py-2 rounded-md">
                                <div className="flex flex-col justify-center px-2">
                                    <div className="justify-center">Recherche</div>
                                </div>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f72b46626fb3cceedee24e8cfeb3468cdfd62ae3e7eb14de4b55e313549e01f9?apiKey=565f43eb1fcf430087160894dfb02980&"
                                    className="shrink-0 w-5 aspect-square"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-start self-stretch px-4 rounded-[80px]">
                        <img
                            loading="lazy"
                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f04935a73c9ff09a237339a2a87a9b4fdd1e0cbeff709bcaf7a0e24ce7615fdf?apiKey=565f43eb1fcf430087160894dfb02980&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f04935a73c9ff09a237339a2a87a9b4fdd1e0cbeff709bcaf7a0e24ce7615fdf?apiKey=565f43eb1fcf430087160894dfb02980&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f04935a73c9ff09a237339a2a87a9b4fdd1e0cbeff709bcaf7a0e24ce7615fdf?apiKey=565f43eb1fcf430087160894dfb02980&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f04935a73c9ff09a237339a2a87a9b4fdd1e0cbeff709bcaf7a0e24ce7615fdf?apiKey=565f43eb1fcf430087160894dfb02980&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f04935a73c9ff09a237339a2a87a9b4fdd1e0cbeff709bcaf7a0e24ce7615fdf?apiKey=565f43eb1fcf430087160894dfb02980&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f04935a73c9ff09a237339a2a87a9b4fdd1e0cbeff709bcaf7a0e24ce7615fdf?apiKey=565f43eb1fcf430087160894dfb02980&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f04935a73c9ff09a237339a2a87a9b4fdd1e0cbeff709bcaf7a0e24ce7615fdf?apiKey=565f43eb1fcf430087160894dfb02980&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f04935a73c9ff09a237339a2a87a9b4fdd1e0cbeff709bcaf7a0e24ce7615fdf?apiKey=565f43eb1fcf430087160894dfb02980&"
                            className="aspect-square w-[60px]"
                        />
                    </div>
                </div> */}

                <div className='  pt-28 md:mt-0 md:pt-0'>
                    <div className="flex justify-center items-center p-4   text-xl font-bold bg-white  max-w-full text-zinc-900 max-md:px-5 rounded-[10px] md:mt-24 mx-3">
                        <div className="flex justify-between gap-4 ">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b348bb5914f01f4bea3769171d476deaec8d73658551a779924cf02048c40fc?apiKey=565f43eb1fcf430087160894dfb02980&"
                                className="shrink-0 my-auto aspect-[1.72] fill-blue-600 w-[52px]"
                            />
                            <div>Professional Profiling</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 max-w-full mt-3 px-3">
                        <div className="col-span-12 md:col-span-3 w-full">
                            <PlayerCard/>
                        </div>
                        <div className="col-span-9">
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className='flex-1 w-full'>
                                    <StatsD/>
                                </div>
                                <div className='flex-1 items-center justify-center'>
                                   <RadarChart />
                                </div>
                            </div>
                            <div className="flex flex-col   mr-6 md:mr-0 px-6 py-8 mt-3 bg-white rounded-[10px] max-md:px-5 max-md:max-w-full">
                                <div className="justify-center self-start text-3xl font-bold text-zinc-900">
                                    Vidéo test collective
                                </div>
                                <div className="flex flex-col justify-center mt-6 max-md:max-w-full">
                                    <div className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-20 min-h-[380px] max-md:px-5 max-md:max-w-full">
                                        <img
                                            loading="lazy"
                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/35b4f8b0a83ec0f28ea66e73e53832713fd3c41ffc50f7dc5492370b5e0ad48b?apiKey=565f43eb1fcf430087160894dfb02980&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/35b4f8b0a83ec0f28ea66e73e53832713fd3c41ffc50f7dc5492370b5e0ad48b?apiKey=565f43eb1fcf430087160894dfb02980&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/35b4f8b0a83ec0f28ea66e73e53832713fd3c41ffc50f7dc5492370b5e0ad48b?apiKey=565f43eb1fcf430087160894dfb02980&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/35b4f8b0a83ec0f28ea66e73e53832713fd3c41ffc50f7dc5492370b5e0ad48b?apiKey=565f43eb1fcf430087160894dfb02980&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/35b4f8b0a83ec0f28ea66e73e53832713fd3c41ffc50f7dc5492370b5e0ad48b?apiKey=565f43eb1fcf430087160894dfb02980&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/35b4f8b0a83ec0f28ea66e73e53832713fd3c41ffc50f7dc5492370b5e0ad48b?apiKey=565f43eb1fcf430087160894dfb02980&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/35b4f8b0a83ec0f28ea66e73e53832713fd3c41ffc50f7dc5492370b5e0ad48b?apiKey=565f43eb1fcf430087160894dfb02980&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/35b4f8b0a83ec0f28ea66e73e53832713fd3c41ffc50f7dc5492370b5e0ad48b?apiKey=565f43eb1fcf430087160894dfb02980&"
                                            className="object-cover absolute inset-0 size-full"
                                        />
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d596f7eb90cf572345ffcf85e085370e9d30d7dc837c4d3b4c64dc6c16657db?apiKey=565f43eb1fcf430087160894dfb02980&"
                                            className="mt-20 mb-11 aspect-square w-[70px] max-md:my-10"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>



                </div>
            </div>
        </>

    )
}
export default Professionalprofile2