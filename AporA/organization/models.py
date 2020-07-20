from django.db import models

class WeekDay(models.TextChoices):
    SUNDAY = 'Sun' 
    MONDAY = 'Mon' 
    TUESDAY = 'Tue' 
    WEDNESDAY = 'Wed' 
    THURSDAY = 'Thu' 
    FRIDAY = 'Fri' 
    SATURDAY = 'Sat' 

class Subjects(models.TextChoices):
    MATHEMATICS = 'Math'
    PHYSICS = 'Phys'
    CHEMISTRY = 'Chem'
    BIOLOGY = 'Bio'
    PORTUGUESE = 'Port' 
    ENGLISH = 'Eng' 
    HISTORY = 'Hist' 
    GEOGRAPHY = 'Geo' 
    PHILOSOPHY = 'Phi' 
    SOCIOLOGY = 'Soc' 

class Routine(models.Model):
    routines_user = models.CharField(max_length=32, primary_key=True) 

    available_time = models.IntegerField(default=0)
    
    # Both subject related fields must recieve the subjects as comma separated 
    # values encoded exactly as defined in the  IntegerChoices subclass Subjects
    difficult_subjects = models.TextField()
    easy_subjects = models.TextField()

class StudyTimeBlock(models.Model):
    routine_container = models.ForeignKey(
        Routine, on_delete=models.CASCADE
    )
    week_day = models.TextField(choices=WeekDay.choices)
    start_hour = models.IntegerField()
    allocated_time = models.IntegerField()
    subject = models.TextField(choices=Subjects.choices)
