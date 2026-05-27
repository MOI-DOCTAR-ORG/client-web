import { useState } from 'react'
import Icon from '../components/Icon'

type Condition = 'Hypertension' | 'Type 2 Diabetes' | 'Asthma' | 'Heart Disease' | 'Thyroid Disorder'

const conditionsList: Condition[] = ['Hypertension', 'Type 2 Diabetes', 'Asthma', 'Heart Disease', 'Thyroid Disorder']

interface Medication {
  name: string
  dosage: string
  frequency: string
}

export default function MedicalHistory() {
  const [selectedConditions, setSelectedConditions] = useState<Condition[]>(['Hypertension'])
  const [allergies, setAllergies] = useState<string[]>(['Penicillin', 'Peanuts'])
  const [allergyInput, setAllergyInput] = useState('')
  const [medications] = useState<Medication[]>([
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
  ])
  const [emergencyContact, setEmergencyContact] = useState('')

  const toggleCondition = (condition: Condition) => {
    setSelectedConditions(prev =>
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    )
  }

  const addAllergy = () => {
    const trimmed = allergyInput.trim()
    if (trimmed && !allergies.includes(trimmed)) {
      setAllergies([...allergies, trimmed])
      setAllergyInput('')
    }
  }

  const removeAllergy = (allergy: string) => {
    setAllergies(allergies.filter(a => a !== allergy))
  }

  return (
    <main className="ml-[var(--spacing-sidebar-width,280px)] min-h-screen pb-8">
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-gutter pt-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-secondary mb-2">
            <Icon icon="arrow_back" className="text-sm" />
            <a className="font-label-md text-label-md hover:text-primary transition-colors" href="#">Back to History</a>
          </div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">Medical History Form</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Please ensure all information is accurate and up-to-date to provide the best possible triage evaluation.</p>
        </div>

        <form action="#" className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] overflow-hidden" method="POST">
          <div className="p-6 md:p-8 space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-4">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <Icon icon="badge" className="text-sm" />
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2" htmlFor="dob">
                    Date of Birth <span className="text-error">*</span>
                  </label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-3 font-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    id="dob"
                    name="dob"
                    type="date"
                    required
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2" htmlFor="blood_type">Blood Type</label>
                  <select
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-3 font-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none"
                    id="blood_type"
                    name="blood_type"
                    defaultValue=""
                  >
                    <option disabled value="">Select Blood Type</option>
                    <option value="a+">A+</option>
                    <option value="a-">A-</option>
                    <option value="b+">B+</option>
                    <option value="b-">B-</option>
                    <option value="ab+">AB+</option>
                    <option value="ab-">AB-</option>
                    <option value="o+">O+</option>
                    <option value="o-">O-</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block font-label-md text-label-md text-error mb-2" htmlFor="emergency_contact">
                    Emergency Contact Number <span className="text-error">*</span>
                  </label>
                  <input
                    className="w-full bg-error-container/20 border border-error rounded-lg px-4 py-3 font-body-md text-on-surface focus:border-error focus:ring-2 focus:ring-error/20 transition-all outline-none"
                    id="emergency_contact"
                    name="emergency_contact"
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                  />
                  <p className="font-caption text-caption text-error mt-1 flex items-center gap-1">
                    <Icon icon="error" className="text-[14px]" />
                    This field is required.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-4">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <Icon icon="vital_signs" className="text-sm" />
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Existing Conditions</h3>
              </div>
              <p className="font-body-md text-on-surface-variant mb-4">Select all chronic conditions that apply.</p>
              <div className="flex flex-wrap gap-3">
                {conditionsList.map((condition) => (
                  <label key={condition} className="cursor-pointer">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={selectedConditions.includes(condition)}
                      onChange={() => toggleCondition(condition)}
                    />
                    <div className={`px-4 py-2 rounded-full font-label-md text-label-md transition-all ${
                      selectedConditions.includes(condition)
                        ? 'border border-primary bg-primary text-white'
                        : 'border border-outline-variant bg-surface-container-low text-on-surface-variant hover:bg-surface-variant'
                    }`}>
                      {condition}
                    </div>
                  </label>
                ))}
                <button className="px-4 py-2 rounded-full border border-dashed border-primary text-primary font-label-md text-label-md flex items-center gap-1 hover:bg-primary-fixed/30 transition-colors" type="button">
                  <Icon icon="add" className="text-sm" /> Add Other
                </button>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-4">
                <div className="w-8 h-8 rounded-full bg-error-container/30 flex items-center justify-center text-error">
                  <Icon icon="warning" className="text-sm" />
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Allergies</h3>
              </div>
              <div className="flex flex-wrap gap-3 mb-4">
                {allergies.map((allergy) => (
                  <div key={allergy} className="px-4 py-2 rounded-full border border-error/50 bg-error-container text-on-error-container font-label-md text-label-md flex items-center gap-2">
                    {allergy}
                    <button aria-label={`Remove ${allergy}`} className="hover:text-error transition-colors" type="button" onClick={() => removeAllergy(allergy)}>
                      <Icon icon="close" className="text-[16px]" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 max-w-md">
                <input
                  className="flex-1 bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-2 font-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="Type allergy to add..."
                  type="text"
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addAllergy() } }}
                />
                <button className="bg-surface-container-high text-on-surface px-4 py-2 rounded-lg font-label-md hover:bg-surface-variant transition-colors" type="button" onClick={addAllergy}>Add</button>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-4">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <Icon icon="prescriptions" className="text-sm" />
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Current Medications</h3>
              </div>
              <div className="overflow-x-auto rounded-xl border border-outline-variant/30 mb-4">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low border-b border-outline-variant/30">
                    <tr>
                      <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant font-semibold">Medication Name</th>
                      <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant font-semibold">Dosage</th>
                      <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant font-semibold">Frequency</th>
                      <th className="py-3 px-4 w-16" />
                    </tr>
                  </thead>
                  <tbody>
                    {medications.map((med, i) => (
                      <tr key={i} className="border-b border-outline-variant/20 hover:bg-surface-container-lowest/50 transition-colors">
                        <td className="py-3 px-4 font-body-md text-on-surface">{med.name}</td>
                        <td className="py-3 px-4 font-body-md text-on-surface">{med.dosage}</td>
                        <td className="py-3 px-4 font-body-md text-on-surface">{med.frequency}</td>
                        <td className="py-3 px-4 text-right">
                          <button aria-label="Delete row" className="text-secondary hover:text-error transition-colors" type="button">
                            <Icon icon="delete" className="text-[20px]" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="px-4 py-2 rounded-full border border-primary text-primary font-label-md text-label-md flex items-center gap-1 hover:bg-primary-fixed/30 transition-colors" type="button">
                <Icon icon="add" className="text-sm" /> Add Medication
              </button>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-4">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <Icon icon="content_cut" className="text-sm" />
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Past Surgeries</h3>
              </div>
              <textarea
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-3 font-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-y"
                placeholder="List any past surgeries and approximate dates..."
                rows={4}
              />
            </section>
          </div>

          <div className="bg-surface-container-low p-6 md:p-8 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <Icon icon="lock" className="text-primary" />
              <p className="font-caption text-caption">Your data is HIPAA compliant and securely encrypted.</p>
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-6 py-3 rounded-full border border-primary text-primary font-label-md text-label-md hover:bg-primary-fixed/30 transition-colors text-center" type="button">
                Cancel
              </button>
              <button className="flex-1 sm:flex-none px-8 py-3 rounded-full bg-primary text-white font-label-md text-label-md hover:bg-[#1A2AC2] shadow-sm transition-all text-center" type="submit">
                Save Medical History
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
