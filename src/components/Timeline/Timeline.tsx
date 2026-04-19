const events = [
  { title: "Ceremony", location: "Biserica X" },
  { title: "Reception", location: "Restaurant Y" },
];

export default function Timeline() {
  return (
    <section className='bg-editorial py-32'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='heading-lg text-center text-accent-red'>The Day</h2>

        <div className='mt-16 border-l border-border-subtle pl-6 space-y-12'>
          {events.map((e, i) => (
            <div key={i}>
              <h3 className='heading-md'>{e.title}</h3>
              <p className='body-md'>{e.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
