import github from "@/app/assets/logos/github.svg";
import amazon from "@/app/assets/logos/amazon.svg";
import battleNet from "@/app/assets/logos/battlenet.svg";
import discord from "@/app/assets/logos/discord.svg";
import disney from "@/app/assets/logos/disney.svg";
import google from "@/app/assets/logos/google.svg";
import hboMax from "@/app/assets/logos/hbo.svg";
import millenium from "@/app/assets/logos/mille.svg";
import netflix from "@/app/assets/logos/netflix.svg";
import prime from "@/app/assets/logos/prime video.svg";
import spotify from "@/app/assets/logos/spotify.svg";
import tinder from "@/app/assets/logos/tinder.svg";
export type Logos = keyof typeof logos;
const logos = {
  github,
  amazon,
  battleNet,
  discord,
  disney,
  google,
  hboMax,
  millenium,
  netflix,
  prime,
  spotify,
  tinder,
};
export default logos;
