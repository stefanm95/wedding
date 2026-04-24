export default function RSVP() {
  return (
    <section className='bg-transparent py-32'>
      <div className='max-w-xl mx-auto'>
        <h2 className='heading-lg text-center text-accent-red'>
          Confirm Attendance
        </h2>

        <form className='mt-10 space-y-6'>
          <input
            className='w-full border border-border-subtle p-3 bg-transparent'
            placeholder='Your Name'
          />

          <select title="rsvp" className='w-full border border-border-subtle p-3 bg-transparent'>
            <option>Menu Preference</option>
            <option>Normal</option>
            <option>Vegetarian</option>
          </select>

          <button className='w-full bg-accent-red text-white py-3'>
            Confirm
          </button>
        </form>
      </div>
    </section>
  );
}
