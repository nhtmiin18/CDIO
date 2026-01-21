import StudentCard from "./StudentCard";

const StudentList = ({ students, onSelectStudent }) => {
    return (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {students.map((student) => (
                <StudentCard
                    key={student.id}
                    student={student}
                    onClick={() => onSelectStudent(student)}
                />
            ))}
        </div>
    );
};

export default StudentList;
