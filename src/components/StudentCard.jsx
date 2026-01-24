import Card from "./Card";
import ProfilePhoto from "./ProfilePhoto";
import Skills from "./Skills";

const StudentCard = ({ student, onClick }) => {
    return (
        <Card onClick={onClick} className="cursor-pointer hover:shadow-lg transition">
            <div className="flex gap-4">
                <ProfilePhoto src={student.avatar} />

                <div className="flex-1">
                    <h3 className="text-lg font-semibold">{student.name}</h3>
                    <p className="text-sm text-gray-500">{student.major}</p>

                    <div className="mt-2">
                        <Skills skills={student.skills.slice(0, 4)} />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default StudentCard;
