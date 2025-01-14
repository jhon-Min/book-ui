import { Carousel } from 'flowbite-react';

export default function Display() {
  return (
    <>
      <div className="h-[35vh] lg:h-[50vh]">
        <Carousel>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
          />
        </Carousel>
      </div>
    </>
  );
}
