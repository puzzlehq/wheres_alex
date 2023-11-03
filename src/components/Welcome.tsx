import rightImageSrc from '../assets/alex_mic_left_tilt.png';
import leftImageSrc from '../assets/alex_mic_right_tilt.png';
import bottomImageSrc from '../assets/alexbottom.png';

export const Welcome = ({ onConnectWallet }: { onConnectWallet: () => void }) => {
  return (
    <div className="h-screen flex w-full justify-between items-stretch">
      <div className="relative flex w-full flex-col justify-center items-center h-full">

        <img src={rightImageSrc} alt="Right top decoration" className="absolute top-0 right-0 h-full max-w-[50%] max-h-[18rem] object-contain z-0" />

        <img src={leftImageSrc} alt="Left decoration" className="absolute top-1/4 left-0 h-full max-w-[80%] max-h-[20rem] object-contain transform -translate-x-1/4 -translate-y-20 w-3/5 z-0" />

        <h1 className="z-5 text-white text-center text-24xl font-extrabold leading-[40.56px] tracking-tight whitespace-nowrap max-w-full overflow-visible">
            WHERE <br /> IS ALEX?{" "}
        </h1>
        <p
          className="z-10 text-white text-center text-base font-bold tracking-tight max-w-[400px] mt-8"
        >
            A thrilling game showcasing the power of Aleo and the Puzzle multiparty privacy stack through a wager between friends!
        </p>
        <button
            onClick={onConnectWallet}
            className="z-10 bg-yellow-300 flex justify-center items-center mt-7 px-5 py-8 rounded-[200px] text-black text-4xl font-extrabold w-1/2 hover:bg-yellow-400"
        >
            Play!
        </button>

        <img src={bottomImageSrc} alt="bottom decoration" className="absolute bottom-0 center h-full max-w-[35%] max-h-[12rem] object-contain transform -translate-y-100 w-3/5 z-0" />
      </div>
    </div>
  );
}