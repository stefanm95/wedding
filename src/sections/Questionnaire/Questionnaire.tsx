export default function Questionnaire() {
  return (
    <section className="bg-transparent py-32">
      <div className="mx-auto max-w-xl space-y-6">
        <h2 className="heading-lg text-accent-red text-center">Additional Details</h2>

        <input placeholder="Number of Guests" className="input" />

        <input placeholder="Guest Names" className="input" />

        <select title="questionnaire" className="input">
          <option>Transport</option>
          <option>Bus</option>
          <option>Personal Car</option>
        </select>
      </div>
    </section>
  );
}
