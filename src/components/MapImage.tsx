import { useAtom } from "jotai";
import { mapStepAtom } from "../App";
import map_0 from '../assets/map/map_0.png'
import map_1 from '../assets/map/map_1.png'
import map_2 from '../assets/map/map_2.png'
import map_3 from '../assets/map/map_3.png'

const MAP_COUNT = 4;

const MapImage = () => {
  const [mapState, _] = useAtom(mapStepAtom)

  let img: string;

  switch (mapState % MAP_COUNT) {
    case (0):
      img = map_0;
      break;
    case (1):
      img = map_1;
      break;
    case (2):
      img = map_2;
      break;
    case (3):
      img = map_3;
      break;
    default:
      img = map_0;
      break;
  }

  return (
    <img
      src={img}
      alt='Treasure Map'
      className='fixed justify-center items-center w-screen bottom-0 left-0 object-contain'
      style={{
        transformOrigin: 'center bottom'
      }}
    />
  )
}

export default MapImage;