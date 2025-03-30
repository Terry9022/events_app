import Image from "next/image";

const SingleEvent = ({ data }) => {
  return (
    <div>
      <h1>{data.title}</h1>
      <Image src={data.image} alt={data.title} width={600} height={400} />
      <p>{data.description}</p>

      <input type="email" placeholder="Enter your email" />
      <button>Submit</button>
    </div>
  );
};
export default SingleEvent;
