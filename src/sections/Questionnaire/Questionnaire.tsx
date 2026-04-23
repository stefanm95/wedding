export default function Questionnaire() {
  return (
    <section className='bg-editorial py-32'>
      <div className='max-w-xl mx-auto space-y-6'>
        <h2 className='heading-lg text-center text-accent-red'>
          Additional Details
        </h2>

        <input placeholder='Number of Guests' className='input' />

        <input placeholder='Guest Names' className='input' />

        <select title="questionnaire" className='input'>
          <option>Transport</option>
          <option>Bus</option>
          <option>Personal Car</option>
        </select>
      </div>
    </section>
  );
}
