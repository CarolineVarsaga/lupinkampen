import { FaMedal } from "react-icons/fa";
import { PiMedalFill } from "react-icons/pi";
import { IoIosMedal } from "react-icons/io";
import { BiSolidMedal } from "react-icons/bi";
import {
  GiDandelionFlower,
  GiFlowerEmblem,
  GiFlowerTwirl,
  GiLotusFlower,
  GiMedal,
  GiRibbonMedal,
  GiSportMedal,
  GiSpotedFlower,
  GiStarMedal,
  GiSunflower,
  GiVanillaFlower,
  GiVineFlower,
} from "react-icons/gi";
import { TbMedal, TbMedal2 } from "react-icons/tb";
import { RiMedal2Fill } from "react-icons/ri";
import { CiMedal } from "react-icons/ci";
import { IoMedalOutline } from "react-icons/io5";
import { BsFlower1 } from "react-icons/bs";

export const medals = [
  {
    name: "Lupinens fiende",
    icon: <PiMedalFill size={50} />,
    threshold: 1,
    message: "Grattis! Du har plockat din första lupin!",
  },
  {
    name: "Bivän",
    icon: <FaMedal size={50} />,
    threshold: 10,
    message: "Bra jobbat! Du har bidragit till pollinering.",
  },
  {
    name: "Medalj 3",
    icon: <IoIosMedal size={50} />,
    threshold: 20,
    message: "Fantastiskt! Du är en blomsterälskare.",
  },
  {
    name: "Medalj 4",
    icon: <BiSolidMedal size={50} />,
    threshold: 30,
    message: "Du gör ett bra jobb med att skydda växterna!",
  },
  {
    name: "Medalj 5",
    icon: <TbMedal size={50} />,
    threshold: 50,
    message: "Utmärkt! Du har samlat ihop många lupiner!",
  },
  {
    name: "Medalj 6",
    icon: <RiMedal2Fill size={50} />,
    threshold: 80,
    message: "Fantastiskt engagemang för växtligheten.",
  },
  {
    name: "Medalj 7",
    icon: <TbMedal2 size={50} />,
    threshold: 100,
    message: "Du är en riktig växtälskare!",
  },
  {
    name: "Medalj 8",
    icon: <CiMedal size={50} />,
    threshold: 125,
    message: "Bra jobbat! Du har samlat många lupiner!",
  },
  {
    name: "Medalj 9",
    icon: <IoMedalOutline size={50} />,
    threshold: 150,
    message: "Du är på väg att bli en expert!",
  },
  {
    name: "Medalj 10",
    icon: <GiSportMedal size={50} />,
    threshold: 180,
    message: "Utmärkt! Du har gjort stora framsteg!",
  },
  {
    name: "Medalj 11",
    icon: <GiFlowerEmblem size={50} />,
    threshold: 220,
    message: "Stort grattis, du är en pionjär inom biologisk mångfald!",
  },
  {
    name: "Medalj 12",
    icon: <GiDandelionFlower size={50} />,
    threshold: 260,
    message: "Fantastiskt arbete för miljön!",
  },
  {
    name: "Medalj 13",
    icon: <BsFlower1 size={50} />,
    threshold: 300,
    message: "Du är verkligen en hjälte för växterna!",
  },
  {
    name: "Medalj 14",
    icon: <GiFlowerTwirl size={50} />,
    threshold: 350,
    message: "Fortsätt det fantastiska arbetet!",
  },
  {
    name: "Medalj 15",
    icon: <GiVanillaFlower size={50} />,
    threshold: 400,
    message: "Du har verkligen gjort skillnad för naturen!",
  },
  {
    name: "Medalj 16",
    icon: <GiLotusFlower size={50} />,
    threshold: 450,
    message: "Stort grattis till ditt engagemang!",
  },
  {
    name: "Medalj 17",
    icon: <GiVineFlower size={50} />,
    threshold: 500,
    message: "Fantastiskt arbete för mångfalden!",
  },
  {
    name: "Medalj 18",
    icon: <GiSunflower size={50} />,
    threshold: 600,
    message: "Du är verkligen en växtens beskyddare!",
  },
  {
    name: "Medalj 19",
    icon: <GiSpotedFlower size={50} />,
    threshold: 700,
    message: "Bra jobbat! Du är en stjärna för biodiversitet!",
  },
  {
    name: "Medalj 20",
    icon: <GiMedal size={50} />,
    threshold: 800,
    message: "Du har nått nya höjder!",
  },
  {
    name: "Medalj 21",
    icon: <GiRibbonMedal size={50} />,
    threshold: 900,
    message: "Stort grattis, du är en mästare på att plocka lupiner!",
  },
  {
    name: "Mångfaldens väktare",
    icon: <GiStarMedal size={50} />,
    threshold: 1000,
    message: "En fantastisk prestation för biodiversitet!",
  },
];
