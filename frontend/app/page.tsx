import Hero from './components/Hero';
import PharmacistEdge from './components/PharmacistEdge';
import FeaturedProjects from './components/FeaturedProjects';
import ContactForm from './components/ContactForm';

export default function Home() {
    return (
        <>
            <Hero />
            <PharmacistEdge />
            <FeaturedProjects />
            <ContactForm />
        </>
    );
}
