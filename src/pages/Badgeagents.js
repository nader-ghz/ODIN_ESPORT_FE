import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header2";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Pagetitle from "../components/Pagetitle";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Config } from "../config";
import Select, { components } from "react-select";
import LeftMenu from "../components/LeftMenu";
import secureLocalStorage from "react-secure-storage";

const paysAllInfo = [
  {
    name: "Andorre",
    nationalite: "Andorrane",
    region: "Europe",
    timezones: {
      "Europe/Andorra": "+02:00",
    },
    iso: {
      "alpha-2": "AD",
      "alpha-3": "AND",
      numeric: "020",
    },
    phone: ["+376"],
    emoji: "AD",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AD.svg",
    phoneLength: 6,
  },
  {
    name: "Emirats arabes unis",
    nationalite: "Emirienne",
    region: "Asie",
    timezones: {
      "Asia/Dubai": "+04:00",
    },
    iso: {
      "alpha-2": "AE",
      "alpha-3": "ARE",
      numeric: "784",
    },
    phone: ["+971"],
    emoji: "🇦🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AE.svg",
    phoneLength: 9,
  },
  {
    name: "Afghanistan",
    nationalite: "Afghane",
    region: "Asie",
    timezones: {
      "Asia/Kabul": "+04:30",
    },
    iso: {
      "alpha-2": "AF",
      "alpha-3": "AFG",
      numeric: "004",
    },
    phone: ["+93"],
    emoji: "🇦🇫",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AF.svg",
    phoneLength: 9,
  },

  {
    name: "Antigua et Barbuda",
    nationalite: "Antiguayenne",
    region: "Amerique",
    timezones: {
      "America/Antigua": "-04:00",
    },
    iso: {
      "alpha-2": "AG",
      "alpha-3": "ATG",
      numeric: "028",
    },
    phone: ["+1-268"],
    emoji: "🇦🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AG.svg",
    phoneLength: 10,
  },
  {
    name: "Anguilla",
    nationalite: "Anguillan",
    region: "Amerique",
    timezones: {
      "America/Anguilla": "-04:00",
    },
    iso: {
      "alpha-2": "AI",
      "alpha-3": "AIA",
      numeric: "660",
    },
    phone: ["+1-264"],
    emoji: "🇦🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AI.svg",
    phoneLength: 10,
  },
  {
    name: "Albanie",
    nationalite: "Albanaise",
    region: "Europe",
    timezones: {
      "Europe/Tirane": "+02:00",
    },
    iso: {
      "alpha-2": "AL",
      "alpha-3": "ALB",
      numeric: "008",
    },
    phone: ["+355"],
    emoji: "🇦🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AL.svg",
    phoneLength: 9,
  },
  {
    name: "Arménie",
    nationalite: "Arménienne",
    region: "Asie",
    timezones: {
      "Asia/Yerevan": "+04:00",
    },
    iso: {
      "alpha-2": "AM",
      "alpha-3": "ARM",
      numeric: "051",
    },
    phone: ["+374"],
    emoji: "🇦🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AM.svg",
    phoneLength: 6,
  },
  {
    name: "Angola",
    nationalite: "Angolaise",
    region: "Afrique",
    timezones: {
      "Afrique/Luanda": "+01:00",
    },
    iso: {
      "alpha-2": "AO",
      "alpha-3": "AGO",
      numeric: "024",
    },
    phone: ["+244"],
    emoji: "🇦🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AO.svg",
    phoneLength: 9,
  },

  {
    name: "Argentine",
    nationalite: "Argentine",
    region: "Amerique",
    timezones: {
      "America/Argentina/Buenos_Aires": "-03:00",
      "America/Argentina/Catamarca": "-03:00",
      "America/Argentina/Cordoba": "-03:00",
      "America/Argentina/Jujuy": "-03:00",
      "America/Argentina/La_Rioja": "-03:00",
      "America/Argentina/Mendoza": "-03:00",
      "America/Argentina/Rio_Gallegos": "-03:00",
      "America/Argentina/Salta": "-03:00",
      "America/Argentina/San_Juan": "-03:00",
      "America/Argentina/San_Luis": "-03:00",
      "America/Argentina/Tucuman": "-03:00",
      "America/Argentina/Ushuaia": "-03:00",
    },
    iso: {
      "alpha-2": "AR",
      "alpha-3": "ARG",
      numeric: "032",
    },
    phone: ["+54"],
    emoji: "🇦🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AR.svg",
    phoneLength: [6, 7, 8],
  },
  {
    name: "Samoa américaines",
    nationalite: "samoane",
    region: "Océanie",
    timezones: {
      "Pacific/Pago_Pago": "-11:00",
    },
    iso: {
      "alpha-2": "AS",
      "alpha-3": "ASM",
      numeric: "016",
    },
    phone: ["+1-684"],
    emoji: "🇦🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AS.svg",
    phoneLength: 10,
  },
  {
    name: "Austriche",
    nationalite: "Autrichienne",
    region: "Europe",
    timezones: {
      "Europe/Vienna": "+02:00",
    },
    iso: {
      "alpha-2": "AT",
      "alpha-3": "AUT",
      numeric: "040",
    },
    phone: ["+43"],
    emoji: "🇦🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AT.svg",
    phoneLength: [10, 11],
  },
  {
    name: "Australie",
    nationalite: "Australienne",
    region: "Océanie",
    timezones: {
      "Antarctica/Macquarie": "+10:00",
      "Australia/Adelaide": "+09:30",
      "Australia/Brisbane": "+10:00",
      "Australia/Broken_Hill": "+09:30",
      "Australia/Darwin": "+09:30",
      "Australia/Eucla": "+08:45",
      "Australia/Hobart": "+10:00",
      "Australia/Lindeman": "+10:00",
      "Australia/Lord_Howe": "+10:30",
      "Australia/Melbourne": "+10:00",
      "Australia/Perth": "+08:00",
      "Australia/Sydney": "+10:00",
    },
    iso: {
      "alpha-2": "AU",
      "alpha-3": "AUS",
      numeric: "036",
    },
    phone: ["+61"],
    emoji: "🇦🇺",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AU.svg",
    phoneLength: 9,
  },
  {
    name: "Aruba",
    nationalite: "Arubéens",
    region: "Amérique",
    timezones: {
      "America/Aruba": "-04:00",
    },
    iso: {
      "alpha-2": "AW",
      "alpha-3": "ABW",
      numeric: "533",
    },
    phone: ["+297"],
    emoji: "🇦🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AW.svg",
    phoneLength: 7,
  },
  {
    name: "Aaland",
    nationalite: "Aalandaise",
    region: "Europe",
    timezones: {
      "Europe/Mariehamn": "+03:00",
    },
    iso: {
      "alpha-2": "AX",
      "alpha-3": "ALA",
      numeric: "248",
    },
    phone: ["+358-18"],
    emoji: "🇦🇽",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AX.svg",
  },
  {
    name: "Azerbaijan",
    nationalite: "azerbaïdjanaise",
    region: "Asie",
    timezones: {
      "Asia/Baku": "+04:00",
    },
    iso: {
      "alpha-2": "AZ",
      "alpha-3": "AZE",
      numeric: "031",
    },
    phone: ["+994"],
    emoji: "🇦🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AZ.svg",
    phoneLength: 9,
  },
  {
    name: "Bosnie-Herzégovine",
    nationalite: "Bosnienne",
    region: "Europe",
    timezones: {
      "Europe/Sarajevo": "+02:00",
    },
    iso: {
      "alpha-2": "BA",
      "alpha-3": "BIH",
      numeric: "070",
    },
    phone: ["+387"],
    emoji: "🇧🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BA.svg",
    phoneLength: 8,
  },
  {
    name: "Barbade",
    nationalite: "Barbadienne",
    region: "Amérique",
    timezones: {
      "America/Barbados": "-04:00",
    },
    iso: {
      "alpha-2": "BB",
      "alpha-3": "BRB",
      numeric: "052",
    },
    phone: ["+1-246"],
    emoji: "🇧🇧",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BB.svg",
    phoneLength: 10,
  },
  {
    name: "Bangladesh",
    nationalite: "Bangladaise",
    region: "Asie",
    timezones: {
      "Asia/Dhaka": "+06:00",
    },
    iso: {
      "alpha-2": "BD",
      "alpha-3": "BGD",
      numeric: "050",
    },
    phone: ["+880"],
    emoji: "🇧🇩",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BD.svg",
    phoneLength: 10,
  },
  {
    name: "Belgique",
    nationalite: "Belge",
    region: "Europe",
    timezones: {
      "Europe/Brussels": "+02:00",
    },
    iso: {
      "alpha-2": "BE",
      "alpha-3": "BEL",
      numeric: "056",
    },
    phone: ["+32"],
    emoji: "🇧🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BE.svg",
    phoneLength: 9,
  },
  {
    name: "Burkina Faso",
    nationalite: "Burkinabé",
    region: "Afrique",
    timezones: {
      "Afrique/Ouagadougou": "+00:00",
    },
    iso: {
      "alpha-2": "BF",
      "alpha-3": "BFA",
      numeric: "854",
    },
    phone: ["+226"],
    emoji: "🇧🇫",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BF.svg",
    phoneLength: 8,
  },
  {
    name: "Bulgarie",
    nationalite: "Bulgare",
    region: "Europe",
    timezones: {
      "Europe/Sofia": "+03:00",
    },
    iso: {
      "alpha-2": "BG",
      "alpha-3": "BGR",
      numeric: "100",
    },
    phone: ["+359"],
    emoji: "🇧🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BG.svg",
    phoneLength: 9,
  },
  {
    name: "Bahrein",
    nationalite: "Bahreïnienne",
    region: "Asie",
    timezones: {
      "Asia/Bahrain": "+03:00",
    },
    iso: {
      "alpha-2": "BH",
      "alpha-3": "BHR",
      numeric: "048",
    },
    phone: ["+973"],
    emoji: "🇧🇭",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BH.svg",
    phoneLength: 8,
  },
  {
    name: "Burundi",
    nationalite: "Burundaise",
    region: "Afrique",
    timezones: {
      "Afrique/Bujumbura": "+02:00",
    },
    iso: {
      "alpha-2": "BI",
      "alpha-3": "BDI",
      numeric: "108",
    },
    phone: ["+257"],
    emoji: "🇧🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BI.svg",
    phoneLength: 8,
  },
  {
    name: "Bénin",
    nationalite: "Béninoise",
    region: "Afrique",
    timezones: {
      "Afrique/Porto-Novo": "+01:00",
    },
    iso: {
      "alpha-2": "BJ",
      "alpha-3": "BEN",
      numeric: "204",
    },
    phone: ["+229"],
    emoji: "🇧🇯",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BJ.svg",
    phoneLength: 8,
  },
  {
    name: "Saint Barthélemy",
    nationalite: "Barthéloméenne",
    region: "Amérique",
    timezones: {
      "America/St_Barthelemy": "-04:00",
    },
    iso: {
      "alpha-2": "BL",
      "alpha-3": "BLM",
      numeric: "652",
    },
    phone: ["+590"],
    emoji: "🇧🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BL.svg",
    phoneLength: 9,
  },
  {
    name: "Bermudes",
    nationalite: "Bermudienne",
    region: "Amérique",
    timezones: {
      "Atlantic/Bermuda": "-03:00",
    },
    iso: {
      "alpha-2": "BM",
      "alpha-3": "BMU",
      numeric: "060",
    },
    phone: ["+1-441"],
    emoji: "🇧🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BM.svg",
    phoneLength: 10,
  },
  {
    name: "Brunei Darussalam",
    nationalite: "Brunéienne",
    region: "Asie",
    timezones: {
      "Asia/Brunei": "+08:00",
    },
    iso: {
      "alpha-2": "BN",
      "alpha-3": "BRN",
      numeric: "096",
    },
    phone: ["+673"],
    emoji: "🇧🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BN.svg",
    phoneLength: 7,
  },
  {
    name: "Bolivie",
    nationalite: "Bolivienne",
    region: "Amérique",
    timezones: {
      "America/La_Paz": "-04:00",
    },
    iso: {
      "alpha-2": "BO",
      "alpha-3": "BOL",
      numeric: "068",
    },
    phone: ["+591"],
    emoji: "🇧🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BO.svg",
    phoneLength: 9,
  },
  {
    name: "Brésil",
    nationalite: "Brésilienne",
    region: "Amérique",
    timezones: {
      "America/Araguaina": "-03:00",
      "America/Bahia": "-03:00",
      "America/Belem": "-03:00",
      "America/Boa_Vista": "-04:00",
      "America/Campo_Grande": "-04:00",
      "America/Cuiaba": "-04:00",
      "America/Eirunepe": "-05:00",
      "America/Fortaleza": "-03:00",
      "America/Maceio": "-03:00",
      "America/Manaus": "-04:00",
      "America/Noronha": "-02:00",
      "America/Porto_Velho": "-04:00",
      "America/Recife": "-03:00",
      "America/Rio_Branco": "-05:00",
      "America/Santarem": "-03:00",
      "America/Sao_Paulo": "-03:00",
    },
    iso: {
      "alpha-2": "BR",
      "alpha-3": "BRA",
      numeric: "076",
    },
    phone: ["+55"],
    emoji: "🇧🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BR.svg",
    phoneLength: 11,
  },
  {
    name: "Bahamas",
    nationalite: "Bahaméenne",
    region: "Amérique",
    timezones: {
      "America/Nassau": "-04:00",
    },
    iso: {
      "alpha-2": "BS",
      "alpha-3": "BHS",
      numeric: "044",
    },
    phone: ["+1-242"],
    emoji: "🇧🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BS.svg",
    phoneLength: 10,
  },
  {
    name: "Bhoutan",
    nationalite: "Bhoutanaise",
    region: "Asie",
    timezones: {
      "Asia/Thimphu": "+06:00",
    },
    iso: {
      "alpha-2": "BT",
      "alpha-3": "BTN",
      numeric: "064",
    },
    phone: ["+975"],
    emoji: "🇧🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BT.svg",
    phoneLength: 7,
  },
  {
    phoneLength: 10,
  },
  {
    name: "Botswana",
    nationalite: "Botswanaise",
    region: "Afrique",
    timezones: {
      "Afrique/Gaborone": "+02:00",
    },
    iso: {
      "alpha-2": "BW",
      "alpha-3": "BWA",
      numeric: "072",
    },
    phone: ["+267"],
    emoji: "🇧🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BW.svg",
    phoneLength: 7,
  },
  {
    name: "Biélorussie",
    nationalite: "Biélorusse",
    region: "Europe",
    timezones: {
      "Europe/Minsk": "+03:00",
    },
    iso: {
      "alpha-2": "BY",
      "alpha-3": "BLR",
      numeric: "112",
    },
    phone: ["+375"],
    emoji: "🇧🇾",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BY.svg",
    phoneLength: 9,
  },
  {
    name: "Belize",
    nationalite: "Bélizienne",
    region: "Amérique",
    timezones: {
      "America/Belize": "-06:00",
    },
    iso: {
      "alpha-2": "BZ",
      "alpha-3": "BLZ",
      numeric: "084",
    },
    phone: ["+501"],
    emoji: "🇧🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BZ.svg",
    phoneLength: 7,
  },
  {
    name: "Canada",
    nationalite: "Canadienne",
    region: "Amérique",
    timezones: {
      "America/Atikokan": "-05:00",
      "America/Blanc-Sablon": "-04:00",
      "America/Cambridge_Bay": "-06:00",
      "America/Creston": "-07:00",
      "America/Dawson": "-07:00",
      "America/Dawson_Creek": "-07:00",
      "America/Edmonton": "-06:00",
      "America/Fort_Nelson": "-07:00",
      "America/Glace_Bay": "-03:00",
      "America/Goose_Bay": "-03:00",
      "America/Halifax": "-03:00",
      "America/Inuvik": "-06:00",
      "America/Iqaluit": "-04:00",
      "America/Moncton": "-03:00",
      "America/Rankin_Inlet": "-05:00",
      "America/Regina": "-06:00",
      "America/Resolute": "-05:00",
      "America/St_Johns": "-02:30",
      "America/Swift_Current": "-06:00",
      "America/Toronto": "-04:00",
      "America/Vancouver": "-07:00",
      "America/Whitehorse": "-07:00",
      "America/Winnipeg": "-05:00",
    },
    iso: {
      "alpha-2": "CA",
      "alpha-3": "CAN",
      numeric: "124",
    },
    phone: ["+1"],
    emoji: "🇨🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CA.svg",
    phoneLength: 10,
  },

  {
    name: "République démocratique du Congo",
    nationalite: "Congolaise (RDC)",
    region: "Afrique",
    timezones: {
      "Afrique/Kinshasa": "+01:00",
      "Afrique/Lubumbashi": "+02:00",
    },
    iso: {
      "alpha-2": "CD",
      "alpha-3": "COD",
      numeric: "180",
    },
    phone: ["+243"],
    emoji: "🇨🇩",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CD.svg",
    phoneLength: 7,
  },
  {
    name: "Republique Centrafricaine",
    nationalite: "Centrafricaine",
    region: "Afrique",
    timezones: {
      "Afrique/Bangui": "+01:00",
    },
    iso: {
      "alpha-2": "CF",
      "alpha-3": "CAF",
      numeric: "140",
    },
    phone: ["+236"],
    emoji: "🇨🇫",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CF.svg",
    phoneLength: 8,
  },
  {
    name: "Congo",
    nationalite: "Congolaise",
    region: "Afrique",
    timezones: {
      "Afrique/Brazzaville": "+01:00",
    },
    iso: {
      "alpha-2": "CG",
      "alpha-3": "COG",
      numeric: "178",
    },
    phone: ["+242"],
    emoji: "🇨🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CG.svg",
    phoneLength: 9,
  },
  {
    name: "Suisse",
    nationalite: "Suisse",
    region: "Europe",
    timezones: {
      "Europe/Zurich": "+02:00",
    },
    iso: {
      "alpha-2": "CH",
      "alpha-3": "CHE",
      numeric: "756",
    },
    phone: ["+41"],
    emoji: "🇨🇭",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CH.svg",
    phoneLength: 9,
  },
  {
    name: "Côte d'Ivoire",
    nationalite: "Ivoirienne",
    region: "Afrique",
    timezones: {
      "Afrique/Abidjan": "+00:00",
    },
    iso: {
      "alpha-2": "CI",
      "alpha-3": "CIV",
      numeric: "384",
    },
    phone: ["+225"],
    emoji: "🇨🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CI.svg",
    phoneLength: 8,
  },

  {
    name: "Chili",
    nationalite: "Chilienne",
    region: "Amérique",
    timezones: {
      "America/Punta_Arenas": "-03:00",
      "America/Santiago": "-04:00",
      "Pacific/Easter": "-06:00",
    },
    iso: {
      "alpha-2": "CL",
      "alpha-3": "CHL",
      numeric: "152",
    },
    phone: ["+56"],
    emoji: "🇨🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CL.svg",
    phoneLength: 9,
  },
  {
    name: "Cameroun",
    nationalite: "Camerounaise",
    region: "Afrique",
    timezones: {
      "Afrique/Douala": "+01:00",
    },
    iso: {
      "alpha-2": "CM",
      "alpha-3": "CMR",
      numeric: "120",
    },
    phone: ["+237"],
    emoji: "🇨🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CM.svg",
    phoneLength: 9,
  },
  {
    name: "Chine",
    nationalite: "Chinoise",
    region: "Asie",
    timezones: {
      "Asia/Shanghai": "+08:00",
      "Asia/Urumqi": "+06:00",
    },
    iso: {
      "alpha-2": "CN",
      "alpha-3": "CHN",
      numeric: "156",
    },
    phone: ["+86"],
    emoji: "🇨🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CN.svg",
    phoneLength: 11,
  },
  {
    name: "Colombie",
    nationalite: "Colombienne",
    region: "Amérique",
    timezones: {
      "America/Bogota": "-05:00",
    },
    iso: {
      "alpha-2": "CO",
      "alpha-3": "COL",
      numeric: "170",
    },
    phone: ["+57"],
    emoji: "🇨🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CO.svg",
    phoneLength: 10,
  },
  {
    name: "Costa Rica",
    nationalite: "Costaricienne",
    region: "Amérique",
    timezones: {
      "America/Costa_Rica": "-06:00",
    },
    iso: {
      "alpha-2": "CR",
      "alpha-3": "CRI",
      numeric: "188",
    },
    phone: ["+506"],
    emoji: "🇨🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CR.svg",
    phoneLength: 8,
  },
  {
    name: "Cuba",
    nationalite: "Cubaine",
    region: "Amérique",
    timezones: {
      "America/Havana": "-04:00",
    },
    iso: {
      "alpha-2": "CU",
      "alpha-3": "CUB",
      numeric: "192",
    },
    phone: ["+53"],
    emoji: "🇨🇺",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CU.svg",
    phoneLength: 8,
  },
  {
    name: "Cap Vert",
    nationalite: "Cap-verdienne",
    region: "Afrique",
    timezones: {
      "Atlantic/Cape_Verde": "-01:00",
    },
    iso: {
      "alpha-2": "CV",
      "alpha-3": "CPV",
      numeric: "132",
    },
    phone: ["+238"],
    emoji: "🇨🇻",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CV.svg",
    phoneLength: 7,
  },
  {
    name: "Curaçao",
    nationalite: "Curacien",
    region: "Amérique",
    timezones: {
      "America/Curacao": "-04:00",
    },
    iso: {
      "alpha-2": "CW",
      "alpha-3": "CUW",
      numeric: "531",
    },
    phone: ["+599"],
    emoji: "🇨🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CW.svg",
    phoneLength: 7,
  },
  {
    name: "Île Christmas",
    nationalite: "Île Christmas",
    region: "Océanie",
    timezones: {
      "Indian/Christmas": "+07:00",
    },
    iso: {
      "alpha-2": "CX",
      "alpha-3": "CXR",
      numeric: "162",
    },
    phone: ["+61"],
    emoji: "🇨🇽",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CX.svg",
    phoneLength: 9,
  },
  {
    name: "Chypre",
    nationalite: "Chypriote",
    region: "Asie",
    timezones: {
      "Asia/Famagusta": "+03:00",
      "Asia/Nicosia": "+03:00",
    },
    iso: {
      "alpha-2": "CY",
      "alpha-3": "CYP",
      numeric: "196",
    },
    phone: ["+357"],
    emoji: "🇨🇾",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CY.svg",
    phoneLength: 8,
  },
  {
    name: "République tchèque",
    nationalite: "Tchèque",
    region: "Europe",
    timezones: {
      "Europe/Prague": "+02:00",
    },
    iso: {
      "alpha-2": "CZ",
      "alpha-3": "CZE",
      numeric: "203",
    },
    phone: ["+420"],
    emoji: "🇨🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CZ.svg",
    phoneLength: 9,
  },
  {
    name: "Allemagne",
    nationalite: "allemande",
    region: "Europe",
    timezones: {
      "Europe/Berlin": "+02:00",
      "Europe/Busingen": "+02:00",
    },
    iso: {
      "alpha-2": "DE",
      "alpha-3": "DEU",
      numeric: "276",
    },
    phone: ["+49"],
    emoji: "🇩🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DE.svg",
    phoneLength: 10,
  },
  {
    name: "Djibouti",
    nationalite: "Djiboutienne",
    region: "Afrique",
    timezones: {
      "Afrique/Djibouti": "+03:00",
    },
    iso: {
      "alpha-2": "DJ",
      "alpha-3": "DJI",
      numeric: "262",
    },
    phone: ["+253"],
    emoji: "🇩🇯",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DJ.svg",
    phoneLength: 10,
  },
  {
    name: "Danemark",
    nationalite: "Danoise",
    region: "Europe",
    timezones: {
      "Europe/Copenhagen": "+02:00",
    },
    iso: {
      "alpha-2": "DK",
      "alpha-3": "DNK",
      numeric: "208",
    },
    phone: ["+45"],
    emoji: "🇩🇰",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DK.svg",
    phoneLength: 8,
  },
  {
    name: "Dominique",
    nationalite: "Dominiquaise",
    region: "Amérique",
    timezones: {
      "America/Dominica": "-04:00",
    },
    iso: {
      "alpha-2": "DM",
      "alpha-3": "DMA",
      numeric: "212",
    },
    phone: ["+1-767"],
    emoji: "🇩🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DM.svg",
    phoneLength: 10,
  },
  {
    name: "République dominicaine",
    nationalite: "Dominicaine",
    region: "Amérique",
    timezones: {
      "America/Santo_Domingo": "-04:00",
    },
    iso: {
      "alpha-2": "DO",
      "alpha-3": "DOM",
      numeric: "214",
    },
    phone: ["+1-809", "+1-829"],
    emoji: "🇩🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DO.svg",
    phoneLength: 10,
  },
  {
    name: "Algerie",
    nationalite: "Algérienne",
    region: "Afrique",
    timezones: {
      "Afrique/Algiers": "+01:00",
    },
    iso: {
      "alpha-2": "DZ",
      "alpha-3": "DZA",
      numeric: "012",
    },
    phone: ["+213"],
    emoji: "🇩🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DZ.svg",
    phoneLength: 9,
  },
  {
    name: "Equateur",
    nationalite: "Equatorienne",
    region: "Amérique",
    timezones: {
      "America/Guayaquil": "-05:00",
      "Pacific/Galapagos": "-06:00",
    },
    iso: {
      "alpha-2": "EC",
      "alpha-3": "ECU",
      numeric: "218",
    },
    phone: ["+593"],
    emoji: "🇪🇨",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EC.svg",
    phoneLength: 9,
  },
  {
    name: "Estonie",
    nationalite: "Estonienne",
    region: "Europe",
    timezones: {
      "Europe/Tallinn": "+03:00",
    },
    iso: {
      "alpha-2": "EE",
      "alpha-3": "EST",
      numeric: "233",
    },
    phone: ["+372"],
    emoji: "🇪🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EE.svg",
    phoneLength: 8,
  },
  {
    name: "Egypte",
    nationalite: "Egyptienne",
    region: "Afrique",
    timezones: {
      "Afrique/Cairo": "+02:00",
    },
    iso: {
      "alpha-2": "EG",
      "alpha-3": "EGY",
      numeric: "818",
    },
    phone: ["+20"],
    emoji: "🇪🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EG.svg",
    phoneLength: 10,
  },
  {
    phoneLength: 9,
  },
  {
    name: "Erythrée",
    nationalite: "Erythréenne",
    region: "Afrique",
    timezones: {
      "Afrique/Asmara": "+03:00",
    },
    iso: {
      "alpha-2": "ER",
      "alpha-3": "ERI",
      numeric: "232",
    },
    phone: ["+291"],
    emoji: "🇪🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ER.svg",
    phoneLength: 7,
  },
  {
    name: "Espagne",
    nationalite: "Espagnole",
    region: "Europe",
    timezones: {
      "Afrique/Ceuta": "+02:00",
      "Atlantic/Canary": "+01:00",
      "Europe/Madrid": "+02:00",
    },
    iso: {
      "alpha-2": "ES",
      "alpha-3": "ESP",
      numeric: "724",
    },
    phone: ["+34"],
    emoji: "🇪🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ES.svg",
    phoneLength: 9,
  },
  {
    name: "Ethiopie",
    nationalite: "Ethiopienne",
    region: "Afrique",
    timezones: {
      "Afrique/Addis_Ababa": "+03:00",
    },
    iso: {
      "alpha-2": "ET",
      "alpha-3": "ETH",
      numeric: "231",
    },
    phone: ["+251"],
    emoji: "🇪🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ET.svg",
    phoneLength: 9,
  },
  {
    name: "Finlande",
    nationalite: "Finlandaise",
    region: "Europe",
    timezones: {
      "Europe/Helsinki": "+03:00",
    },
    iso: {
      "alpha-2": "FI",
      "alpha-3": "FIN",
      numeric: "246",
    },
    phone: ["+358"],
    emoji: "🇫🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FI.svg",
  },
  {
    name: "Fidji",
    nationalite: "Fidjienne",
    region: "Océanie",
    timezones: {
      "Pacific/Fiji": "+12:00",
    },
    iso: {
      "alpha-2": "FJ",
      "alpha-3": "FJI",
      numeric: "242",
    },
    phone: ["+679"],
    emoji: "🇫🇯",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FJ.svg",
    phoneLength: 7,
  },
  {
    name: "îles Malouines",
    nationalite: "Malouine",
    region: "Amérique",
    timezones: {
      "Atlantic/Stanley": "-03:00",
    },
    iso: {
      "alpha-2": "FK",
      "alpha-3": "FLK",
      numeric: "238",
    },
    phone: ["+500"],
    emoji: "🇫🇰",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FK.svg",
    phoneLength: 5,
  },
  {
    name: "Micronésie",
    nationalite: "Micronésienne",
    region: "Océanie",
    timezones: {
      "Pacific/Chuuk": "+10:00",
      "Pacific/Kosrae": "+11:00",
      "Pacific/Pohnpei": "+11:00",
    },
    iso: {
      "alpha-2": "FM",
      "alpha-3": "FSM",
      numeric: "583",
    },
    phone: ["+691"],
    emoji: "🇫🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FM.svg",
    phoneLength: 7,
  },
  {
    name: "Iles Féroé",
    nationalite: "Féroïenne",
    region: "Europe",
    timezones: {
      "Atlantic/Faroe": "+01:00",
    },
    iso: {
      "alpha-2": "FO",
      "alpha-3": "FRO",
      numeric: "234",
    },
    phone: ["+298"],
    emoji: "🇫🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FO.svg",
    phoneLength: 5,
  },
  {
    name: "France",
    nationalite: "Française",
    region: "Europe",
    timezones: {
      "Europe/Paris": "+02:00",
    },
    iso: {
      "alpha-2": "FR",
      "alpha-3": "FRA",
      numeric: "250",
    },
    phone: ["+33"],
    emoji: "🇫🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FR.svg",
    phoneLength: 9,
  },
  {
    name: "Gabon",
    nationalite: "Gabonaise",
    region: "Afrique",
    timezones: {
      "Afrique/Libreville": "+01:00",
    },
    iso: {
      "alpha-2": "GA",
      "alpha-3": "GAB",
      numeric: "266",
    },
    phone: ["+241"],
    emoji: "🇬🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GA.svg",
    phoneLength: 7,
  },
  {
    name: "Royaume-Uni",
    nationalite: "Britannique",
    region: "Europe",
    timezones: {
      "Europe/London": "+01:00",
    },
    iso: {
      "alpha-2": "GB",
      "alpha-3": "GBR",
      numeric: "826",
    },
    phone: ["+44"],
    emoji: "🇬🇧",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GB.svg",
    phoneLength: 10,
  },
  {
    name: "Grenade",
    nationalite: "Grenadienne",
    region: "Amérique",
    timezones: {
      "America/Grenada": "-04:00",
    },
    iso: {
      "alpha-2": "GD",
      "alpha-3": "GRD",
      numeric: "308",
    },
    phone: ["+1-473"],
    emoji: "🇬🇩",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GD.svg",
    phoneLength: 10,
  },
  {
    name: "Géorgie",
    nationalite: "Géorgienne",
    region: "Asie",
    timezones: {
      "Asia/Tbilisi": "+04:00",
    },
    iso: {
      "alpha-2": "GE",
      "alpha-3": "GEO",
      numeric: "268",
    },
    phone: ["+995"],
    emoji: "🇬🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GE.svg",
    phoneLength: 9,
  },
  {
    name: "Guyane",
    nationalite: "Guyanaise",
    region: "Amérique",
    timezones: {
      "America/Cayenne": "-03:00",
    },
    iso: {
      "alpha-2": "GF",
      "alpha-3": "GUF",
      numeric: "254",
    },
    phone: ["+594"],
    emoji: "🇬🇫",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GF.svg",
    phoneLength: 9,
  },
  {
    name: "Guernsey",
    nationalite: "Guernesiaise",
    region: "Europe",
    timezones: {
      "Europe/Guernsey": "+01:00",
    },
    iso: {
      "alpha-2": "GG",
      "alpha-3": "GGY",
      numeric: "831",
    },
    phone: ["+44-1481"],
    emoji: "🇬🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GG.svg",
    phoneLength: 10,
  },
  {
    name: "Ghana",
    nationalite: "Ghanéenne",
    region: "Afrique",
    timezones: {
      "Afrique/Accra": "+00:00",
    },
    iso: {
      "alpha-2": "GH",
      "alpha-3": "GHA",
      numeric: "288",
    },
    phone: ["+233"],
    emoji: "🇬🇭",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GH.svg",
    phoneLength: 9,
  },
  {
    name: "Gibraltar",
    nationalite: "Gibraltarienne",
    region: "Europe",
    timezones: {
      "Europe/Gibraltar": "+02:00",
    },
    iso: {
      "alpha-2": "GI",
      "alpha-3": "GIB",
      numeric: "292",
    },
    phone: ["+350"],
    emoji: "🇬🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GI.svg",
    phoneLength: 8,
  },
  {
    name: "Greenland",
    nationalite: "Greenlandaise",
    region: "Amérique",
    timezones: {
      "America/Danmarkshavn": "+00:00",
      "America/Nuuk": "-02:00",
      "America/Scoresbysund": "+00:00",
      "America/Thule": "-03:00",
    },
    iso: {
      "alpha-2": "GL",
      "alpha-3": "GRL",
      numeric: "304",
    },
    phone: ["+299"],
    emoji: "🇬🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GL.svg",
    phoneLength: 6,
  },
  {
    name: "Gambie",
    nationalite: "Gambienne",
    region: "Afrique",
    timezones: {
      "Afrique/Banjul": "+00:00",
    },
    iso: {
      "alpha-2": "GM",
      "alpha-3": "GMB",
      numeric: "270",
    },
    phone: ["+220"],
    emoji: "🇬🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GM.svg",
    phoneLength: 7,
  },
  {
    name: "Guinée",
    nationalite: "Guinéenne",
    region: "Afrique",
    timezones: {
      "Afrique/Conakry": "+00:00",
    },
    iso: {
      "alpha-2": "GN",
      "alpha-3": "GIN",
      numeric: "324",
    },
    phone: ["+224"],
    emoji: "🇬🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GN.svg",
    phoneLength: 9,
  },
  {
    name: "Guadeloupe",
    nationalite: "Guadeloupéenne",
    region: "Amérique",
    timezones: {
      "America/Guadeloupe": "-04:00",
    },
    iso: {
      "alpha-2": "GP",
      "alpha-3": "GLP",
      numeric: "312",
    },
    phone: ["+590"],
    emoji: "🇬🇵",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GP.svg",
    phoneLength: 9,
  },
  {
    name: "Guinée équatoriale",
    nationalite: "Equatoguinéenne",
    region: "Afrique",
    timezones: {
      "Afrique/Malabo": "+01:00",
    },
    iso: {
      "alpha-2": "GQ",
      "alpha-3": "GNQ",
      numeric: "226",
    },
    phone: ["+240"],
    emoji: "🇬🇶",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GQ.svg",
    phoneLength: 9,
  },
  {
    name: "Grèce",
    nationalite: "Grecque",
    region: "Europe",
    timezones: {
      "Europe/Athens": "+03:00",
    },
    iso: {
      "alpha-2": "GR",
      "alpha-3": "GRC",
      numeric: "300",
    },
    phone: ["+30"],
    emoji: "🇬🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GR.svg",
    phoneLength: 10,
  },
  {
    name: "Guatemala",
    nationalite: "Guatémaltèque",
    region: "Amérique",
    timezones: {
      "America/Guatemala": "-06:00",
    },
    iso: {
      "alpha-2": "GT",
      "alpha-3": "GTM",
      numeric: "320",
    },
    phone: ["+502"],
    emoji: "🇬🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GT.svg",
    phoneLength: 8,
  },
  {
    name: "Guinée-Bissau",
    nationalite: "Bissaoguinéenne",
    region: "Afrique",
    timezones: {
      "Afrique/Bissau": "+00:00",
    },
    iso: {
      "alpha-2": "GW",
      "alpha-3": "GNB",
      numeric: "624",
    },
    phone: ["+245"],
    emoji: "🇬🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GW.svg",
    phoneLength: 9,
  },
  {
    name: "Guyana",
    nationalite: "Guyanienne",
    region: "Amérique",
    timezones: {
      "America/Guyana": "-04:00",
    },
    iso: {
      "alpha-2": "GY",
      "alpha-3": "GUY",
      numeric: "328",
    },
    phone: ["+592"],
    emoji: "🇬🇾",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GY.svg",
    phoneLength: 7,
  },
  {
    name: "Hong Kong",
    nationalite: "Hongkongaise",
    region: "Asie",
    timezones: {
      "Asia/Hong_Kong": "+08:00",
    },
    iso: {
      "alpha-2": "HK",
      "alpha-3": "HKG",
      numeric: "344",
    },
    phone: ["+852"],
    emoji: "🇭🇰",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HK.svg",
    phoneLength: 8,
  },
  {
    phoneLength: 10,
  },
  {
    name: "Honduras",
    nationalite: "Hondurienne",
    region: "Amérique",
    timezones: {
      "America/Tegucigalpa": "-06:00",
    },
    iso: {
      "alpha-2": "HN",
      "alpha-3": "HND",
      numeric: "340",
    },
    phone: ["+504"],
    emoji: "🇭🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HN.svg",
    phoneLength: 8,
  },
  {
    name: "Croatie",
    nationalite: "Croate",
    region: "Europe",
    timezones: {
      "Europe/Zagreb": "+02:00",
    },
    iso: {
      "alpha-2": "HR",
      "alpha-3": "HRV",
      numeric: "191",
    },
    phone: ["+385"],
    emoji: "🇭🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HR.svg",
    phoneLength: 9,
  },
  {
    name: "Haïti",
    nationalite: "Haïtienne",
    region: "Amérique",
    timezones: {
      "America/Port-au-Prince": "-04:00",
    },
    iso: {
      "alpha-2": "HT",
      "alpha-3": "HTI",
      numeric: "332",
    },
    phone: ["+509"],
    emoji: "🇭🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HT.svg",
    phoneLength: 8,
  },
  {
    name: "Hongrie",
    nationalite: "Hongroise",
    region: "Europe",
    timezones: {
      "Europe/Budapest": "+02:00",
    },
    iso: {
      "alpha-2": "HU",
      "alpha-3": "HUN",
      numeric: "348",
    },
    phone: ["+36"],
    emoji: "🇭🇺",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HU.svg",
    phoneLength: 9,
  },
  {
    name: "Indonésie",
    nationalite: "Indonésienne",
    region: "Asie",
    timezones: {
      "Asia/Jakarta": "+07:00",
      "Asia/Jayapura": "+09:00",
      "Asia/Makassar": "+08:00",
      "Asia/Pontianak": "+07:00",
    },
    iso: {
      "alpha-2": "ID",
      "alpha-3": "IDN",
      numeric: "360",
    },
    phone: ["+62"],
    emoji: "🇮🇩",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ID.svg",
    phoneLength: 11,
  },
  {
    name: "Irlande",
    nationalite: "Irlandaise",
    region: "Europe",
    timezones: {
      "Europe/Dublin": "+01:00",
    },
    iso: {
      "alpha-2": "IE",
      "alpha-3": "IRL",
      numeric: "372",
    },
    phone: ["+353"],
    emoji: "🇮🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IE.svg",
    phoneLength: 9,
  },
  {
    name: "Inde",
    nationalite: "Indienne",
    region: "Asie",
    timezones: {
      "Asia/Kolkata": "+05:30",
    },
    iso: {
      "alpha-2": "IN",
      "alpha-3": "IND",
      numeric: "356",
    },
    phone: ["+91"],
    emoji: "🇮🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg",
    phoneLength: 10,
  },
  {
    name: "Irak",
    nationalite: "Irakienne",
    region: "Asie",
    timezones: {
      "Asia/Baghdad": "+03:00",
    },
    iso: {
      "alpha-2": "IQ",
      "alpha-3": "IRQ",
      numeric: "368",
    },
    phone: ["+964"],
    emoji: "🇮🇶",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IQ.svg",
    phoneLength: 10,
  },
  {
    name: "Iran",
    nationalite: "Iranienne",
    region: "Asie",
    timezones: {
      "Asia/Tehran": "+03:30",
    },
    iso: {
      "alpha-2": "IR",
      "alpha-3": "IRN",
      numeric: "364",
    },
    phone: ["+98"],
    emoji: "🇮🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IR.svg",
    phoneLength: 11,
  },
  {
    name: "Islande",
    nationalite: "Islandaise",
    region: "Europe",
    timezones: {
      "Atlantic/Reykjavik": "+00:00",
    },
    iso: {
      "alpha-2": "IS",
      "alpha-3": "ISL",
      numeric: "352",
    },
    phone: ["+354"],
    emoji: "🇮🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IS.svg",
    phoneLength: 7,
  },
  {
    name: "Italie",
    nationalite: "Italienne",
    region: "Europe",
    timezones: {
      "Europe/Rome": "+02:00",
    },
    iso: {
      "alpha-2": "IT",
      "alpha-3": "ITA",
      numeric: "380",
    },
    phone: ["+39"],
    emoji: "🇮🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IT.svg",
    phoneLength: 10,
  },
  {
    name: "Jersey",
    nationalite: "Jersiaise",
    region: "Europe",
    timezones: {
      "Europe/Jersey": "+01:00",
    },
    iso: {
      "alpha-2": "JE",
      "alpha-3": "JEY",
      numeric: "832",
    },
    phone: ["+44-1534"],
    emoji: "🇯🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JE.svg",
    phoneLength: 10,
  },
  {
    name: "Jamaique",
    nationalite: "Jamaïquaine",
    region: "Amérique",
    timezones: {
      "America/Jamaica": "-05:00",
    },
    iso: {
      "alpha-2": "JM",
      "alpha-3": "JAM",
      numeric: "388",
    },
    phone: ["+1-876"],
    emoji: "🇯🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JM.svg",
    phoneLength: 10,
  },
  {
    name: "Jordane",
    nationalite: "Jordanienne",
    region: "Asie",
    timezones: {
      "Asia/Amman": "+03:00",
    },
    iso: {
      "alpha-2": "JO",
      "alpha-3": "JOR",
      numeric: "400",
    },
    phone: ["+962"],
    emoji: "🇯🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JO.svg",
    phoneLength: [8, 9],
  },
  {
    name: "Japan",
    nationalite: "Japonaise",
    region: "Asie",
    timezones: {
      "Asia/Tokyo": "+09:00",
    },
    iso: {
      "alpha-2": "JP",
      "alpha-3": "JPN",
      numeric: "392",
    },
    phone: ["+81"],
    emoji: "🇯🇵",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JP.svg",
  },
  {
    name: "Kenya",
    nationalite: "Kényane",
    region: "Afrique",
    timezones: {
      "Afrique/Nairobi": "+03:00",
    },
    iso: {
      "alpha-2": "KE",
      "alpha-3": "KEN",
      numeric: "404",
    },
    phone: ["+254"],
    emoji: "🇰🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KE.svg",
    phoneLength: 10,
  },
  {
    name: "Kirghizistan",
    nationalite: "kirghize",
    region: "Asie",
    timezones: {
      "Asia/Bishkek": "+06:00",
    },
    iso: {
      "alpha-2": "KG",
      "alpha-3": "KGZ",
      numeric: "417",
    },
    phone: ["+996"],
    emoji: "🇰🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KG.svg",
    phoneLength: 9,
  },
  {
    name: "Cambodge",
    nationalite: "Cambodgienne",
    region: "Asie",
    timezones: {
      "Asia/Phnom_Penh": "+07:00",
    },
    iso: {
      "alpha-2": "KH",
      "alpha-3": "KHM",
      numeric: "116",
    },
    phone: ["+855"],
    emoji: "🇰🇭",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KH.svg",
    phoneLength: 9,
  },
  {
    name: "Kiribati",
    nationalite: "Kiribatienne",
    region: "Océanie",
    timezones: {
      "Pacific/Kanton": "+13:00",
      "Pacific/Kiritimati": "+14:00",
      "Pacific/Tarawa": "+12:00",
    },
    iso: {
      "alpha-2": "KI",
      "alpha-3": "KIR",
      numeric: "296",
    },
    phone: ["+686"],
    emoji: "🇰🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KI.svg",
    phoneLength: 8,
  },
  {
    name: "Comores",
    nationalite: "Comorienne",
    region: "Afrique",
    timezones: {
      "Indian/Comoro": "+03:00",
    },
    iso: {
      "alpha-2": "KM",
      "alpha-3": "COM",
      numeric: "174",
    },
    phone: ["+269"],
    emoji: "🇰🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KM.svg",
    phoneLength: 7,
  },
  {
    name: "Saint-Christophe-et-Niévès",
    nationalite: "Christophienne",
    region: "Amérique",
    timezones: {
      "America/St_Kitts": "-04:00",
    },
    iso: {
      "alpha-2": "KN",
      "alpha-3": "KNA",
      numeric: "659",
    },
    phone: ["+1-869"],
    emoji: "🇰🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KN.svg",
    phoneLength: 10,
  },
  {
    name: "Corée du Nord",
    nationalite: "Nord-coréenne",
    region: "Asie",
    timezones: {
      "Asia/Pyongyang": "+09:00",
    },
    iso: {
      "alpha-2": "KP",
      "alpha-3": "PRK",
      numeric: "408",
    },
    phone: ["+850"],
    emoji: "🇰🇵",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KP.svg",
    phoneLength: [4, 6, 7, 13],
  },
  {
    name: "Corée du Sud",
    nationalite: "Sud-coréenne",
    region: "Asie",
    timezones: {
      "Asia/Seoul": "+09:00",
    },
    iso: {
      "alpha-2": "KR",
      "alpha-3": "KOR",
      numeric: "410",
    },
    phone: ["+82"],
    emoji: "🇰🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KR.svg",
    phoneLength: [7, 8],
  },
  {
    name: "Koweït",
    nationalite: "koweïtienne",
    region: "Asie",
    timezones: {
      "Asia/Kuwait": "+03:00",
    },
    iso: {
      "alpha-2": "KW",
      "alpha-3": "KWT",
      numeric: "414",
    },
    phone: ["+965"],
    emoji: "🇰🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KW.svg",
    phoneLength: 8,
  },

  {
    name: "Kazakhstan",
    nationalite: "Kazakhstanais",
    region: "Asie",
    timezones: {
      "Asia/Almaty": "+06:00",
      "Asia/Aqtau": "+05:00",
      "Asia/Aqtobe": "+05:00",
      "Asia/Atyrau": "+05:00",
      "Asia/Oral": "+05:00",
      "Asia/Qostanay": "+06:00",
      "Asia/Qyzylorda": "+05:00",
    },
    iso: {
      "alpha-2": "KZ",
      "alpha-3": "KAZ",
      numeric: "398",
    },
    phone: ["+7"],
    emoji: "🇰🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KZ.svg",
    phoneLength: 10,
  },
  {
    name: "Laos",
    nationalite: "laotienne",
    region: "Asie",
    timezones: {
      "Asia/Vientiane": "+07:00",
    },
    iso: {
      "alpha-2": "LA",
      "alpha-3": "LAO",
      numeric: "418",
    },
    phone: ["+856"],
    emoji: "🇱🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LA.svg",
    phoneLength: [8, 9],
  },
  {
    name: "Liban",
    nationalite: "Libanaise",
    region: "Asie",
    timezones: {
      "Asia/Beirut": "+03:00",
    },
    iso: {
      "alpha-2": "LB",
      "alpha-3": "LBN",
      numeric: "422",
    },
    phone: ["+961"],
    emoji: "🇱🇧",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LB.svg",
    phoneLength: [7, 8],
  },
  {
    name: "Sainte-Lucie",
    ationalite: "lucienne",
    region: "Amérique",
    timezones: {
      "America/St_Lucia": "-04:00",
    },
    iso: {
      "alpha-2": "LC",
      "alpha-3": "LCA",
      numeric: "662",
    },
    phone: ["+1-758"],
    emoji: "🇱🇨",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LC.svg",
    phoneLength: 7,
  },
  {
    name: "Liechtenstein",
    nationalite: "liechtensteinoise",
    region: "Europe",
    timezones: {
      "Europe/Vaduz": "+02:00",
    },
    iso: {
      "alpha-2": "LI",
      "alpha-3": "LIE",
      numeric: "438",
    },
    phone: ["+423"],
    emoji: "🇱🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LI.svg",
    phoneLength: 7,
  },
  {
    name: "Sri Lanka",
    nationalite: "srilankaise",
    region: "Asie",
    timezones: {
      "Asia/Colombo": "+05:30",
    },
    iso: {
      "alpha-2": "LK",
      "alpha-3": "LKA",
      numeric: "144",
    },
    phone: ["+94"],
    emoji: "🇱🇰",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LK.svg",
    phoneLength: 7,
  },
  {
    name: "Liberia",
    nationalite: "libérienne",
    region: "Afrique",
    timezones: {
      "Afrique/Monrovia": "+00:00",
    },
    iso: {
      "alpha-2": "LR",
      "alpha-3": "LBR",
      numeric: "430",
    },
    phone: ["+231"],
    emoji: "🇱🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LR.svg",
    phoneLength: [8, 9],
  },
  {
    name: "Lesotho",
    nationalite: "lesothienne",
    region: "Afrique",
    timezones: {
      "Afrique/Maseru": "+02:00",
    },
    iso: {
      "alpha-2": "LS",
      "alpha-3": "LSO",
      numeric: "426",
    },
    phone: ["+266"],
    emoji: "🇱🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LS.svg",
    phoneLength: 8,
  },
  {
    name: "Lithuania",
    nationalite: "lituanienne",
    region: "Europe",
    timezones: {
      "Europe/Vilnius": "+03:00",
    },
    iso: {
      "alpha-2": "LT",
      "alpha-3": "LTU",
      numeric: "440",
    },
    phone: ["+370"],
    emoji: "🇱🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LT.svg",
    phoneLength: 8,
  },
  {
    name: "Luxembourg",
    nationalite: "luxembourgeoise",
    region: "Europe",
    timezones: {
      "Europe/Luxembourg": "+02:00",
    },
    iso: {
      "alpha-2": "LU",
      "alpha-3": "LUX",
      numeric: "442",
    },
    phone: ["+352"],
    emoji: "🇱🇺",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LU.svg",
    phoneLength: 9,
  },
  {
    name: "Lettonie",
    nationalite: "lettone",
    region: "Europe",
    timezones: {
      "Europe/Riga": "+03:00",
    },
    iso: {
      "alpha-2": "LV",
      "alpha-3": "LVA",
      numeric: "428",
    },
    phone: ["+371"],
    emoji: "🇱🇻",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LV.svg",
    phoneLength: 8,
  },
  {
    name: "Libye",
    nationalite: "Libyenne",
    region: "Afrique",
    timezones: {
      "Afrique/Tripoli": "+02:00",
    },
    iso: {
      "alpha-2": "LY",
      "alpha-3": "LBY",
      numeric: "434",
    },
    phone: ["+218"],
    emoji: "🇱🇾",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LY.svg",
    phoneLength: 10,
  },
  {
    name: "Maroc",
    nationalite: "Marocaine",
    region: "Afrique",
    timezones: {
      "Afrique/Casablanca": "+00:00",
      "Afrique/El_Aaiun": "+00:00",
    },
    iso: {
      "alpha-2": "MA",
      "alpha-3": "MAR",
      numeric: "504",
    },
    phone: ["+212"],
    emoji: "🇲🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MA.svg",
    phoneLength: 9,
  },
  {
    name: "Monaco",
    nationalite: "monégasque",
    region: "Europe",
    timezones: {
      "Europe/Monaco": "+02:00",
    },
    iso: {
      "alpha-2": "MC",
      "alpha-3": "MCO",
      numeric: "492",
    },
    phone: ["+377"],
    emoji: "🇲🇨",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MC.svg",
    phoneLength: 8,
  },
  {
    name: "Moldavie",
    nationalite: "moldave",
    region: "Europe",
    timezones: {
      "Europe/Chisinau": "+03:00",
    },
    iso: {
      "alpha-2": "MD",
      "alpha-3": "MDA",
      numeric: "498",
    },
    phone: ["+373"],
    emoji: "🇲🇩",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MD.svg",
    phoneLength: 8,
  },
  {
    name: "Monténégro",
    nationalite: "monténégrine",
    region: "Europe",
    timezones: {
      "Europe/Podgorica": "+02:00",
    },
    iso: {
      "alpha-2": "ME",
      "alpha-3": "MNE",
      numeric: "499",
    },
    phone: ["+382"],
    emoji: "🇲🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ME.svg",
    phoneLength: 8,
  },

  {
    name: "Madagascar",
    nationalite: "malgache",
    region: "Afrique",
    timezones: {
      "Indian/Antananarivo": "+03:00",
    },
    iso: {
      "alpha-2": "MG",
      "alpha-3": "MDG",
      numeric: "450",
    },
    phone: ["+261"],
    emoji: "🇲🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MG.svg",
    phoneLength: 7,
  },
  {
    name: "Marshall",
    nationalite: "marshallaise",
    region: "Océanie",
    timezones: {
      "Pacific/Kwajalein": "+12:00",
      "Pacific/Majuro": "+12:00",
    },
    iso: {
      "alpha-2": "MH",
      "alpha-3": "MHL",
      numeric: "584",
    },
    phone: ["+692"],
    emoji: "🇲🇭",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MH.svg",
    phoneLength: 7,
  },
  {
    name: "Macédoine",
    nationalite: "macédonienne",
    region: "Europe",
    timezones: {
      "Europe/Skopje": "+02:00",
    },
    iso: {
      "alpha-2": "MK",
      "alpha-3": "MKD",
      numeric: "807",
    },
    phone: ["+389"],
    emoji: "🇲🇰",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MK.svg",
    phoneLength: 8,
  },
  {
    name: "Mali",
    nationalite: "Malienne",
    region: "Afrique",
    timezones: {
      "Afrique/Bamako": "+00:00",
    },
    iso: {
      "alpha-2": "ML",
      "alpha-3": "MLI",
      numeric: "466",
    },
    phone: ["+223"],
    emoji: "🇲🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ML.svg",
    phoneLength: 8,
  },
  {
    name: "Birmanie",
    nationalite: "birmane",
    region: "Asie",
    timezones: {
      "Asia/Yangon": "+06:30",
    },
    iso: {
      "alpha-2": "MM",
      "alpha-3": "MMR",
      numeric: "104",
    },
    phone: ["+95"],
    emoji: "🇲🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MM.svg",
  },
  {
    name: "Mongolie",
    nationalite: "mongole",
    region: "Asie",
    timezones: {
      "Asia/Choibalsan": "+08:00",
      "Asia/Hovd": "+07:00",
      "Asia/Ulaanbaatar": "+08:00",
    },
    iso: {
      "alpha-2": "MN",
      "alpha-3": "MNG",
      numeric: "496",
    },
    phone: ["+976"],
    emoji: "🇲🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MN.svg",
    phoneLength: 8,
  },

  {
    name: "Martinique",
    nationalite: "Martiniquaise",
    region: "Amérique",
    timezones: {
      "America/Martinique": "-04:00",
    },
    iso: {
      "alpha-2": "MQ",
      "alpha-3": "MTQ",
      numeric: "474",
    },
    phone: ["+596"],
    emoji: "🇲🇶",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MQ.svg",
    phoneLength: 9,
  },
  {
    name: "Mauritanie",
    nationalite: "Mauritanienne",
    region: "Afrique",
    timezones: {
      "Afrique/Nouakchott": "+00:00",
    },
    iso: {
      "alpha-2": "MR",
      "alpha-3": "MRT",
      numeric: "478",
    },
    phone: ["+222"],
    emoji: "🇲🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MR.svg",
    phoneLength: 8,
  },

  {
    name: "Malta",
    nationalite: "maltaise",
    region: "Europe",
    timezones: {
      "Europe/Malta": "+02:00",
    },
    iso: {
      "alpha-2": "MT",
      "alpha-3": "MLT",
      numeric: "470",
    },
    phone: ["+356"],
    emoji: "🇲🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MT.svg",
    phoneLength: 8,
  },
  {
    name: "Maurice",
    nationalite: "mauricienne",
    region: "Afrique",
    timezones: {
      "Indian/Mauritius": "+04:00",
    },
    iso: {
      "alpha-2": "MU",
      "alpha-3": "MUS",
      numeric: "480",
    },
    phone: ["+230"],
    emoji: "🇲🇺",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MU.svg",
    phoneLength: 8,
  },
  {
    name: "Maldives",
    nationalite: "maldivienne",
    region: "Asie",
    timezones: {
      "Indian/Maldives": "+05:00",
    },
    iso: {
      "alpha-2": "MV",
      "alpha-3": "MDV",
      numeric: "462",
    },
    phone: ["+960"],
    emoji: "🇲🇻",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MV.svg",
    phoneLength: 7,
  },
  {
    name: "Malawi",
    nationalite: "malawienne",
    region: "Afrique",
    timezones: {
      "Afrique/Blantyre": "+02:00",
    },
    iso: {
      "alpha-2": "MW",
      "alpha-3": "MWI",
      numeric: "454",
    },
    phone: ["+265"],
    emoji: "🇲🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MW.svg",
    phoneLength: [7, 8, 9],
  },
  {
    name: "Mexique",
    nationalite: "mexicaine",
    region: "Amérique",
    timezones: {
      "America/Bahia_Banderas": "-06:00",
      "America/Cancun": "-05:00",
      "America/Chihuahua": "-06:00",
      "America/Ciudad_Juarez": "-06:00",
      "America/Hermosillo": "-07:00",
      "America/Matamoros": "-05:00",
      "America/Mazatlan": "-07:00",
      "America/Merida": "-06:00",
      "America/Mexico_City": "-06:00",
      "America/Monterrey": "-06:00",
      "America/Ojinaga": "-05:00",
      "America/Tijuana": "-07:00",
    },
    iso: {
      "alpha-2": "MX",
      "alpha-3": "MEX",
      numeric: "484",
    },
    phone: ["+52"],
    emoji: "🇲🇽",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MX.svg",
    phoneLength: 10,
  },
  {
    name: "Malaysia",
    nationalite: "malaisienne",
    region: "Asie",
    timezones: {
      "Asia/Kuala_Lumpur": "+08:00",
      "Asia/Kuching": "+08:00",
    },
    iso: {
      "alpha-2": "MY",
      "alpha-3": "MYS",
      numeric: "458",
    },
    phone: ["+60"],
    emoji: "🇲🇾",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MY.svg",
    phoneLength: 7,
  },
  {
    name: "Mozambique",
    nationalite: "mozambicaine",
    region: "Afrique",
    timezones: {
      "Afrique/Maputo": "+02:00",
    },
    iso: {
      "alpha-2": "MZ",
      "alpha-3": "MOZ",
      numeric: "508",
    },
    phone: ["+258"],
    emoji: "🇲🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MZ.svg",
    phoneLength: 12,
  },
  {
    name: "Namibie",
    nationalite: "namibienne",
    region: "Afrique",
    timezones: {
      "Afrique/Windhoek": "+02:00",
    },
    iso: {
      "alpha-2": "NA",
      "alpha-3": "NAM",
      numeric: "516",
    },
    phone: ["+264"],
    emoji: "🇳🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NA.svg",
    phoneLength: 7,
  },

  {
    name: "Niger",
    nationalite: "Nigérienne",
    region: "Afrique",
    timezones: {
      "Afrique/Niamey": "+01:00",
    },
    iso: {
      "alpha-2": "NE",
      "alpha-3": "NER",
      numeric: "562",
    },
    phone: ["+227"],
    emoji: "🇳🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NE.svg",
    phoneLength: 8,
  },

  {
    name: "Nigéria",
    nationalite: "Nigériane",
    region: "Afrique",
    timezones: {
      "Afrique/Lagos": "+01:00",
    },
    iso: {
      "alpha-2": "NG",
      "alpha-3": "NGA",
      numeric: "566",
    },
    phone: ["+234"],
    emoji: "🇳🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NG.svg",
    phoneLength: 8,
  },
  {
    name: "Nicaragua",
    nationalite: "nicaraguayenne",
    region: "Amérique",
    timezones: {
      "America/Managua": "-06:00",
    },
    iso: {
      "alpha-2": "NI",
      "alpha-3": "NIC",
      numeric: "558",
    },
    phone: ["+505"],
    emoji: "🇳🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NI.svg",
    phoneLength: 8,
  },
  {
    name: "Pays-Bas",
    nationalite: "Néerlandaise",
    region: "Europe",
    timezones: {
      "Europe/Amsterdam": "+02:00",
    },
    iso: {
      "alpha-2": "NL",
      "alpha-3": "NLD",
      numeric: "528",
    },
    phone: ["+31"],
    emoji: "🇳🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NL.svg",
    phoneLength: 9,
  },
  {
    name: "Norvège",
    nationalite: "norvégienne",
    region: "Europe",
    timezones: {
      "Europe/Oslo": "+02:00",
    },
    iso: {
      "alpha-2": "NO",
      "alpha-3": "NOR",
      numeric: "578",
    },
    phone: ["+47"],
    emoji: "🇳🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NO.svg",
    phoneLength: 8,
  },
  {
    name: "Nepal",
    nationalite: "népalaise",
    region: "Asie",
    timezones: {
      "Asia/Kathmandu": "+05:45",
    },
    iso: {
      "alpha-2": "NP",
      "alpha-3": "NPL",
      numeric: "524",
    },
    phone: ["+977"],
    emoji: "🇳🇵",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NP.svg",
    phoneLength: 10,
  },
  {
    name: "Nauru",
    nationalite: "nauruane",
    region: "Océanie",
    timezones: {
      "Pacific/Nauru": "+12:00",
    },
    iso: {
      "alpha-2": "NR",
      "alpha-3": "NRU",
      numeric: "520",
    },
    phone: ["+674"],
    emoji: "🇳🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NR.svg",
    phoneLength: 7,
  },

  {
    name: "Nouvelle-Zélande",
    nationalite: "néo-zélandaise",
    region: "Océanie",
    timezones: {
      "Pacific/Auckland": "+12:00",
      "Pacific/Chatham": "+12:45",
    },
    iso: {
      "alpha-2": "NZ",
      "alpha-3": "NZL",
      numeric: "554",
    },
    phone: ["+64"],
    emoji: "🇳🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NZ.svg",
    phoneLength: [8, 9],
  },
  {
    name: "Oman",
    nationalite: "omanaise",
    region: "Asie",
    timezones: {
      "Asia/Muscat": "+04:00",
    },
    iso: {
      "alpha-2": "OM",
      "alpha-3": "OMN",
      numeric: "512",
    },
    phone: ["+968"],
    emoji: "🇴🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/OM.svg",
    phoneLength: 8,
  },
  {
    name: "Panama",
    nationalite: "panaméenne",
    region: "Amérique",
    timezones: {
      "America/Panama": "-05:00",
    },
    iso: {
      "alpha-2": "PA",
      "alpha-3": "PAN",
      numeric: "591",
    },
    phone: ["+507"],
    emoji: "🇵🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PA.svg",
    phoneLength: 8,
  },
  {
    name: "Pérou",
    nationalite: "péruvienne",
    region: "Amérique",
    timezones: {
      "America/Lima": "-05:00",
    },
    iso: {
      "alpha-2": "PE",
      "alpha-3": "PER",
      numeric: "604",
    },
    phone: ["+51"],
    emoji: "🇵🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PE.svg",
    phoneLength: 9,
  },

  {
    name: "Papouasie-Nouvelle-Guinée",
    nationalite: "papouasienne",
    region: "Océanie",
    timezones: {
      "Pacific/Bougainville": "+11:00",
      "Pacific/Port_Moresby": "+10:00",
    },
    iso: {
      "alpha-2": "PG",
      "alpha-3": "PNG",
      numeric: "598",
    },
    phone: ["+675"],
    emoji: "🇵🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PG.svg",
    phoneLength: 8,
  },
  {
    name: "Philippines",
    nationalite: "philippine",
    region: "Asie",
    timezones: {
      "Asia/Manila": "+08:00",
    },
    iso: {
      "alpha-2": "PH",
      "alpha-3": "PHL",
      numeric: "608",
    },
    phone: ["+63"],
    emoji: "🇵🇭",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PH.svg",
    phoneLength: 10,
  },
  {
    name: "Pakistan",
    nationalite: "pakistanaise",
    region: "Asie",
    timezones: {
      "Asia/Karachi": "+05:00",
    },
    iso: {
      "alpha-2": "PK",
      "alpha-3": "PAK",
      numeric: "586",
    },
    phone: ["+92"],
    emoji: "🇵🇰",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PK.svg",
    phoneLength: 10,
  },
  {
    name: "Pologne",
    nationalite: "polonaise",
    region: "Europe",
    timezones: {
      "Europe/Warsaw": "+02:00",
    },
    iso: {
      "alpha-2": "PL",
      "alpha-3": "POL",
      numeric: "616",
    },
    phone: ["+48"],
    emoji: "🇵🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PL.svg",
    phoneLength: 9,
  },

  {
    name: "Poto Rico",
    nationalite: "Américaine",
    region: "Amérique",
    timezones: {
      "America/Puerto_Rico": "-04:00",
    },
    iso: {
      "alpha-2": "PR",
      "alpha-3": "PRI",
      numeric: "630",
    },
    phone: ["+1-787", "+1-939"],
    emoji: "🇵🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PR.svg",
    phoneLength: 10,
  },
  {
    name: "Palestine",
    nationalite: "Palestinienne",
    region: "Asie",
    timezones: {
      "Asia/Gaza": "+02:00",
      "Asia/Hebron": "+02:00",
    },
    iso: {
      "alpha-2": "PS",
      "alpha-3": "PSE",
      numeric: "275",
    },
    phone: ["+970"],
    emoji: "🇵🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PS.svg",
    phoneLength: 9,
  },
  {
    name: "Portugal",
    nationalite: "portugaise",
    region: "Europe",
    timezones: {
      "Atlantic/Azores": "+00:00",
      "Atlantic/Madeira": "+01:00",
      "Europe/Lisbon": "+01:00",
    },
    iso: {
      "alpha-2": "PT",
      "alpha-3": "PRT",
      numeric: "620",
    },
    phone: ["+351"],
    emoji: "🇵🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PT.svg",
    phoneLength: 9,
  },
  {
    name: "Palaos",
    nationalite: "palaoise",
    region: "Océanie",
    timezones: {
      "Pacific/Palau": "+09:00",
    },
    iso: {
      "alpha-2": "PW",
      "alpha-3": "PLW",
      numeric: "585",
    },
    phone: ["+680"],
    emoji: "🇵🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PW.svg",
    phoneLength: 7,
  },
  {
    name: "Paraguay",
    nationalite: "paraguayenne",
    region: "Amérique",
    timezones: {
      "America/Asuncion": "-04:00",
    },
    iso: {
      "alpha-2": "PY",
      "alpha-3": "PRY",
      numeric: "600",
    },
    phone: ["+595"],
    emoji: "🇵🇾",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PY.svg",
    phoneLength: 9,
  },
  {
    name: "Qatar",
    nationalite: "qatarienne",
    region: "Asie",
    timezones: {
      "Asia/Qatar": "+03:00",
    },
    iso: {
      "alpha-2": "QA",
      "alpha-3": "QAT",
      numeric: "634",
    },
    phone: ["+974"],
    emoji: "🇶🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/QA.svg",
    phoneLength: 8,
  },

  {
    name: "Roumanie",
    nationalite: "roumaine",
    region: "Europe",
    timezones: {
      "Europe/Bucharest": "+03:00",
    },
    iso: {
      "alpha-2": "RO",
      "alpha-3": "ROU",
      numeric: "642",
    },
    phone: ["+40"],
    emoji: "🇷🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RO.svg",
    phoneLength: 10,
  },
  {
    name: "Serbie",
    nationalite: "serbe",
    region: "Europe",
    timezones: {
      "Europe/Belgrade": "+02:00",
    },
    iso: {
      "alpha-2": "RS",
      "alpha-3": "SRB",
      numeric: "688",
    },
    phone: ["+381"],
    emoji: "🇷🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RS.svg",
    phoneLength: 9,
  },
  {
    name: "Russie",
    nationalite: "russe",
    region: "Europe",
    timezones: {
      "Asia/Anadyr": "+12:00",
      "Asia/Barnaul": "+07:00",
      "Asia/Chita": "+09:00",
      "Asia/Irkutsk": "+08:00",
      "Asia/Kamchatka": "+12:00",
      "Asia/Khandyga": "+09:00",
      "Asia/Krasnoyarsk": "+07:00",
      "Asia/Magadan": "+11:00",
      "Asia/Novokuznetsk": "+07:00",
      "Asia/Novosibirsk": "+07:00",
      "Asia/Omsk": "+06:00",
      "Asia/Sakhalin": "+11:00",
      "Asia/Srednekolymsk": "+11:00",
      "Asia/Tomsk": "+07:00",
      "Asia/Ust-Nera": "+10:00",
      "Asia/Vladivostok": "+10:00",
      "Asia/Yakutsk": "+09:00",
      "Asia/Yekaterinburg": "+05:00",
      "Europe/Astrakhan": "+04:00",
      "Europe/Kaliningrad": "+02:00",
      "Europe/Kirov": "+03:00",
      "Europe/Moscow": "+03:00",
      "Europe/Samara": "+04:00",
      "Europe/Saratov": "+04:00",
      "Europe/Ulyanovsk": "+04:00",
      "Europe/Volgograd": "+03:00",
    },
    iso: {
      "alpha-2": "RU",
      "alpha-3": "RUS",
      numeric: "643",
    },
    phone: ["+7"],
    emoji: "🇷🇺",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RU.svg",
    phoneLength: 10,
  },
  {
    name: "Rwanda",
    nationalite: "rwandaise",
    region: "Afrique",
    timezones: {
      "Afrique/Kigali": "+02:00",
    },
    iso: {
      "alpha-2": "RW",
      "alpha-3": "RWA",
      numeric: "646",
    },
    phone: ["+250"],
    emoji: "🇷🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RW.svg",
    phoneLength: 9,
  },
  {
    name: "Arabie saoudite",
    nationalite: "saoudienne",
    region: "Asie",
    timezones: {
      "Asia/Riyadh": "+03:00",
    },
    iso: {
      "alpha-2": "SA",
      "alpha-3": "SAU",
      numeric: "682",
    },
    phone: ["+966"],
    emoji: "🇸🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SA.svg",
    phoneLength: 9,
  },
  {
    name: "Solomon",
    nationalite: "salomonaise",
    region: "Océanie",
    timezones: {
      "Pacific/Guadalcanal": "+11:00",
    },
    iso: {
      "alpha-2": "SB",
      "alpha-3": "SLB",
      numeric: "090",
    },
    phone: ["+677"],
    emoji: "🇸🇧",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SB.svg",
    phoneLength: 7,
  },
  {
    name: "Seychelles",
    nationalite: "seychelloise",
    region: "Afrique",
    timezones: {
      "Indian/Mahe": "+04:00",
    },
    iso: {
      "alpha-2": "SC",
      "alpha-3": "SYC",
      numeric: "690",
    },
    phone: ["+248"],
    emoji: "🇸🇨",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SC.svg",
    phoneLength: 7,
  },
  {
    name: "Soudan",
    nationalite: "Soudanaise",
    region: "Afrique",
    timezones: {
      "Afrique/Khartoum": "+02:00",
    },
    iso: {
      "alpha-2": "SD",
      "alpha-3": "SDN",
      numeric: "729",
    },
    phone: ["+249"],
    emoji: "🇸🇩",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SD.svg",
    phoneLength: 7,
  },
  {
    name: "Suède",
    nationalite: "suédoise",
    region: "Europe",
    timezones: {
      "Europe/Stockholm": "+02:00",
    },
    iso: {
      "alpha-2": "SE",
      "alpha-3": "SWE",
      numeric: "752",
    },
    phone: ["+46"],
    emoji: "🇸🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SE.svg",
    phoneLength: 7,
  },
  {
    name: "Singapour",
    nationalite: "singapourienne",
    region: "Asie",
    timezones: {
      "Asia/Singapore": "+08:00",
    },
    iso: {
      "alpha-2": "SG",
      "alpha-3": "SGP",
      numeric: "702",
    },
    phone: ["+65"],
    emoji: "🇸🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SG.svg",
    phoneLength: 8,
  },

  {
    name: "Slovénie",
    nationalite: "slovène",
    region: "Europe",
    timezones: {
      "Europe/Ljubljana": "+02:00",
    },
    iso: {
      "alpha-2": "SI",
      "alpha-3": "SVN",
      numeric: "705",
    },
    phone: ["+386"],
    emoji: "🇸🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SI.svg",
    phoneLength: 9,
  },

  {
    name: "Slovaquie",
    nationalite: "slovaque",
    region: "Europe",
    timezones: {
      "Europe/Bratislava": "+02:00",
    },
    iso: {
      "alpha-2": "SK",
      "alpha-3": "SVK",
      numeric: "703",
    },
    phone: ["+421"],
    emoji: "🇸🇰",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SK.svg",
    phoneLength: 9,
  },
  {
    name: "Sierra Leone",
    nationalite: "sierraléonaise",
    region: "Afrique",
    timezones: {
      "Afrique/Freetown": "+00:00",
    },
    iso: {
      "alpha-2": "SL",
      "alpha-3": "SLE",
      numeric: "694",
    },
    phone: ["+232"],
    emoji: "🇸🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SL.svg",
    phoneLength: 8,
  },
  {
    name: "Saint-Marin",
    nationalite: "marinaise",
    region: "Europe",
    timezones: {
      "Europe/San_Marino": "+02:00",
    },
    iso: {
      "alpha-2": "SM",
      "alpha-3": "SMR",
      numeric: "674",
    },
    phone: ["+378"],
    emoji: "🇸🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SM.svg",
    phoneLength: 10,
  },
  {
    name: "Sénégal",
    nationalite: "Sénégalaise",
    region: "Afrique",
    timezones: {
      "Afrique/Dakar": "+00:00",
    },
    iso: {
      "alpha-2": "SN",
      "alpha-3": "SEN",
      numeric: "686",
    },
    phone: ["+221"],
    emoji: "🇸🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SN.svg",
    phoneLength: 9,
  },
  {
    name: "Somalie",
    nationalite: "somalienne",
    region: "Afrique",
    timezones: {
      "Afrique/Mogadishu": "+03:00",
    },
    iso: {
      "alpha-2": "SO",
      "alpha-3": "SOM",
      numeric: "706",
    },
    phone: ["+252"],
    emoji: "🇸🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SO.svg",
    phoneLength: [8, 9],
  },
  {
    name: "Suriname",
    nationalite: "surinamaise",
    region: "Amérique",
    timezones: {
      "America/Paramaribo": "-03:00",
    },
    iso: {
      "alpha-2": "SR",
      "alpha-3": "SUR",
      numeric: "740",
    },
    phone: ["+597"],
    emoji: "🇸🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SR.svg",
    phoneLength: [6, 7],
  },

  {
    name: "Sao Tomé-et-Principe",
    nationalite: "santoméenne",
    region: "Afrique",
    timezones: {
      "Afrique/Sao_Tome": "+00:00",
    },
    iso: {
      "alpha-2": "ST",
      "alpha-3": "STP",
      numeric: "678",
    },
    phone: ["+239"],
    emoji: "🇸🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ST.svg",
    phoneLength: 7,
  },
  {
    name: "Salvador",
    nationalite: "salvadorienne",
    region: "Amérique",
    timezones: {
      "America/El_Salvador": "-06:00",
    },
    iso: {
      "alpha-2": "SV",
      "alpha-3": "SLV",
      numeric: "222",
    },
    phone: ["+503"],
    emoji: "🇸🇻",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SV.svg",
    phoneLength: 8,
  },

  {
    name: "Syrie",
    nationalite: "syrienne",
    region: "Asie",
    timezones: {
      "Asia/Damascus": "+03:00",
    },
    iso: {
      "alpha-2": "SY",
      "alpha-3": "SYR",
      numeric: "760",
    },
    phone: ["+963"],
    emoji: "🇸🇾",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SY.svg",
    phoneLength: 7,
  },
  {
    name: "Swaziland",
    nationalite: "swazie",
    region: "Afrique",
    timezones: {
      "Afrique/Mbabane": "+02:00",
    },
    iso: {
      "alpha-2": "SZ",
      "alpha-3": "SWZ",
      numeric: "748",
    },
    phone: ["+268"],
    emoji: "🇸🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SZ.svg",
    phoneLength: 8,
  },
  {
    name: "Turks and Caicos Islands",
    region: "Amérique",
    timezones: {
      "America/Grand_Turk": "-04:00",
    },
    iso: {
      "alpha-2": "TC",
      "alpha-3": "TCA",
      numeric: "796",
    },
    phone: ["+1-649"],
    emoji: "🇹🇨",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TC.svg",
    phoneLength: 10,
  },
  {
    name: "Tchad",
    nationalite: "Tchadienne",
    region: "Afrique",
    timezones: {
      "Afrique/Ndjamena": "+01:00",
    },
    iso: {
      "alpha-2": "TD",
      "alpha-3": "TCD",
      numeric: "148",
    },
    phone: ["+235"],
    emoji: "🇹🇩",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TD.svg",
    phoneLength: 6,
  },
  {
    name: "Togo",
    nationalite: "Togolaise",
    region: "Afrique",
    timezones: {
      "Afrique/Lome": "+00:00",
    },
    iso: {
      "alpha-2": "TG",
      "alpha-3": "TGO",
      numeric: "768",
    },
    phone: ["+228"],
    emoji: "🇹🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TG.svg",
    phoneLength: 8,
  },
  {
    name: "Thaïlande",
    nationalite: "thaïlandaise",
    region: "Asie",
    timezones: {
      "Asia/Bangkok": "+07:00",
    },
    iso: {
      "alpha-2": "TH",
      "alpha-3": "THA",
      numeric: "764",
    },
    phone: ["+66"],
    emoji: "🇹🇭",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TH.svg",
    phoneLength: 9,
  },
  {
    name: "Tadjikistan",
    nationalite: "tadjike",
    region: "Asie",
    timezones: {
      "Asia/Dushanbe": "+05:00",
    },
    iso: {
      "alpha-2": "TJ",
      "alpha-3": "TJK",
      numeric: "762",
    },
    phone: ["+992"],
    emoji: "🇹🇯",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TJ.svg",
    phoneLength: 9,
  },

  {
    name: "Timor oriental",
    nationalite: "timoraise",
    region: "Asie",
    timezones: {
      "Asia/Dili": "+09:00",
    },
    iso: {
      "alpha-2": "TL",
      "alpha-3": "TLS",
      numeric: "626",
    },
    phone: ["+670"],
    emoji: "🇹🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TL.svg",
    phoneLength: 7,
  },
  {
    name: "Turkménistan",
    nationalite: "turkmène",
    region: "Asie",
    timezones: {
      "Asia/Ashgabat": "+05:00",
    },
    iso: {
      "alpha-2": "TM",
      "alpha-3": "TKM",
      numeric: "795",
    },
    phone: ["+993"],
    emoji: "🇹🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TM.svg",
    phoneLength: 8,
  },
  {
    name: "Tunisie",
    nationalite: "Tunisienne",
    region: "Afrique",
    timezones: {
      "Afrique/Tunis": "+01:00",
    },
    iso: {
      "alpha-2": "TN",
      "alpha-3": "TUN",
      numeric: "788",
    },
    phone: ["+216"],
    emoji: "🇹🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TN.svg",
    phoneLength: 8,
  },
  {
    name: "Tonga",
    nationalite: "Tongienne",

    region: "Océanie",
    timezones: {
      "Pacific/Tongatapu": "+13:00",
    },
    iso: {
      "alpha-2": "TO",
      "alpha-3": "TON",
      numeric: "776",
    },
    phone: ["+676"],
    emoji: "🇹🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TO.svg",
    phoneLength: 5,
  },
  {
    name: "Turquie",
    nationalite: "Turque",
    region: "Asie",
    timezones: {
      "Europe/Istanbul": "+03:00",
    },
    iso: {
      "alpha-2": "TR",
      "alpha-3": "TUR",
      numeric: "792",
    },
    phone: ["+90"],
    emoji: "🇹🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TR.svg",
    phoneLength: 11,
  },
  {
    name: "Trinité-et-Tobago",
    nationalite: "trinidadienne",
    region: "Amérique",
    timezones: {
      "America/Port_of_Spain": "-04:00",
    },
    iso: {
      "alpha-2": "TT",
      "alpha-3": "TTO",
      numeric: "780",
    },
    phone: ["+1-868"],
    emoji: "🇹🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TT.svg",
    phoneLength: 7,
  },
  {
    name: "Tuvalu",
    nationalite: "tuvaluane",
    region: "Océanie",
    timezones: {
      "Pacific/Funafuti": "+12:00",
    },
    iso: {
      "alpha-2": "TV",
      "alpha-3": "TUV",
      numeric: "798",
    },
    phone: ["+688"],
    emoji: "🇹🇻",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TV.svg",
    phoneLength: 5,
  },
  {
    name: "Taiwan",
    nationalite: "taïwanaise",
    region: "Asie",
    timezones: {
      "Asia/Taipei": "+08:00",
    },
    iso: {
      "alpha-2": "TW",
      "alpha-3": "TWN",
      numeric: "158",
    },
    phone: ["+886"],
    emoji: "🇹🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TW.svg",
    phoneLength: 9,
  },
  {
    name: "Tanzanie",
    nationalite: "tanzanienne",
    region: "Afrique",
    timezones: {
      "Afrique/Dar_es_Salaam": "+03:00",
    },
    iso: {
      "alpha-2": "TZ",
      "alpha-3": "TZA",
      numeric: "834",
    },
    phone: ["+255"],
    emoji: "🇹🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TZ.svg",
    phoneLength: 7,
  },
  {
    name: "Ukraine",
    nationalite: "ukrainienne",
    region: "Europe",
    timezones: {
      "Europe/Kyiv": "+03:00",
      "Europe/Simferopol": "+03:00",
    },
    iso: {
      "alpha-2": "UA",
      "alpha-3": "UKR",
      numeric: "804",
    },
    phone: ["+380"],
    emoji: "🇺🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UA.svg",
    phoneLength: 9,
  },
  {
    name: "Ouganda",
    nationalite: "ougandaise",
    region: "Afrique",
    timezones: {
      "Afrique/Kampala": "+03:00",
    },
    iso: {
      "alpha-2": "UG",
      "alpha-3": "UGA",
      numeric: "800",
    },
    phone: ["+256"],
    emoji: "🇺🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UG.svg",
    phoneLength: 7,
  },
  {
    name: "Etats-Unis",
    nationalite: "Américaine",
    region: "Amérique",
    timezones: {
      "America/Adak": "-09:00",
      "America/Anchorage": "-08:00",
      "America/Boise": "-06:00",
      "America/Chicago": "-05:00",
      "America/Denver": "-06:00",
      "America/Detroit": "-04:00",
      "America/Indiana/Indianapolis": "-04:00",
      "America/Indiana/Knox": "-05:00",
      "America/Indiana/Marengo": "-04:00",
      "America/Indiana/Petersburg": "-04:00",
      "America/Indiana/Tell_City": "-05:00",
      "America/Indiana/Vevay": "-04:00",
      "America/Indiana/Vincennes": "-04:00",
      "America/Indiana/Winamac": "-04:00",
      "America/Juneau": "-08:00",
      "America/Kentucky/Louisville": "-04:00",
      "America/Kentucky/Monticello": "-04:00",
      "America/Los_Angeles": "-07:00",
      "America/Menominee": "-05:00",
      "America/Metlakatla": "-08:00",
      "America/New_York": "-04:00",
      "America/Nome": "-08:00",
      "America/North_Dakota/Beulah": "-05:00",
      "America/North_Dakota/Center": "-05:00",
      "America/North_Dakota/New_Salem": "-05:00",
      "America/Phoenix": "-07:00",
      "America/Sitka": "-08:00",
      "America/Yakutat": "-08:00",
      "Pacific/Honolulu": "-10:00",
    },
    iso: {
      "alpha-2": "US",
      "alpha-3": "USA",
      numeric: "840",
    },
    phone: ["+1"],
    emoji: "🇺🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg",
    phoneLength: 10,
  },
  {
    name: "Uruguay",
    nationalite: "uruguayenne",
    region: "Amérique",
    timezones: {
      "America/Montevideo": "-03:00",
    },
    iso: {
      "alpha-2": "UY",
      "alpha-3": "URY",
      numeric: "858",
    },
    phone: ["+598"],
    emoji: "🇺🇾",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UY.svg",
    phoneLength: 8,
  },
  {
    name: "Ouzbékistan",
    nationalite: "ouzbèke",
    region: "Asie",
    timezones: {
      "Asia/Samarkand": "+05:00",
      "Asia/Tashkent": "+05:00",
    },
    iso: {
      "alpha-2": "UZ",
      "alpha-3": "UZB",
      numeric: "860",
    },
    phone: ["+998"],
    emoji: "🇺🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UZ.svg",
    phoneLength: 9,
  },

  {
    name: "Saint-Vincent-et-les Grenadines",
    nationalite: "vincentaise",
    region: "Amérique",
    timezones: {
      "America/St_Vincent": "-04:00",
    },
    iso: {
      "alpha-2": "VC",
      "alpha-3": "VCT",
      numeric: "670",
    },
    phone: ["+1-784"],
    emoji: "🇻🇨",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VC.svg",
    phoneLength: 7,
  },
  {
    name: "Venezuela",
    nationalite: "vénézuélienne",
    region: "Amérique",
    timezones: {
      "America/Caracas": "-04:00",
    },
    iso: {
      "alpha-2": "VE",
      "alpha-3": "VEN",
      numeric: "862",
    },
    phone: ["+58"],
    emoji: "🇻🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VE.svg",
    phoneLength: 7,
  },

  {
    name: "Viêt Nam",
    nationalite: "vietnamienne",
    region: "Asie",
    timezones: {
      "Asia/Ho_Chi_Minh": "+07:00",
    },
    iso: {
      "alpha-2": "VN",
      "alpha-3": "VNM",
      numeric: "704",
    },
    phone: ["+84"],
    emoji: "🇻🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VN.svg",
    phoneLength: 9,
  },
  {
    name: "Vanuatu",
    nationalite: "vanuataise",
    region: "Océanie",
    timezones: {
      "Pacific/Efate": "+11:00",
    },
    iso: {
      "alpha-2": "VU",
      "alpha-3": "VUT",
      numeric: "548",
    },
    phone: ["+678"],
    emoji: "🇻🇺",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VU.svg",
    phoneLength: 5,
  },
  {
    name: "Wallis and Futuna",
    nationalite: "Française",
    region: "Océanie",
    timezones: {
      "Pacific/Wallis": "+12:00",
    },
    iso: {
      "alpha-2": "WF",
      "alpha-3": "WLF",
      numeric: "876",
    },
    phone: ["+681"],
    emoji: "🇼🇫",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WF.svg",
    phoneLength: 6,
  },
  {
    name: "Samoa",
    nationalite: "samoene",
    region: "Océanie",
    timezones: {
      "Pacific/Apia": "+13:00",
    },
    iso: {
      "alpha-2": "WS",
      "alpha-3": "WSM",
      numeric: "882",
    },
    phone: ["+685"],
    emoji: "🇼🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WS.svg",
    phoneLength: [5, 6, 7],
  },
  {
    phoneLength: 8,
  },
  {
    name: "Yemen",
    nationalite: "yéménite",
    region: "Asie",
    timezones: {
      "Asia/Aden": "+03:00",
    },
    iso: {
      "alpha-2": "YE",
      "alpha-3": "YEM",
      numeric: "887",
    },
    phone: ["+967"],
    emoji: "🇾🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YE.svg",
    phoneLength: 9,
  },

  {
    name: "Afrique du Sud",
    nationalite: "Sudafricaine",
    region: "Afrique",
    timezones: {
      "Afrique/Johannesburg": "+02:00",
    },
    iso: {
      "alpha-2": "ZA",
      "alpha-3": "ZAF",
      numeric: "710",
    },
    phone: ["+27"],
    emoji: "🇿🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZA.svg",
    phoneLength: 9,
  },
  {
    name: "Zambie",
    nationalite: "zambienne",
    region: "Afrique",
    timezones: {
      "Afrique/Lusaka": "+02:00",
    },
    iso: {
      "alpha-2": "ZM",
      "alpha-3": "ZMB",
      numeric: "894",
    },
    phone: ["+260"],
    emoji: "🇿🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZM.svg",
    phoneLength: 9,
  },
  {
    name: "Zimbabwe",
    nationalite: "zimbabwéenne",
    region: "Afrique",
    timezones: {
      "Afrique/Harare": "+02:00",
    },
    iso: {
      "alpha-2": "ZW",
      "alpha-3": "ZWE",
      numeric: "716",
    },
    phone: ["+263"],
    emoji: "🇿🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZW.svg",
    phoneLength: 9,
  },
];
function Badge({ userpf }) {
  const [searchNom, setSearchNom] = useState("");
  const [searchNationality, setSearchNationality] = useState("");
  const [searchTypeProfil, setSearchTypeProfil] = useState("");
  const [searchPaysResidence, setSearchPaysResidence] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [data, setData] = useState([]);

  const [showFilters, setShowFilters] = useState(false);

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(`${Config.LOCAL_URL}/api/allagents`);
      const result = await response.json();

      setData(result); // Update the state
      setFilteredUsers(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReset = () => {
    setSearchNom("");
    setSearchNationality("");
    setSearchTypeProfil("");
    setSearchPaysResidence("");
    setFilteredUsers(data);
  };

  const handleSearch = () => {
    // const filteredData = data.filter((user) => {
    //   const fullName = `${user.user.nom} ${user.user.prenom}`.toLowerCase();
    //   const searchName = searchNom.toLowerCase();
    //   return (
    //     fullName.includes(searchName) &&
    //     (searchNationality === "" || user.user.nationality === searchNationality) &&
    //     (searchTypeProfil === "" || user.typeresponsable === searchTypeProfil) &&
    //     (searchPaysResidence === "" || user.user.countryresidence === searchPaysResidence)
    //   );
    // });
    const filteredData = {
      agents: data.agents.filter((agent) => {
        const fullName =
          `${agent?.user?.nom} ${agent?.user?.prenom}`.toLowerCase();
        const searchName = searchNom.toLowerCase();
        return (
          fullName.includes(searchName) &&
          (searchNationality === "" ||
            agent?.user?.nationality === searchNationality) &&
          (searchTypeProfil === "" ||
            agent?.typeresponsable === searchTypeProfil) &&
          (searchPaysResidence === "" ||
            agent?.user?.countryresidence === searchPaysResidence)
        );
      }),
      scouts: data.scouts.filter((scout) => {
        const fullName =
          `${scout?.user?.nom} ${scout?.user?.prenom}`.toLowerCase();
        const searchName = searchNom.toLowerCase();
        return (
          fullName.includes(searchName) &&
          (searchNationality === "" ||
            scout?.user?.nationality === searchNationality) &&
          (searchTypeProfil === "" ||
            scout?.user?.profil === searchTypeProfil) &&
          (searchPaysResidence === "" ||
            scout?.user?.countryresidence === searchPaysResidence)
        );
      }),
      coaches: data.coaches.filter((coach) => {
        const fullName =
          `${coach?.user?.nom} ${coach?.user?.prenom}`.toLowerCase();

        const searchName = searchNom.toLowerCase();

        return (
          fullName.includes(searchName) &&
          (searchNationality === "" ||
            coach?.user?.nationality === searchNationality) &&
          (searchTypeProfil === "" ||
            coach?.user?.profil === searchTypeProfil) &&
          (searchPaysResidence === "" ||
            coach?.user?.countryresidence === searchPaysResidence)
        );
      }),
    };
    setFilteredUsers(filteredData);
  };

  const optionsPays = paysAllInfo.map((country) => {
    const countryCode = country.iso && country.iso["alpha-2"].toLowerCase(); // Convert to lowercase

    return {
      value: countryCode,
      label: (
        <div>
          {countryCode && (
            <span
              className={`flag-icon flag-icon-${countryCode}`}
              style={{ marginRight: "2px", width: "40px" }}
            ></span>
          )}
          {country.name}
        </div>
      ),
    };
  });
  const options = paysAllInfo.map((country) => {
    const countryCode =
      country.iso && country.iso["alpha-2"]
        ? country.iso["alpha-2"].toLowerCase()
        : null;
    const nationalite = country.nationalite ? country.nationalite : "";

    return {
      value: countryCode,
      label: (
        <div>
          {countryCode && (
            <span
              className={`flag-icon flag-icon-${countryCode}`}
              style={{ marginRight: "8px", width: "40px" }}
            ></span>
          )}
          {nationalite}
        </div>
      ),
    };
  });
  // const options = paysAllInfo.map((country) => {
  //   const countryCode = country.iso && country.iso["alpha-2"].toLowerCase(); // Convert to lowercase

  //   return {
  //     value: countryCode,
  //     label: (
  //       <div>
  //         {countryCode && (
  //           <span
  //             className={`flag-icon flag-icon-${countryCode}`}
  //             style={{ marginRight: "8px", width: "40px" }}
  //           ></span>
  //         )}
  //         {country.nationalite}
  //       </div>
  //     ),
  //   };
  // });
  // for left slide barre ---------------------------------
  const [user, setUser] = useState([]);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("Secret"));
    const tokenn = storedUserData.token;

    const storedUserDatad = JSON.parse(
      secureLocalStorage.getItem("cryptedUser")
    );
    const id = storedUserDatad ? storedUserDatad.id : null;
    console.log("eeeeeeeeeeeee", tokenn);
    // Replace the API endpoint with your actual endpoint for fetching user data
    fetch(`${Config.LOCAL_URL}/api/user/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenn}`,
      },
    })
      .then((response) => response.json())
      .then((userData) => {
        setUser(userData);
        console.log("user from header3", user);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const storedUserData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));

  const id = storedUserData.id ? storedUserData.id : null;

  const userProfileType = storedUserData ? storedUserData.profil : null;

  const shouldHideForProfiles = ["other", "player"];
  const shouldShowAgentItem = ["player"].includes(userProfileType);

  const shouldShowForProfile = !shouldHideForProfiles.includes(userProfileType);
  const [eventTogglerIsOpenned, setEventTogglerIsOpenned] = useState(false);

  // left slide barre ------------------------------
  return (
    <Fragment>
      <Header />

      <div className="flex flex-col pb-12   mt-0 lg:mt-8 bg-zinc-100">
        <div className="self-center md:mt-20 w-full max-w-[1344px]  max-md:max-w-full">
          <div className="flex max-md:flex-col max-md:gap-0">
            {/* left menu */}
            <LeftMenu
              id={id}
              classothercomponent={true}
              shouldShowAgentItem={shouldShowAgentItem}
              shouldShowForProfile={shouldShowForProfile}
              setEventTogglerIsOpenned={setEventTogglerIsOpenned}
              eventTogglerIsOpenned={eventTogglerIsOpenned}
              user={user}
              userProfileType={userProfileType}
            />

            {/* left menu */}

            <div className="flex flex-col md:px-0 px-3 ml-5 mr-7 mt-20 md:mt-2 w-[76%] max-md:ml-0 max-md:w-full">
              <div className="flex  md:gap-y-3 flex-col grow  max-md:max-w-full">
                <div className="flex flex-col px-9 pt-2 mt-3 md:mt-12 pb-2 bg-white rounded-xl max-md:px-5 max-md:max-w-full">
                  <div className="flex gap-3 md:gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                    <div className="flex-auto text-2xl md:text-3xl font-bold text-zinc-900">
                      Chercher Votre Agent
                    </div>
                    <div
                      className={`flex gap-2  justify-center self-start px-8 py-2 text-sm md:text-base font-medium ${
                        showFilters ? "text-white" : "text-white"
                      } whitespace-nowrap ${
                        showFilters ? "bg-black" : "bg-blue-600"
                      } rounded-[30px] max-md:px-5`}
                      onClick={handleToggleFilters}
                    >
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/338f69c576a3cd879110110b941d2824abc1d5b093ee17b0c389f0f0c415230e?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                        className="w-4 md:w-5 aspect-square"
                      />
                      {showFilters
                        ? "Masquer les filtres"
                        : "Afficher les filtres"}
                    </div>
                  </div>
                </div>

                {showFilters && (
                  <>
                    <div className="flex flex-col px-8 mt-6 md:mt-0 md:pt-8 pb-4 bg-white rounded-xl max-md:px-5 max-md:max-w-full">
                      <div className="flex-wrap gap-y-2 justify-between content-start mt-2 max-md:max-w-full">
                        <div className="flex gap-3 md:gap-5 max-md:flex-col max-md:gap-0 max-md:">
                          <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col grow text-base text-zinc-900 max-md:mt-2 max-md:max-w-full">
                              <div className="flex gap-4 justify-between px-4 max-md:flex-wrap max-md:max-w-full">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1744eb7a080221807467d8a93b3f90074802cac02f9933e47a9e4e617ca3cdd9?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                  className="aspect-[0.71] w-[15px]"
                                />
                                <div className="grow  max-md:max-w-full">
                                  Nom et prénom
                                </div>
                              </div>
                              <input
                                class="justify-center  w-full items-start py-2.5  pl-4 mt-2 text-md font-light whitespace-nowrap border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 max-md:max-w-full"
                                type="text"
                                placeholder=" nom  ou  prenom"
                                value={searchNom}
                                onChange={(e) => setSearchNom(e.target.value)}
                              />
                              <div className="flex gap-4 w-full  self-start px-4 mt-4 whitespace-nowrap">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d53d36790234944104fc9c6c9ab8bb4e63aa1602f99c43a0ce5a3f3c262180f9?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                  className="w-5 aspect-square"
                                />
                                <div className="grow">Nationalité</div>
                              </div>

                              <div className=" gap-4 w-full flex-1 ">
                                <Select
                                  options={options}
                                  placeholder="Nationalité"
                                  styles={{
                                    control: (provided, state) => ({
                                      ...provided,
                                      borderRadius: "0.375rem",
                                      display: "flex",
                                      justifyContent: "center",
                                      borderRadius: "30px",
                                      width: "100%",
                                      fontSize: "1rem",
                                      backgroundColor: "#ffff",
                                      borderWidth: "none",
                                      marginTop: "4px",
                                      border:
                                        "1px solid var(--black-100-e-5-e-5-e-5, #E5E5E5)", // Border style
                                      paddingTop: "6px", // Adjust the top padding as needed
                                      paddingBottom: "6px", // Adjust the bottom padding as needed
                                      paddingLeft: "13px", // Adjust as needed
                                      paddingRight: "13px", // Adjust as needed
                                    }),
                                  }}
                                  onChange={(selectedOption) =>
                                    setSearchNationality(
                                      selectedOption.label.props.children[1]
                                    )
                                  }
                                  value={options.find(
                                    (option) =>
                                      option.value === searchNationality
                                  )}
                                  // Enable searching by nationalite
                                  filterOption={(option, inputValue) => {
                                    const nationalite =
                                      option.label.props.children; // Assuming nationalite is directly the children of label

                                    const nationaliteString =
                                      typeof nationalite === "string"
                                        ? nationalite.toLowerCase()
                                        : nationalite.join("").toLowerCase(); // Join children of JSX element if it's an array

                                    return nationaliteString.includes(
                                      inputValue.toLowerCase()
                                    );
                                  }}
                                  // Ensure that all options are displayed even when filtered
                                  isSearchable
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col ml-5 w-full max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col grow text-base text-zinc-900 ">
                              <div className="flex gap-4 justify-between px-4 whitespace-nowrap">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/706e00f0da2704336a80f4a202ba4e45774fadcb82a16cd4232e130a830ce2cf?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                  className="w-3.5 aspect-[0.7]"
                                />
                                <div className="grow ">Type de profil</div>
                              </div>
                              <div className="flex flex-col justify-center mt-2 w-full text-md font-light border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                                <div className="flex gap-5 justify-between px-4 py-1.5 rounded-md">
                                  <div className="flex-auto self-start mt-1 w-full">
                                    <select
                                      className="self-start mt-1 w-full"
                                      value={searchTypeProfil}
                                      onChange={(e) =>
                                        setSearchTypeProfil(e.target.value)
                                      }
                                    >
                                      <option value="" disabled>
                                        Type de profil
                                      </option>
                                      <option value="club">
                                        Manager de club
                                      </option>
                                      <option value="players">
                                        Manager de Joueur
                                      </option>
                                      <option value="scout">Scout</option>
                                      <option value="coach">Entraineur</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-4 justify-between px-4 mt-4 whitespace-nowrap">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6a58358a69d56964aaea215860418655d19b7498b4ea5e26db448960416d128?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                  className="w-5 aspect-square"
                                />
                                <div className="grow">Pays de résidence</div>
                              </div>

                              <div className="flex-auto">
                                <div className="flex-auto">
                                  <Select
                                    options={optionsPays}
                                    placeholder="Pays de résidence"
                                    styles={{
                                      control: (provided, state) => ({
                                        ...provided,
                                        borderRadius: "0.375rem",
                                        display: "flex",
                                        justifyContent: "center",
                                        borderRadius: "30px",
                                        width: "100%",
                                        fontSize: "1rem",
                                        backgroundColor: "#ffff",
                                        borderWidth: "none",
                                        marginTop: "4px",
                                        border:
                                          "1px solid var(--black-100-e-5-e-5-e-5, #E5E5E5)", // Border style
                                        paddingTop: "6px", // Adjust the top padding as needed
                                        paddingBottom: "6px", // Adjust the bottom padding as needed
                                        paddingLeft: "13px", // Adjust as needed
                                        paddingRight: "13px", // Adjust as needed
                                      }),
                                    }}
                                    onChange={(selectedOption) =>
                                      setSearchPaysResidence(
                                        selectedOption.label.props.children[1]
                                      )
                                    }
                                    value={optionsPays.find(
                                      (option) =>
                                        option.value === searchPaysResidence
                                    )}
                                    filterOption={(option, inputValue) => {
                                      const nationalite =
                                        option.label.props.children; // Assuming nationalite is directly the children of label

                                      const nationaliteString =
                                        typeof nationalite === "string"
                                          ? nationalite.toLowerCase()
                                          : nationalite.join("").toLowerCase(); // Join children of JSX element if it's an array

                                      return nationaliteString.includes(
                                        inputValue.toLowerCase()
                                      );
                                    }}
                                    // Ensure that all options are displayed even when filtered
                                    isSearchable
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-1 md:gap-5  justify-between flex-col items-center md:flex-row py-2 mt-4 w-full text-base font-medium whitespace-nowrap  max-md:max-w-full">

                        <div className="flex gap-5 w-full md:w-fit justify-between ">
                          <button
                            onClick={handleReset}
                            className="justify-center w-full  md:w-fit  px-8 py-2 text-white bg-orange-500 rounded-[30px] max-md:px-5"
                          >
                            Réinitialiser
                          </button>
                        </div>
                        <div className="flex  gap-5 w-full md:w-fit justify-between ">
                          <button
                            onClick={handleSearch}
                            className="justify-center w-full px-8 py-2 text-white bg-blue-600 rounded-[30px] max-md:px-5"
                          >
                            Confirmer
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex-wrap content-start mt-6 max-md:max-w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {filteredUsers?.agents?.map((agents, index) => (
                    <Link key={index} to={`/profile/${agents?.user?.id}`}>
                      <div className="flex flex-col w-full">
                        <div className="flex flex-col grow p-6 mx-auto w-full text-xs bg-white rounded-xl text-zinc-900 max-md:px-5 max-md:mt-6">
                          <img
                            loading="lazy"
                            src={agents?.user?.image}
                            className="self-center max-w-full rounded-full aspect-square w-[120px]"
                          />
                          <div className="self-center mt-4 text-xl font-medium text-black whitespace-nowrap text-wrap text-center">
                            {agents?.user?.prenom} {agents?.user?.nom}
                          </div>

                          <div className="flex gap-5 justify-between mt-4 w-full whitespace-nowrap">
                            <div className="flex gap-4 justify-between font-light">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2396d7f9c56d888c52107d7b3fbd89dbaa845bab9c06eaac4249fff819f8a7f8?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                className="w-3.5 ml-1 aspect-[0.74]"
                              />
                              <div>Profil</div>
                            </div>
                            <div className="flex gap-2.5 my-auto font-medium">
                              <div>
                                {agents?.typeresponsable === "club"
                                  ? "Manager de Club"
                                  : "Manager de joueur"}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-5 justify-between mt-4 w-full whitespace-nowrap">
                            <div className="flex gap-4 justify-between font-light">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/17e268577315843aadb58b6fde92110eb3f42d8de30c4040a3648567bded76ac?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                className="w-5 aspect-square"
                              />
                              <div>Nationnalité</div>
                            </div>
                            <div className="flex gap-2.5 my-auto font-medium">
                              <div> {agents?.user?.nationality}</div>
                            </div>
                          </div>
                          <div className="flex gap-5 justify-between mt-4 w-full whitespace-nowrap">
                            <div className="flex gap-4 justify-between font-light">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/17e268577315843aadb58b6fde92110eb3f42d8de30c4040a3648567bded76ac?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                className="w-5 aspect-square"
                              />
                              <div>Pays de résidence</div>
                            </div>
                            <div className="flex gap-2.5 my-auto font-medium overflow-hidden whitespace-nowrap">
                              <div className="overflow-hidden overflow-ellipsis">
                                {agents?.user?.countryresidence}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}

                  {filteredUsers?.scouts?.map((scouts, index) => (
                    <Link key={index} to={`/profile/${scouts?.user?.id}`}>
                      <div className="flex flex-col w-full">
                        <div className="flex flex-col grow p-6 mx-auto w-full text-xs bg-white rounded-xl text-zinc-900 max-md:px-5 max-md:mt-6">
                          <img
                            loading="lazy"
                            src={scouts?.user?.image}
                            className="self-center max-w-full rounded-full aspect-square w-[120px]"
                          />
                          <div className="self-center mt-4 text-xl font-medium text-black whitespace-nowrap">
                            {scouts?.user?.prenom} {scouts?.user?.nom}
                          </div>

                          <div className="flex gap-5 justify-between mt-4 w-full whitespace-nowrap">
                            <div className="flex gap-4 justify-between font-light">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2396d7f9c56d888c52107d7b3fbd89dbaa845bab9c06eaac4249fff819f8a7f8?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                className="w-3.5 ml-1 aspect-[0.74]"
                              />
                              <div>Profil</div>
                            </div>
                            <div className="flex gap-2.5 my-auto font-medium">
                              <div>{scouts?.user?.profil}</div>
                            </div>
                          </div>
                          <div className="flex gap-5 justify-between mt-4 w-full whitespace-nowrap">
                            <div className="flex gap-4 justify-between font-light">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/17e268577315843aadb58b6fde92110eb3f42d8de30c4040a3648567bded76ac?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                className="w-5 aspect-square"
                              />
                              <div>Nationnalité</div>
                            </div>
                            <div className="flex gap-2.5 my-auto font-medium">
                              <div> {scouts?.user?.nationality}</div>
                            </div>
                          </div>
                          <div className="flex gap-5 justify-between mt-4 w-full whitespace-nowrap">
                            <div className="flex gap-4 justify-between font-light">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/17e268577315843aadb58b6fde92110eb3f42d8de30c4040a3648567bded76ac?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                className="w-5 aspect-square"
                              />
                              <div>Pays de résidence</div>
                            </div>
                            <div className="flex gap-2.5 my-auto font-medium overflow-hidden whitespace-nowrap">
                              <div className="overflow-hidden overflow-ellipsis">
                                {scouts?.user?.countryresidence}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}

                  {filteredUsers?.coaches?.map((coaches, index) => (
                    <Link key={index} to={`/profile/${coaches?.user?.id}`}>
                      <div className="flex flex-col w-full">
                        <div className="flex flex-col grow p-6 mx-auto w-full text-xs bg-white rounded-xl text-zinc-900 max-md:px-5 max-md:mt-6">
                          <img
                            loading="lazy"
                            src={coaches?.user?.image}
                            className="self-center max-w-full rounded-full aspect-square w-[120px]"
                          />
                          <div className="self-center mt-4 text-xl font-medium text-black whitespace-nowrap">
                            {coaches?.user?.prenom} {coaches?.user?.nom}
                          </div>

                          <div className="flex gap-5 justify-between mt-4 w-full whitespace-nowrap">
                            <div className="flex gap-4 justify-between font-light">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2396d7f9c56d888c52107d7b3fbd89dbaa845bab9c06eaac4249fff819f8a7f8?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                className="w-3.5 ml-1 aspect-[0.74]"
                              />
                              <div>Profil</div>
                            </div>
                            <div className="flex gap-2.5 my-auto font-medium">
                              <div>
                                {coaches?.user?.profil === "coach"
                                  ? "Entraineur "
                                  : "Entraineur "}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-5 justify-between mt-4 w-full whitespace-nowrap">
                            <div className="flex gap-4 justify-between font-light">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/17e268577315843aadb58b6fde92110eb3f42d8de30c4040a3648567bded76ac?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                className="w-5 aspect-square"
                              />
                              <div>Nationnalité</div>
                            </div>
                            <div className="flex gap-2.5 my-auto font-medium">
                              <div> {coaches?.user?.nationality}</div>
                            </div>
                          </div>
                          <div className="flex gap-5 justify-between mt-4 w-full whitespace-nowrap">
                            <div className="flex gap-4 justify-between font-light">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/17e268577315843aadb58b6fde92110eb3f42d8de30c4040a3648567bded76ac?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                className="w-5 aspect-square"
                              />
                              <div>Pays de résidence</div>
                            </div>
                            <div className="flex gap-2.5 my-auto font-medium overflow-hidden whitespace-nowrap">
                              <div className="overflow-hidden overflow-ellipsis">
                                {coaches?.user?.countryresidence}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Badge;
