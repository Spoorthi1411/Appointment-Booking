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
        similarService:['Laundry','House Cleaning'],
        description:'Our professional bathroom cleaning service ensures your washrooms are spotless, sanitized, and fresh. We thoroughly clean toilets, sinks, showers, mirrors, tiles, and floors using high-quality disinfectants and tools. Say goodbye to stains, odor, and germs — we bring back the shine and hygiene your bathroom deserves.',
    },
    {
        name:'Plumber',
        image:plumber,
        serviceName:'repair',
        similarService:['House Repairing','Electricity'],
        description:'A Plumber installs, repairs, and maintains plumbing systems and fixtures in residential, commercial, and industrial settings. This includes water supply lines, waste disposal systems, heating systems, and appliances like dishwashers and water heaters.',
    },
    {
        name:'House Repairing',
        image:home_repair,
        serviceName:'repair',
        similarService:['Electricity','Plumber'],
        description:'From small fixes to major repairs, our skilled handymen handle it all. Whether it’s a broken door, damaged wall, or furniture issue — we offer quick and dependable repair services to keep your home in top shape.',
    },
    {
        name:'Laundry',
        image:dry_cleaning,
        serviceName:'cleaning',
        similarService:['House Cleaning','Bathroom Cleaning'],
        description:'No time for laundry? We’ve got you covered! Enjoy clean, fresh, and neatly folded clothes with our affordable laundry and dry-cleaning services. Doorstep pickup and delivery make it totally hassle-free.',
    },
    {
        name:'Painting',
        image:painting,
        serviceName:'painting',
        similarService:['shifting'],
        description:'Transform your space with a fresh coat of paint! Our professional painters provide clean, fast, and high-quality painting services for homes, offices, and rentals — using top-grade paints and proper masking to ensure a perfect finish.',
    },
    {
        name:'Electricity',
        image:electricity,
        serviceName:'electricity',
        similarService:['Plumber','House Repairing'],
        description:'Facing power cuts or faulty switches? Our trusted electricians are available for all kinds of electrical work — from fixing wiring issues and installing fans to repairing appliances and circuit breakers.',
    },
    {
        name:'House Cleaning',
        image:house_cleaning,
        serviceName:'cleaning',
        similarService:['Bathroom Cleaning','Laundry'],
        description:'Give your home a sparkling makeover! Our full home cleaning service includes deep cleaning of every room — from floors to ceilings — using eco-friendly products and professional equipment.',
    },
    {
        name:'Shifting',
        image:shifting,
        serviceName:'shifting',
        similarService:['Painting'],
        description:'Moving to a new home or office? Let us handle the heavy lifting! Our expert movers ensure safe packing, loading, transport, and unloading of your belongings — making your shifting experience smooth, secure, and stress-free.',
    }
]