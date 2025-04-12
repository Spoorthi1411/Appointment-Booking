import bathroom_clean from './bathroom_clean.jpeg'
import electricity from "./electricity.jpg"
import dry_cleaning from "./dry_cleaning.jpg"
import home_repair from "./home_repair.jpg";
import house_cleaning from "./house_cleaning.webp";
import painting from "./painting.jpeg";
import plumber from "./plumber.jpeg";
import profile from "./profile.png";
import shifting from "./shifting.jpeg";
import logo from "./logo.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroom, faTools, faPaintRoller, faTruckMoving, faBolt } from "@fortawesome/free-solid-svg-icons";
export const asserts={
    bathroom_clean,
    electricity,
    dry_cleaning,
    home_repair,
    house_cleaning,
    painting,
    plumber,
    profile,
    shifting,
    logo,
};

export const ServicesData /* specialityData*/=[
    {
/*speciality*/serviceName:'Cleaning',
        /*icon:'fa-solid fa-broom'*/
    },
    {
        serviceName:'Repair',
        /*icon:'fa-solid fa-screwdriver-wrench'*/
    },
    {
        serviceName:'Painting',
        /*icon:'fa-paint-roller'*/
    },
    {
        serviceName:'Shifting',
        /*icon:'fa-truck-moving'*/
    },
    {
        serviceName:'Electricity',
        /*icon:'fa-Bolt'*/
    },
];

export const BusinessList /*(doctors)*/=[
    {
        name:'Bathroom Cleaning',
        image:bathroom_clean,
        serviceName:'cleaning',
        fees:250,
    },
    {
        name:'Plumber',
        image:plumber,
        serviceName:'repair',
        fees:250,
    },
    {
        name:'House Repairing',
        image:home_repair,
        serviceName:'repair',
        fees:250,
    },
    {
        name:'Laundry',
        image:dry_cleaning,
        serviceName:'cleaning',
    },
    {
        name:'Painting',
        image:painting,
        serviceName:'painting',
    },
    {
        name:'Electricity',
        image:electricity,
        serviceName:'electricity',
    },
    {
        name:'House Cleaning',
        image:house_cleaning,
        serviceName:'cleaning',
    },
    {
        name:'Shifting',
        image:shifting,
        serviceName:'shifting',
    }
]