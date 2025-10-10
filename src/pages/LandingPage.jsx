import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Link } from "react-router-dom"
import companies from '../data/companies.json';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import faqs from '../data/faq.json';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const LandingPage = () => {
  return (
        // mr-15 mewns it is for mobile screen and all and sm:mr-0 for our normal website on desktop.
    <main className=" gardient-title flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 mr-15 sm:mr-0">
      <section className="text-center">
        {/* mr-11 */}
        <h1 className="gardient-title flex flex-col items-center justify-center gardient-title text-4xl  font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-3 ml-15">
          Find Your Dream Job{" "}
          <span className="gardient-title flex items-center gap-2 sm:gap-6 ">
            and get{" "}
            <img
              src="/logo.png"
              alt="hirrd logo"
              className="h-14 sm:h-24 lg:h-32"
            />
          </span>
        </h1>
        {/* mr-11 */}
        <p className="text-gray-300  sm:mt-4 text-xs sm:text-xl ml-15">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>


      {/* Buttons */}
      <div className="flex gap-6 justify-center ml-20">
        <Link to={"/jobs"}>
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to={"/post-job"}>
          <Button variant="destructive" size="xl">
            Post a Job
          </Button>
        </Link>
      </div>

      {/* carousel */}

      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10 ml-9"
      >
        <CarouselContent className="flex gap-3 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-5 sm:h-14 object-contain "
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* banner */}
      <img src="/banner.jpeg" className="w-full ml-8" />

      {/* cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>

      {/* Accordion */}

      <Accordion type="multiple" className="w-full ml-8">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  )
}

export default LandingPage;