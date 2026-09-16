from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from database.connection import Base


class StudentRequest(BaseModel):
    subject: str
    examDate: str
    studyHours: str


class StudentDB(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    subject = Column(String, nullable=False)
    exam_date = Column(String, nullable=False)
    study_hours = Column(String, nullable=False)