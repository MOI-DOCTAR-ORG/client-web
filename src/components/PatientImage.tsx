export default function PatientImage() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] bg-slate-200 shadow-card">
      <img
        className="h-full w-full object-cover"
        src="/patient.png"
        alt="Patient using a phone while resting at home"
      />
      {/* <div className="absolute bottom-16 left-14 hidden max-w-[190px] rounded-2xl bg-white px-4 py-3 text-[11px] font-medium text-slate-700 shadow-float sm:block">
        <p className="mb-1 text-[10px] font-bold text-clinical">moi doctor</p>
        Hi, what are your symptoms today?
      </div> */}
      {/* <div className="absolute bottom-9 left-[48%] hidden rounded-full bg-clinical px-3 py-2 shadow-soft sm:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
        <span className="mx-1.5 h-1.5 w-1.5 rounded-full bg-white/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
      </div> */}
    </div>
  );
}
