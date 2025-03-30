import Image from "next/image";

const EventPage = ({ data }) => {
  return (
    <div>
      <Image src={data.image} alt={data.title} width={1000} height={500} />
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};

export default EventPage;

export async function getStaticPaths() {
  const data = await import("/data/data.json");
  const allEvents = data.allEvents;

  const allPaths = allEvents.map((ev) => {
    return {
      params: {
        cat: ev.city.toString(),
        id: ev.id.toString(),
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { allEvents } = await import("/data/data.json");
  const id = context?.params?.id;
  const eventData = allEvents.find((ev) => ev.id === id);

  return { props: { data: eventData } };
}
