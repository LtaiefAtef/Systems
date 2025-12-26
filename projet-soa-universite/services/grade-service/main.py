from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional

app = FastAPI(
    title="Grade Service",
    description="Service de gestion des notes et moyennes",
    version="1.0.0"
)


# ---------- Data models ----------

class GradeCreate(BaseModel):
    cin: str = Field(..., example="14587963")
    course_code: str = Field(..., example="GL101")
    value: float = Field(..., ge=0.0, le=20.0, example=15.5)


class Grade(GradeCreate):
    id: int


class StudentAverage(BaseModel):
    cin: str
    average: Optional[float]
    grades: List[Grade]



# ---------- In-memory storage ----------

grades_db: List[Grade] = [
    Grade(id=1, cin="14587963", course_code="GL101", value=15.5),
    Grade(id=2, cin="14587963", course_code="BD202", value=13.0),
    Grade(id=3, cin="11223344", course_code="NET301", value=16.0),
    Grade(id=4, cin="22334455", course_code="ALG101", value=12.5),
    Grade(id=5, cin="33445566", course_code="SYS210", value=14.0),
]

next_id: int = 6



# ---------- Routes ----------

@app.get("/grades", response_model=List[Grade])
def get_all_grades():
    return grades_db


@app.get("/grades/{grade_id}", response_model=Grade)
def get_grade(grade_id: int):
    for g in grades_db:
        if g.id == grade_id:
            return g
    raise HTTPException(status_code=404, detail="Grade not found")

@app.get("/grades/student/{cin}", response_model=StudentAverage)
def get_grades_for_student(cin: str):
    student_grades = [g for g in grades_db if g.cin == cin]
    if not student_grades:
        return StudentAverage(cin=cin, average=None, grades=[])
    avg = sum(g.value for g in student_grades) / len(student_grades)
    return StudentAverage(cin=cin, average=avg, grades=student_grades)

@app.post("/grades", response_model=Grade, status_code=201)
def create_grade(grade: GradeCreate):
    global next_id
    new_grade = Grade(id=next_id, **grade.dict())
    next_id += 1
    grades_db.append(new_grade)
    return new_grade


@app.put("/grades/{grade_id}", response_model=Grade)
def update_grade(grade_id: int, grade: GradeCreate):
    for idx, g in enumerate(grades_db):
        if g.id == grade_id:
            updated = Grade(id=grade_id, **grade.dict())
            grades_db[idx] = updated
            return updated
    raise HTTPException(status_code=404, detail="Grade not found")


@app.delete("/grades/{grade_id}", status_code=204)
def delete_grade(grade_id: int):
    for idx, g in enumerate(grades_db):
        if g.id == grade_id:
            del grades_db[idx]
            return
    raise HTTPException(status_code=404, detail="Grade not found")
