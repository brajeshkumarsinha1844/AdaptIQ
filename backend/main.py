from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database.connection import Base, engine, SessionLocal
from models.student import StudentDB, StudentRequest

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AssessmentResult(BaseModel):
    student_id: int
    score: int
    total_questions: int


@app.get("/")
def home():
    return {
        "message": "AdaptIQ backend is running!"
    }


@app.post("/student")
def create_student(student: StudentRequest):
    db = SessionLocal()

    new_student = StudentDB(
        subject=student.subject,
        exam_date=student.examDate,
        study_hours=student.studyHours,
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    db.close()

    return {
        "message": "Student saved successfully!",
        "student": {
            "id": new_student.id,
            "subject": new_student.subject,
            "examDate": new_student.exam_date,
            "studyHours": new_student.study_hours,
        },
    }


@app.post("/assessment")
def submit_assessment(result: AssessmentResult):
    percentage = (result.score / result.total_questions) * 100

    return {
        "message": "Assessment received successfully!",
        "student_id": result.student_id,
        "score": result.score,
        "total_questions": result.total_questions,
        "percentage": percentage,
    }