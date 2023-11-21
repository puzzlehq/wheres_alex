import { useAtom } from "jotai";
import { mapStepAtom } from "../App";
import map_0 from '../assets/map/map_0.png'
import map_gif from '../assets/map/map_gif.gif';

const MapImage = () => {
  const [mapState, _] = useAtom(mapStepAtom)

  return (
    <img
      src={mapState ? map_gif : map_0}
      alt='Treasure Map'
      className='fixed justify-center items-center w-screen bottom-0 left-0 object-contain'
      style={{
        transformOrigin: 'center bottom'
      }}
    />
  )
}

export default MapImage;