// Doctors Data

const doctorNames = [
    "Alice Johnson", "John Smith", "Michael Lee", "David Brown", "Emily Davis",
    "Sarah Wilson", "James Taylor", "Linda Martinez", "Robert Clark", "Patricia Lewis",
    "Daniel Walker", "Barbara Hall", "Christopher Allen", "Jennifer Young", "Matthew King",
    "Elizabeth Wright", "Anthony Scott", "Karen Green", "Joshua Adams", "Nancy Baker"
];

const femaleNames = [
    "Alice Johnson", "Emily Davis", "Sarah Wilson", "Linda Martinez", "Patricia Lewis",
    "Barbara Hall", "Jennifer Young", "Elizabeth Wright", "Karen Green", "Nancy Baker"
];

const specialties = ["Cardiologist", "Dermatologist", "Neurologist", "Orthopedic", "Pediatrician", "Psychiatrist"];

const docSpecialtyDiseaseMap: any = {
    Cardiologist: ["Heart Disease", "Hypertension", "Arrhythmia"],
    Dermatologist: ["Skin Allergy", "Eczema", "Psoriasis"],
    Neurologist: ["Migraine", "Epilepsy", "Parkinson's"],
    Orthopedic: ["Arthritis", "Fracture", "Osteoporosis"],
    Pediatrician: ["Flu", "Asthma", "Bronchitis"],
    Psychiatrist: ["Depression", "Anxiety", "Bipolar Disorder"]
};

const countries = ["USA", "UK", "India", "Canada", "Germany", "Australia"];
const branches = ["A", "B", "C", "D"];
const docpaymentMethods = ["Cash", "Credit Card", "Insurance"];
const Docfeedbacks = ["Excellent service", "Average experience", "Needs improvement", "Very satisfied"];

function randomDateInRange(start: any, end: any) {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const randomTime = startTime + Math.random() * (endTime - startTime);
    return new Date(randomTime);
}

const startDate = new Date(2026, 0, 1);
const endDate = new Date(2026, 2, 1); 


export const doctorDetails = Array.from({ length: 1000 }, (_, i) => {
    const id = i + 1;
    const name = doctorNames[i % doctorNames.length];
    const isFemale = femaleNames.includes(name);
    const doctorImg = isFemale ? "userFemale" : "userMale";

    const specialty = specialties[i % specialties.length];
    const diseaseOptions = docSpecialtyDiseaseMap[specialty];

    return {
        DoctorId: `DOC${1000 + id}`,
        Name: name,
        DoctorImg: doctorImg,
        Specialty: specialty,
        Experience: Math.floor(Math.random() * 30) + 1,
        PatientsHandled: 20,
        Rating: (Math.random() * 5).toFixed(1),
        Country: countries[id % countries.length],
        Branch: branches[id % branches.length],
        ConsultationFee: (Math.random() * 200 + 50).toFixed(2),
        Availability: id % 10 === 0 ? "On Leave" : "Available",
        DateJoined: new Date(2015 + (id % 10), id % 12, (id % 28) + 1),
        PaymentMethod: docpaymentMethods[id % docpaymentMethods.length],
        Feedback: Docfeedbacks[id % Docfeedbacks.length],
        Contact: `+1-555-${1000 + id}`,
        Email: `${name.toLowerCase().replace(" ", ".")}@hospital.com`,
        DiseasesTreated: diseaseOptions
    };
});


// Patients Data
const specialtyDiseaseMap: any = {
    Cardiologist: ["Heart Disease", "Hypertension", "Arrhythmia"],
    Dermatologist: ["Skin Allergy", "Eczema", "Psoriasis"],
    Neurologist: ["Migraine", "Epilepsy", "Parkinson's"],
    Orthopedic: ["Arthritis", "Fracture", "Osteoporosis"],
    Pediatrician: ["Flu", "Asthma", "Bronchitis"],
    Psychiatrist: ["Depression", "Anxiety", "Bipolar Disorder"]
};

const patientNames = [
    "Oliver Harris", "Sophia Turner", "Liam Robinson", "Mia Thompson", "Noah White",
    "Ava Lewis", "Ethan Walker", "Isabella Hall", "Mason Allen", "Charlotte Young",
    "Logan King", "Amelia Scott", "Lucas Green", "Harper Adams", "Benjamin Nelson",
    "Ella Carter", "Henry Mitchell", "Grace Perez", "Alexander Rivera", "Chloe Brooks"
];

const patientFemaleNames = [
    "Sophia Turner", "Mia Thompson", "Ava Lewis", "Isabella Hall", "Charlotte Young",
    "Amelia Scott", "Harper Adams", "Ella Carter", "Grace Perez", "Chloe Brooks"
];

const feedbacks = [
    "Excellent care", "Average service", "Needs improvement", "Very satisfied",
    "Quick recovery", "Friendly staff"
];

const paymentMethods = ["Cash", "Credit Card", "Insurance"];

export const patientData = Array.from({ length: 20000 }, (_, i) => {
    const id = i + 1;
    const name = patientNames[i % patientNames.length];
    const isFemale = patientFemaleNames.includes(name);
    const patientImg = isFemale ? "userFemale" : "userMale";

    const doctorIndex = Math.floor((id - 1) / 20);
    const doctorAssigned = `DOC${1001 + doctorIndex}`;

    const specialties = ["Cardiologist", "Dermatologist", "Neurologist", "Orthopedic", "Pediatrician", "Psychiatrist"];
    const specialty = specialties[doctorIndex % specialties.length];
    const diseaseOptions = specialtyDiseaseMap[specialty];
    const disease = diseaseOptions[id % diseaseOptions.length];
    const workingHours = [10, 11, 12, 14, 15, 16, 17, 18];
    const timeSlotHour = workingHours[id % workingHours.length];
    const timeSlot = `${timeSlotHour}:00`;

    return {
        PatientId: `PAT${1000 + id}`,
        Name: name,
        PatientImg: patientImg,
        Age: Math.floor(Math.random() * 60) + 10,
        Gender: isFemale ? "Female" : "Male",
        Disease: disease,
        DoctorAssigned: doctorAssigned,
        AppointmentDate: randomDateInRange(startDate, endDate),
        TimeSlot: `${9 + (id % 8)}:00`,
        PaymentMethod: paymentMethods[id % paymentMethods.length],
        Feedback: feedbacks[id % feedbacks.length],
        Contact: `+1-666-${2000 + id}`,
        Email: `${name.toLowerCase().replace(" ", ".")}@patientmail.com`,
        Rating: (Math.random() * 5).toFixed(1)
    };
});
